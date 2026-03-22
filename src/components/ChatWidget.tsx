import { useEffect, useRef, useState } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";

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

const leadApiBase = import.meta.env.VITE_LEAD_API || "";

const initialMessage: ChatMessage = {
  id: "welcome",
  type: "bot",
  content: "👋 Hi! I’m Offstride AI Assist. I’ll ask a few quick questions and then help you with answers or connect you with the right expert. What’s your name?",
};

const AI_FALLBACK_RESPONSES = [
  "Thanks for sharing. I’m having trouble reaching our AI brain right now, but I can still help connect you with the right consultant.",
  "I can’t fetch an AI answer at the moment. If you’d like, I can schedule a quick call with a specialist.",
  "Our AI service is temporarily unavailable. I can still guide you to the right team or book a consult.",
];

const randomFallback = () => AI_FALLBACK_RESPONSES[Math.floor(Math.random() * AI_FALLBACK_RESPONSES.length)];

const withTimeout = async <T,>(promise: Promise<T>, timeoutMs = 12000): Promise<T> => {
  let timeoutId: number | null = null;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = window.setTimeout(() => reject(new Error("AI_TIMEOUT")), timeoutMs);
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }
  }
};

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
  const sessionIdRef = useRef<string>(
    typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`
  );
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, isOpen]);

  const addMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  const parseConsultants = (csv: string): ConsultantInfo[] => {
    const lines = csv.split(/\r?\n/).filter(Boolean);
    if (lines.length <= 1) return [];

    return lines.slice(1).map((line) => {
      const parts = line.split(",").map((part) => part.trim()).filter((part) => part.length > 0);
      const name = parts[0] || "";
      const location = parts[1] || "";
      const mobile = parts[2] || "";
      let role = "";
      let email = "";

      if (parts.length >= 5) {
        role = parts[3] || "";
        email = parts.slice(4).join(",").trim();
      } else if (parts.length === 4) {
        email = parts[3] || "";
      }

      return { name, location, mobile, role, email };
    });
  };

  const inferDomain = (text = "") => {
    const value = text.toLowerCase();
    if (value.includes("hire") || value.includes("hiring") || value.includes("recruit") || value.includes("recruitment") || value.includes("staffing") || value.includes("candidate") || value.includes("hr") || value.includes("human resources") || value.includes("talent")) return "hr";
    if (value.includes("legal") || value.includes("compliance") || value.includes("contract")) return "legal";
    if (value.includes("finance") || value.includes("cfo") || value.includes("tax") || value.includes("account")) return "finance";
    if (value.includes("it") || value.includes("data") || value.includes("ai") || value.includes("cloud")) return "it";
    return "";
  };

  const domainKeywords: Record<string, string[]> = {
    hr: ["hr", "human resources", "talent", "recruitment", "recruit", "hiring", "hire", "staffing", "payroll", "employee", "candidate"],
    legal: ["legal", "compliance", "contract", "policy", "litigation"],
    finance: ["finance", "financial", "cfo", "tax", "audit", "account"],
    it: ["it", "data", "ai", "cloud", "software", "infrastructure"],
  };

  const selectConsultant = (consultants: ConsultantInfo[], taskSummary: string) => {
    if (!consultants.length) return null;
    const domain = inferDomain(taskSummary);
    const keywords = domainKeywords[domain] || [];
    const summary = taskSummary.toLowerCase();

    let bestScore = 0;
    let bestMatch: ConsultantInfo | null = null;

    consultants.forEach((consultant) => {
      const role = consultant.role.toLowerCase();
      const email = consultant.email.toLowerCase();
      let score = 0;

      if (domain && (role.includes(domain) || email.includes(domain))) {
        score += 3;
      }

      keywords.forEach((keyword) => {
        if (summary.includes(keyword)) score += 2;
        if (role.includes(keyword)) score += 1;
        if (email.includes(keyword)) score += 1;
      });

      if (score > bestScore) {
        bestScore = score;
        bestMatch = consultant;
      }
    });

    return bestScore > 0 ? bestMatch : null;
  };

  const fetchResponse = async (question: string) => {
    const payload = {
      message: question,
      session_id: sessionIdRef.current,
    };

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const request = async () => {
      const response = await fetch(`${leadApiBase}/api/chat`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = new Error(`AI_HTTP_${response.status}`);
        (error as Error & { status?: number }).status = response.status;
        throw error;
      }

      const data = (await response.json()) as Record<string, unknown>;
      return (
        (typeof data.text === "string" && data.text) ||
        (typeof data.answer === "string" && data.answer) ||
        (typeof data.response === "string" && data.response) ||
        (typeof data.output === "string" && data.output) ||
        "Sorry, I couldn't find an answer."
      );
    };

    try {
      const text = await withTimeout(request());
      setLlmStatus("ok");
      return text;
    } catch (error) {
      const status = error instanceof Error && "status" in error ? (error as { status?: number }).status : undefined;
      if (status === 502 || status === 503 || status === 504) {
        setLlmStatus("error");
        return randomFallback();
      }
      if (error instanceof Error && error.message === "AI_TIMEOUT") {
        setLlmStatus("error");
        return randomFallback();
      }
      setLlmStatus("error");
      return randomFallback();
    }
  };

  const saveLead = async (payload: LeadInfo) => {
    const response = await fetch(`${leadApiBase}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to save lead");
    }
  };

  const fetchConsultant = async (taskSummary: string) => {
    try {
      const response = await fetch(`${leadApiBase}/api/consultant`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskSummary }),
      });

      if (response.status === 404) {
        throw new Error("NO_MATCH");
      }

      if (!response.ok) {
        throw new Error("Failed to find consultant");
      }

      const data = (await response.json()) as { consultant: ConsultantInfo };
      return data.consultant;
    } catch (error) {
      const fallbackResponse = await fetch("/data/consultants.csv");
      if (!fallbackResponse.ok) {
        throw error;
      }
      const csv = await fallbackResponse.text();
      const consultants = parseConsultants(csv);
      const match = selectConsultant(consultants, taskSummary);
      if (!match) {
        throw new Error("NO_MATCH");
      }
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
    const response = await fetch(`${leadApiBase}/api/notify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to log notification");
    }
  };

  const processInput = async (value: string) => {
    if (value === "open:hr-hiring") {
      setIsOpen(false);
      window.location.assign("/hire-through-ofstride");
      return;
    }

    if (value === "open:hr-candidate") {
      setIsOpen(false);
      window.location.assign("/apply-for-jobs");
      return;
    }
    if (scheduleStage === "time") {
      const updatedTime = lead.preferredTime ? `${lead.preferredTime} - ${value}` : value;
      const tzMatch = value.match(/\b(UTC|GMT|IST|CST|EST|PST|MST|BST|CEST|EET)\b/i);
      const preferredTimezone = tzMatch ? tzMatch[0].toUpperCase() : lead.preferredTimezone;
      setLead((prev) => ({
        ...prev,
        preferredTime: updatedTime,
        preferredTimezone,
      }));
      setScheduleStage("none");
      addMessage({
        id: `${Date.now()}-bot`,
        type: "bot",
        content: "Thanks! We’ll use that preferred time window when arranging the call.",
        options: [
          { label: "Talk to consultant", value: "talk to consultant" },
          { label: "Ask another question", value: "continue" },
        ],
      });
      return;
    }

    if (value.startsWith("schedule:")) {
      const label = value.replace("schedule:", "").trim();
      setLead((prev) => ({ ...prev, preferredTime: label }));
      setScheduleStage("time");
      addMessage({
        id: `${Date.now()}-bot`,
        type: "bot",
        content: "What time window works best (include timezone, e.g., 3–5 PM IST)?",
      });
      return;
    }
    if (intakeStep !== "done") {
      if (intakeStep === "name") {
        setLead((prev) => ({ ...prev, name: value }));
        setIntakeStep("phone");
        addMessage({
          id: `${Date.now()}-bot`,
          type: "bot",
          content: "Thanks! What’s the best phone number to reach you?",
        });
        return;
      }

      if (intakeStep === "phone") {
        if (!isValidPhone(value)) {
          addMessage({
            id: `${Date.now()}-bot`,
            type: "bot",
            content: "Please enter a valid phone number with country code (e.g., +91 98765 43210).",
          });
          return;
        }

        setLead((prev) => ({ ...prev, phone: value }));
        setIntakeStep("location");
        addMessage({
          id: `${Date.now()}-bot`,
          type: "bot",
          content: "Great. What’s your location (city)?",
        });
        return;
      }

      if (intakeStep === "location") {
        setLead((prev) => ({ ...prev, location: value }));
        setIntakeStep("company");
        addMessage({
          id: `${Date.now()}-bot`,
          type: "bot",
          content: "What’s your company name?",
        });
        return;
      }

      if (intakeStep === "company") {
        setLead((prev) => ({ ...prev, company: value }));
        setIntakeStep("task");
        addMessage({
          id: `${Date.now()}-bot`,
          type: "bot",
          content: "Briefly describe what you need help with (1–2 sentences).",
        });
        return;
      }

      if (intakeStep === "task") {
        const nextLead = { ...lead, taskSummary: value };
        setLead(nextLead);
        setIsLoading(true);
        try {
          await saveLead(nextLead);
          addMessage({
            id: `${Date.now()}-bot`,
            type: "bot",
            content: "Thanks! You can now ask any questions. If you’d like to speak to a consultant, just say “talk to consultant.”",
            options: [{ label: "Talk to consultant", value: "talk to consultant" }],
          });
        } catch (error) {
          console.error(error);
          addMessage({
            id: `${Date.now()}-bot`,
            type: "bot",
            content: "Thanks! I couldn’t save your details right now, but you can still ask any questions.",
            options: [{ label: "Talk to consultant", value: "talk to consultant" }],
          });
        } finally {
          setIsLoading(false);
          setIntakeStep("done");
        }
        return;
      }
    }

    if (awaitingNotify && pendingConsultant) {
      const wantsNotify = /^(yes|yep|sure|ok|okay|please)/i.test(value);
      if (wantsNotify) {
        setIsLoading(true);
        try {
          await notifyConsultant({ lead, consultant: pendingConsultant });
          addMessage({
            id: `${Date.now()}-bot`,
            type: "bot",
            content: "Got it. I’ve logged your request and our team will follow up shortly.",
            options: [{ label: "Start over", value: "restart" }],
          });
        } catch (error) {
          console.error(error);
          addMessage({
            id: `${Date.now()}-bot`,
            type: "bot",
            content: "I couldn’t log the notification just now. Please try again in a moment.",
          });
        } finally {
          setIsLoading(false);
          setAwaitingNotify(false);
          setPendingConsultant(null);
        }
        return;
      }

      addMessage({
        id: `${Date.now()}-bot`,
        type: "bot",
        content: "No problem. Let me know if you want me to connect you later.",
      });
      setAwaitingNotify(false);
      setPendingConsultant(null);
      return;
    }

    if (value === "restart") {
      setMessages([initialMessage]);
      setIntakeStep("name");
      setLead({
        name: "",
        phone: "",
        location: "",
        company: "",
        taskSummary: "",
        preferredTime: "",
        preferredTimezone: "",
      });
      setScheduleStage("none");
      return;
    }

    const wantsHiringForm = /(hire|hiring|recruit|recruitment|staffing|job opening|vacancy|position)/i.test(value);
    const wantsCandidateForm = /(apply|candidate|resume|cv|job seeker|job application)/i.test(value);
    if (wantsHiringForm || wantsCandidateForm) {
      addMessage({
        id: `${Date.now()}-bot`,
        type: "bot",
        content: "I can open the HR intake form right away. Which one do you need?",
        options: [
          { label: "Hire through Ofstride", value: "open:hr-hiring" },
          { label: "Candidate profile", value: "open:hr-candidate" },
        ],
      });
      return;
    }

    const wantsConsultant = /(talk|speak|call|phone|contact|consultant|whatsapp|hire|hiring|recruit|recruitment|staffing)/i.test(value)
      || (/(hr|human resources|legal|finance|financial|it|data|ai|cloud)/i.test(value)
        && /(need|service|help|support|connect|expert|advisor|hire|hiring|recruit)/i.test(value));
    if (wantsConsultant) {
      setIsLoading(true);
      try {
        const consultant = await fetchConsultant(lead.taskSummary || value);
        setPendingConsultant(consultant);
        setAwaitingNotify(true);
        addMessage({
          id: `${Date.now()}-bot`,
          type: "bot",
          content: `Here’s the best match: ${consultant.name} (${consultant.role || "Consultant"})\nPhone: ${consultant.mobile}\nEmail: ${consultant.email}\nWould you like me to notify them?`,
          options: [
            { label: "Yes, notify", value: "yes" },
            { label: "Not now", value: "no" },
          ],
        });
      } catch (error) {
        console.error(error);
        const message = error instanceof Error && error.message === "NO_MATCH"
          ? "We don’t have a listed specialist for this requirement yet. We’ll consult our partner network and share the right contact details soon."
          : "I couldn’t find a consultant right now. Please share a bit more detail about your request.";
        addMessage({
          id: `${Date.now()}-bot`,
          type: "bot",
          content: message,
        });
      } finally {
        setIsLoading(false);
      }
      return;
    }

    setIsLoading(true);

    try {
      const context = lead.taskSummary ? `\n\nClient context: ${lead.taskSummary}` : "";
      const reply = await fetchResponse(`${value}${context}`);
      addMessage({ id: `${Date.now()}-bot`, type: "bot", content: reply });
      addMessage({
        id: `${Date.now()}-bot`,
        type: "bot",
        content: "Would you like to schedule a call with a consultant?",
        options: [
          { label: "Today", value: "schedule:Today" },
          { label: "Tomorrow", value: "schedule:Tomorrow" },
          { label: "This week", value: "schedule:This week" },
          { label: "Talk to consultant", value: "talk to consultant" },
        ],
      });
    } catch (error) {
      console.error(error);
      addMessage({
        id: `${Date.now()}-bot`,
        type: "bot",
        content: "Sorry, I’m having trouble right now. Would you like to schedule a call instead?",
        options: [
          { label: "Today", value: "schedule:Today" },
          { label: "Tomorrow", value: "schedule:Tomorrow" },
          { label: "This week", value: "schedule:This week" },
          { label: "Talk to consultant", value: "talk to consultant" },
        ],
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const value = input.trim();
    if (!value || isLoading) return;

    addMessage({ id: `${Date.now()}-user`, type: "user", content: value });
    setInput("");
    await processInput(value);
  };

  const handleOptionClick = async (option: ChatOption) => {
    if (isLoading) return;
    addMessage({ id: `${Date.now()}-user`, type: "user", content: option.label });
    await processInput(option.value);
  };

  return (
    <>
      <button
        className="btn btn-primary fixed bottom-6 right-6 z-50"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? "Close" : "Chat with Offstride"}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[540px] w-[380px] max-w-[calc(100vw-48px)] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-strong">
          <div className="flex items-center justify-between bg-gradient-to-r from-primary-500 to-primary-600 px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 rounded-full bg-white/20" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Offstride Assistant</span>
                <span className={`text-[11px] ${llmStatus === "ok" ? "text-emerald-100" : llmStatus === "error" ? "text-amber-100" : "text-white/80"}`}>
                  AI Assist: {llmStatus === "ok" ? "Online" : llmStatus === "error" ? "Temporarily offline" : "Connecting"}
                </span>
              </div>
            </div>
            <button className="text-xs" onClick={() => setIsOpen(false)}>Close</button>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[80%]">
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm ${
                      message.type === "user"
                        ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white"
                        : "border border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.content}</p>
                  </div>
                  {message.type === "bot" && message.options && message.options.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.options.map((option) => (
                        <button
                          key={option.label}
                          type="button"
                          className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 transition hover:border-primary-300 hover:text-primary-600"
                          onClick={() => handleOptionClick(option)}
                        >
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
                <div className="max-w-[80%] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
                  Thinking…
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form className="flex gap-2 border-t border-slate-200 bg-white p-4" onSubmit={handleSubmit}>
            <input
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={isLoading ? "Waiting for response" : "Type your message"}
              disabled={isLoading}
            />
            <button type="submit" className="btn btn-primary px-4" disabled={isLoading || !input.trim()}>
              Send
            </button>
          </form>
          {llmStatus === "error" && (
            <p className="px-4 pb-4 text-xs text-amber-600">
              AI Assist is warming up. I can still connect you with a consultant.
            </p>
          )}
        </div>
      )}
    </>
  );
}
