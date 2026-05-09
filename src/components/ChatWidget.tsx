import { useEffect, useRef, useState } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { AGENT_ENDPOINTS, DATA_ENDPOINTS, logApiCall } from "../config/api";

type ChatMessage = {
  id: string;
  type: "bot" | "user";
  content: string;
  options?: ChatOption[];
};

type ChatOption = {
  label: string;
  value: string;
};

type IntakeStep = "name" | "phone" | "location" | "company" | "task" | "done";

type LeadInfo = {
  name: string;
  phone: string;
  location: string;
  company: string;
  taskSummary: string;
  preferredTime: string;
  preferredTimezone: string;
};

type ConsultantInfo = {
  name: string;
  location: string;
  mobile: string;
  role: string;
  email: string;
};

const initialMessage: ChatMessage = {
  id: "welcome",
  type: "bot",
  content:
    "👋 Hi! I'm Saarthi, your Ofstride guide. I'll ask a few quick questions and then help you with answers or connect you with the right expert. What's your name?",
};

const withTimeout = async <T,>(promise: Promise<T>, timeoutMs = 20000): Promise<T> => {
  let timeoutId: number | null = null;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = window.setTimeout(() => reject(new Error("AI_TIMEOUT")), timeoutMs);
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutId !== null) window.clearTimeout(timeoutId);
  }
};

// Always unique message IDs — no duplicates even if two messages arrive in the same ms
let _msgCounter = 0;
const nextId = (type: "bot" | "user") => `${Date.now()}-${++_msgCounter}-${type}`;

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [llmStatus, setLlmStatus] = useState<"unknown" | "ok" | "error">("unknown");
  const [intakeStep, setIntakeStep] = useState<IntakeStep>("name");
  const [scheduleStage, setScheduleStage] = useState<"none" | "time">("none");
  const [lead, setLead] = useState<LeadInfo>({
    name: "",
    phone: "",
    location: "",
    company: "",
    taskSummary: "",
    preferredTime: "",
    preferredTimezone: "",
  });
  const [pendingConsultant, setPendingConsultant] = useState<ConsultantInfo | null>(null);
  const [awaitingNotify, setAwaitingNotify] = useState(false);

  // Holds the Saarthi session_id returned by /session/init
  const sessionIdRef = useRef<string>("");

  // Ensures /session/init is only called once per conversation
  const saarthiSeededRef = useRef(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, isOpen]);

  const addMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  // ── Core Saarthi chat call — uses session_id from /session/init ───────────

  const callSaarthi = async (message: string): Promise<string> => {
    const request = async () => {
      const endpoint = AGENT_ENDPOINTS.chat();
      logApiCall(endpoint, "POST");
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, session_id: sessionIdRef.current }),
      });
      if (!response.ok) throw new Error(`HTTP_${response.status}`);
      const data = (await response.json()) as Record<string, unknown>;
      return (
        (typeof data.text === "string" && data.text) ||
        (typeof data.answer === "string" && data.answer) ||
        (typeof data.response === "string" && data.response) ||
        (typeof data.output === "string" && data.output) ||
        "Could you share a bit more detail?"
      );
    };

    try {
      const text = await withTimeout(request());
      setLlmStatus("ok");
      return text;
    } catch {
      setLlmStatus("error");
      return "I'm having a little trouble right now — please try again in a moment.";
    }
  };

  // ── Hand off to Saarthi via /session/init once intake completes ──────────
  // This is the ONLY place /session/init is called.
  // It sends all collected lead data at once so Saarthi never re-asks.

  const seedSaarthi = async (completedLead: LeadInfo): Promise<string> => {
    if (saarthiSeededRef.current) return "";
    saarthiSeededRef.current = true;

    const endpoint = AGENT_ENDPOINTS.sessionInit();
    logApiCall(endpoint, "POST");
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contact_name: completedLead.name,
        work_email: "",
        phone_number: completedLead.phone,
        location: completedLead.location,
        company_name: completedLead.company,
        task_summary: completedLead.taskSummary,
      }),
    });

    if (!response.ok) throw new Error("init_failed");

    const data = (await response.json()) as {
      session_id: string;
      greeting: string;
    };

    // Store Saarthi's session_id — all subsequent /api/chat calls use this
    sessionIdRef.current = data.session_id;
    setLlmStatus("ok");

    // After init, send the task summary as the first real message so
    // Saarthi has it in its conversation history and won't re-ask
    if (completedLead.taskSummary) {
      const firstReply = await callSaarthi(completedLead.taskSummary);
      return firstReply;
    }

    return data.greeting || `Hi ${completedLead.name}! How can I help you today?`;
  };

  // ── Consultant helpers (unchanged) ───────────────────────────────────────

  const parseConsultants = (csv: string): ConsultantInfo[] => {
    const lines = csv.split(/\r?\n/).filter(Boolean);
    if (lines.length <= 1) return [];
    return lines.slice(1).map((line) => {
      const parts = line.split(",").map((p) => p.trim()).filter((p) => p.length > 0);
      const name = parts[0] || "";
      const location = parts[1] || "";
      const mobile = parts[2] || "";
      let role = "";
      let email = "";
      if (parts.length >= 5) { role = parts[3] || ""; email = parts.slice(4).join(",").trim(); }
      else if (parts.length === 4) { email = parts[3] || ""; }
      return { name, location, mobile, role, email };
    });
  };

  const inferDomain = (text = "") => {
    const v = text.toLowerCase();
    if (v.includes("hire") || v.includes("hiring") || v.includes("recruit") || v.includes("hr") || v.includes("human resources") || v.includes("talent")) return "hr";
    if (v.includes("legal") || v.includes("compliance") || v.includes("contract")) return "legal";
    if (v.includes("finance") || v.includes("cfo") || v.includes("tax") || v.includes("account")) return "finance";
    if (v.includes("it") || v.includes("data") || v.includes("ai") || v.includes("cloud")) return "it";
    return "";
  };

  const domainKeywords: Record<string, string[]> = {
    hr: ["hr", "human resources", "talent", "recruitment", "recruit", "hiring", "hire", "staffing", "payroll", "employee", "candidate"],
    legal: ["legal", "compliance", "contract", "policy", "litigation"],
    finance: ["finance", "financial", "cfo", "tax", "audit", "account"],
    it: ["it", "data", "ai", "cloud", "software", "infrastructure"],
  };

  const selectConsultant = (consultants: ConsultantInfo[], taskSummary: string): ConsultantInfo | null => {
    if (!consultants.length) return null;
    const domain = inferDomain(taskSummary);
    const keywords = domainKeywords[domain] || [];
    const summary = taskSummary.toLowerCase();
    let bestScore = 0;
    let bestMatch: ConsultantInfo | null = null;
    consultants.forEach((c) => {
      const role = c.role.toLowerCase();
      const email = c.email.toLowerCase();
      let score = 0;
      if (domain && (role.includes(domain) || email.includes(domain))) score += 3;
      keywords.forEach((kw) => {
        if (summary.includes(kw)) score += 2;
        if (role.includes(kw)) score += 1;
        if (email.includes(kw)) score += 1;
      });
      if (score > bestScore) { bestScore = score; bestMatch = c; }
    });
    return bestScore > 0 ? bestMatch : null;
  };

  const saveLead = async (payload: LeadInfo) => {
    try {
      const endpoint = DATA_ENDPOINTS.leads();
      logApiCall(endpoint, "POST");
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // Non-critical — don't block the conversation if this fails
    }
  };

  const fetchConsultant = async (taskSummary: string): Promise<ConsultantInfo> => {
    try {
      const endpoint = DATA_ENDPOINTS.consultant();
      logApiCall(endpoint, "POST");
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskSummary }),
      });
      if (response.status === 404) throw new Error("NO_MATCH");
      if (!response.ok) throw new Error("fetch_failed");
      const data = (await response.json()) as { consultant: ConsultantInfo };
      return data.consultant;
    } catch (error) {
      // Fallback: try local CSV
      const fallbackResponse = await fetch("/data/consultants.csv");
      if (!fallbackResponse.ok) throw error;
      const csv = await fallbackResponse.text();
      const consultants = parseConsultants(csv);
      const match = selectConsultant(consultants, taskSummary);
      if (!match) throw new Error("NO_MATCH");
      return match;
    }
  };

  const isValidPhone = (value: string) => {
    const trimmed = value.trim();
    const parsed = trimmed.startsWith("+")
      ? parsePhoneNumberFromString(trimmed)
      : parsePhoneNumberFromString(trimmed, "IN");
    return parsed?.isValid() ?? false;
  };

  const notifyConsultant = async (payload: { lead: LeadInfo; consultant: ConsultantInfo }) => {
    const endpoint = DATA_ENDPOINTS.notify();
    logApiCall(endpoint, "POST");
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  };

  // ── Main input processor ──────────────────────────────────────────────────

  const processInput = async (value: string) => {
    // Hard navigation shortcuts
    if (value === "open:hr-hiring") { setIsOpen(false); window.location.assign("/hire-through-ofstride"); return; }
    if (value === "open:hr-candidate") { setIsOpen(false); window.location.assign("/apply-for-jobs"); return; }

    // Scheduling flow
    if (scheduleStage === "time") {
      const updatedTime = lead.preferredTime ? `${lead.preferredTime} - ${value}` : value;
      const tzMatch = value.match(/\b(UTC|GMT|IST|CST|EST|PST|MST|BST|CEST|EET)\b/i);
      const preferredTimezone = tzMatch ? tzMatch[0].toUpperCase() : lead.preferredTimezone;
      setLead((prev) => ({ ...prev, preferredTime: updatedTime, preferredTimezone }));
      setScheduleStage("none");
      addMessage({ id: nextId("bot"), type: "bot", content: "Thanks! We'll use that preferred time window when arranging the call.", options: [{ label: "Talk to consultant", value: "talk to consultant" }, { label: "Ask another question", value: "continue" }] });
      return;
    }

    if (value.startsWith("schedule:")) {
      const label = value.replace("schedule:", "").trim();
      setLead((prev) => ({ ...prev, preferredTime: label }));
      setScheduleStage("time");
      addMessage({ id: nextId("bot"), type: "bot", content: "What time window works best (include timezone, e.g., 3–5 PM IST)?" });
      return;
    }

    // ── Deterministic intake ──────────────────────────────────────────────
    if (intakeStep !== "done") {
      if (intakeStep === "name") {
        setLead((prev) => ({ ...prev, name: value }));
        setIntakeStep("phone");
        addMessage({ id: nextId("bot"), type: "bot", content: `Nice to meet you, ${value}! What's the best phone number to reach you?` });
        return;
      }
      if (intakeStep === "phone") {
        if (!isValidPhone(value)) {
          addMessage({ id: nextId("bot"), type: "bot", content: "Please enter a valid phone number with country code (e.g., +91 98765 43210)." });
          return;
        }
        setLead((prev) => ({ ...prev, phone: value }));
        setIntakeStep("location");
        addMessage({ id: nextId("bot"), type: "bot", content: "Great. What's your location (city)?" });
        return;
      }
      if (intakeStep === "location") {
        setLead((prev) => ({ ...prev, location: value }));
        setIntakeStep("company");
        addMessage({ id: nextId("bot"), type: "bot", content: "What's your company name?" });
        return;
      }
      if (intakeStep === "company") {
        setLead((prev) => ({ ...prev, company: value }));
        setIntakeStep("task");
        addMessage({ id: nextId("bot"), type: "bot", content: "Briefly describe what you need help with (1–2 sentences)." });
        return;
      }
      if (intakeStep === "task") {
        const completedLead = { ...lead, taskSummary: value };
        setLead(completedLead);
        setIsLoading(true);

        // Fire-and-forget lead save — never blocks the conversation
        saveLead(completedLead);

        try {
          // /session/init hands off ALL collected data to Saarthi at once.
          // Then we immediately send the task as the first real message.
          // Saarthi will never re-ask name/phone/location/company/task.
          const saarthiReply = await seedSaarthi(completedLead);
          addMessage({
            id: nextId("bot"),
            type: "bot",
            content: saarthiReply || `Got it! Feel free to ask me anything about Ofstride's services.`,
          });
        } catch {
          addMessage({
            id: nextId("bot"),
            type: "bot",
            content: "Thanks! You can now ask me anything, or say \"talk to consultant\" to speak with a specialist.",
            options: [{ label: "Talk to consultant", value: "talk to consultant" }],
          });
        } finally {
          setIsLoading(false);
          setIntakeStep("done");
        }
        return;
      }
    }

    // ── Consultant notification confirmation ──────────────────────────────
    if (awaitingNotify && pendingConsultant) {
      const wantsNotify = /^(yes|yep|sure|ok|okay|please)/i.test(value);
      if (wantsNotify) {
        setIsLoading(true);
        try {
          await notifyConsultant({ lead, consultant: pendingConsultant });
          addMessage({ id: nextId("bot"), type: "bot", content: "Got it. I've logged your request and our team will follow up shortly.", options: [{ label: "Start over", value: "restart" }] });
        } catch {
          addMessage({ id: nextId("bot"), type: "bot", content: "I couldn't log that just now. Please try again in a moment." });
        } finally {
          setIsLoading(false);
          setAwaitingNotify(false);
          setPendingConsultant(null);
        }
        return;
      }
      addMessage({ id: nextId("bot"), type: "bot", content: "No problem. Let me know if you want me to connect you later." });
      setAwaitingNotify(false);
      setPendingConsultant(null);
      return;
    }

    // ── Restart ───────────────────────────────────────────────────────────
    if (value === "restart") {
      setMessages([initialMessage]);
      setIntakeStep("name");
      saarthiSeededRef.current = false;
      sessionIdRef.current = "";
      setLead({ name: "", phone: "", location: "", company: "", taskSummary: "", preferredTime: "", preferredTimezone: "" });
      setScheduleStage("none");
      return;
    }

    // ── HR form shortcuts ─────────────────────────────────────────────────
    if (/(hire|hiring|recruit|recruitment|staffing|job opening|vacancy|position)/i.test(value) ||
        /(apply|candidate|resume|cv|job seeker|job application)/i.test(value)) {
      addMessage({ id: nextId("bot"), type: "bot", content: "I can open the HR intake form right away. Which one do you need?", options: [{ label: "Hire through Ofstride", value: "open:hr-hiring" }, { label: "Candidate profile", value: "open:hr-candidate" }] });
      return;
    }

    // ── Explicit consultant request ONLY ──────────────────────────────────
    // Only triggers when user is clearly asking to be connected to a person.
    // Does NOT trigger on questions like "I need help with AI agents".
    const wantsConsultant =
      /\b(talk to|speak to|speak with|connect me with|get me a|contact a)\b.{0,20}\b(consultant|expert|advisor|specialist|someone|person|human)\b/i.test(value) ||
      /^(talk to consultant|speak to consultant|get a consultant|connect me)$/i.test(value.trim());

    if (wantsConsultant) {
      setIsLoading(true);
      try {
        const consultant = await fetchConsultant(lead.taskSummary || value);
        setPendingConsultant(consultant);
        setAwaitingNotify(true);
        addMessage({ id: nextId("bot"), type: "bot", content: `Here's the best match:\n\n${consultant.name} (${consultant.role || "Consultant"})\nPhone: ${consultant.mobile}\nEmail: ${consultant.email}\n\nWould you like me to notify them?`, options: [{ label: "Yes, notify", value: "yes" }, { label: "Not now", value: "no" }] });
      } catch (error) {
        addMessage({ id: nextId("bot"), type: "bot", content: error instanceof Error && error.message === "NO_MATCH" ? "We don't have a listed specialist for this yet. We'll consult our partner network and be in touch." : "I couldn't find a consultant right now. Please share more detail about your request." });
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // ── Everything else → Saarthi ─────────────────────────────────────────
    setIsLoading(true);
    try {
      const reply = await callSaarthi(value);
      addMessage({ id: nextId("bot"), type: "bot", content: reply });
    } catch {
      addMessage({ id: nextId("bot"), type: "bot", content: "Sorry, I'm having trouble right now. Would you like to schedule a call instead?", options: [{ label: "Today", value: "schedule:Today" }, { label: "Tomorrow", value: "schedule:Tomorrow" }, { label: "This week", value: "schedule:This week" }, { label: "Talk to consultant", value: "talk to consultant" }] });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const value = input.trim();
    if (!value || isLoading) return;
    addMessage({ id: nextId("user"), type: "user", content: value });
    setInput("");
    await processInput(value);
  };

  const handleOptionClick = async (option: ChatOption) => {
    if (isLoading) return;
    addMessage({ id: nextId("user"), type: "user", content: option.label });
    await processInput(option.value);
  };

  return (
    <>
      <button className="btn btn-primary fixed bottom-6 right-6 z-50" onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? "Close" : "Chat with Ofstride"}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[540px] w-[380px] max-w-[calc(100vw-48px)] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-strong">
          <div className="flex items-center justify-between bg-gradient-to-r from-primary-500 to-primary-600 px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 rounded-full bg-white/20" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Saarthi by Ofstride</span>
                <span className={`text-[11px] ${llmStatus === "ok" ? "text-emerald-100" : llmStatus === "error" ? "text-amber-100" : "text-white/80"}`}>
                  AI: {llmStatus === "ok" ? "Online" : llmStatus === "error" ? "Temporarily offline" : "Connecting…"}
                </span>
              </div>
            </div>
            <button className="text-xs" onClick={() => setIsOpen(false)}>Close</button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[80%]">
                  <div className={`rounded-2xl px-4 py-3 text-sm ${message.type === "user" ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white" : "border border-slate-200 bg-white text-slate-700"}`}>
                    <p className="whitespace-pre-line">{message.content}</p>
                  </div>
                  {message.type === "bot" && message.options && message.options.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.options.map((option) => (
                        <button key={option.label} type="button" className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 transition hover:border-primary-300 hover:text-primary-600" onClick={() => handleOptionClick(option)}>
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">Thinking…</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="flex gap-2 border-t border-slate-200 bg-white p-4" onSubmit={handleSubmit}>
            <input
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isLoading ? "Waiting for Saarthi…" : "Type your message"}
              disabled={isLoading}
            />
            <button type="submit" className="btn btn-primary px-4" disabled={isLoading || !input.trim()}>Send</button>
          </form>

          {llmStatus === "error" && (
            <p className="px-4 pb-4 text-xs text-amber-600">AI Assist is warming up. I can still connect you with a consultant.</p>
          )}
        </div>
      )}
    </>
  );
}
