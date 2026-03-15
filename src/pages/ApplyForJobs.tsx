import { useMemo, useState } from "react";
import heroImage from "../assets/img/hero/hero-02.png";

const leadApiBase = import.meta.env.VITE_LEAD_API || "";

/** ===== ResumeIQ UI (minimal, embedded) ===== */
const COLORS = {
  card: "#0d1425",
  cardBorder: "#1a2644",
  accent: "#0077b5",
  accentGlow: "#0099e6",
  gold: "#f5a623",
  green: "#00c07f",
  red: "#ff4757",
  text: "#e8eaf0",
  textMuted: "#7a8db0",
  surface: "#111827",
  surfaceHover: "#162035",
};

function ProgressBar({ value, color = COLORS.accent, height = 8 }: { value: number; color?: string; height?: number }) {
  return (
    <div style={{ width: "100%", height, background: COLORS.cardBorder, borderRadius: 999, overflow: "hidden" }}>
      <div
        style={{
          height: "100%",
          width: `${Math.max(0, Math.min(100, value || 0))}%`,
          background: color,
          borderRadius: 999,
          transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: `0 0 8px ${color}66`,
        }}
      />
    </div>
  );
}

function ScoreRing({
  score,
  size = 130,
  stroke = 10,
  color = COLORS.accent,
  sublabel = "SCORE",
}: {
  score: number;
  size?: number;
  stroke?: number;
  color?: string;
  sublabel?: string;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, score || 0));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={COLORS.cardBorder} strokeWidth={stroke} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)",
              filter: `drop-shadow(0 0 6px ${color}88)`,
            }}
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 26, fontWeight: 800, color: COLORS.text, fontFamily: "'Sora', sans-serif" }}>{clamped}</span>
          <span style={{ fontSize: 10, color: COLORS.textMuted, fontFamily: "'Sora', sans-serif" }}>{sublabel}</span>
        </div>
      </div>
    </div>
  );
}

function PriorityBadge({ priority }: { priority: "high" | "medium" | "low" }) {
  const map: Record<string, { color: string; label: string }> = {
    high: { color: COLORS.red, label: "HIGH" },
    medium: { color: COLORS.gold, label: "MED" },
    low: { color: COLORS.green, label: "LOW" },
  };
  const { color, label } = map[priority] || map.low;
  return (
    <span style={{ fontSize: 10, fontWeight: 800, color, background: color + "22", padding: "2px 7px", borderRadius: 999, letterSpacing: 1 }}>
      {label}
    </span>
  );
}

function GradeBadge({ grade }: { grade: string }) {
  const g = (grade || "").toUpperCase();
  const color = g.startsWith("A") ? COLORS.green : g.startsWith("B") ? COLORS.accentGlow : g.startsWith("C") ? COLORS.gold : COLORS.red;
  return (
    <div
      style={{
        width: 80,
        height: 80,
        borderRadius: 16,
        background: color + "22",
        border: `2px solid ${color}44`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <span style={{ fontSize: 32, fontWeight: 900, color, lineHeight: 1, fontFamily: "'Sora', sans-serif" }}>{g || "—"}</span>
      <span style={{ fontSize: 10, color: COLORS.textMuted, fontFamily: "'Sora', sans-serif" }}>GRADE</span>
    </div>
  );
}

function SectionCard({ title, data, icon }: { title: string; data: any; icon: string }) {
  const statusColors: Record<string, string> = { strong: COLORS.green, good: COLORS.accentGlow, average: COLORS.gold, weak: COLORS.red, missing: "#6b7280" };
  const color = statusColors[data?.status] || COLORS.textMuted;
  return (
    <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, display: "flex", gap: 6, alignItems: "center" }}>
          <span>{icon}</span>
          {title}
        </span>
        <span style={{ fontSize: 11, fontWeight: 800, color, background: color + "22", padding: "2px 8px", borderRadius: 999, textTransform: "uppercase", letterSpacing: 0.5 }}>
          {data?.status || "—"}
        </span>
      </div>
      <ProgressBar value={data?.score || 0} color={color} height={6} />
      <p style={{ fontSize: 12, color: COLORS.textMuted, margin: 0, lineHeight: 1.5 }}>{data?.feedback || ""}</p>
    </div>
  );
}

/** ===== Page ===== */
export function ApplyForJobs() {
  const [candidateStatus, setCandidateStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [candidateResume, setCandidateResume] = useState<File | null>(null);

  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState<string>("");
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "sections" | "improvements" | "keywords">("overview");

  const tabs = useMemo(() => ["overview", "sections", "improvements", "keywords"] as const, []);

  const handleCandidateSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (candidateStatus === "loading" || analysisLoading) return;

    setCandidateStatus("loading");
    setAnalysisLoading(true);
    setAnalysisError("");
    setAnalysisResult(null);

    const formEl = event.currentTarget;
    const form = new FormData(formEl);

    if (candidateResume) form.append("resume", candidateResume);

    try {
      // 1) Save candidate profile (this is your existing DB + file save)
      const saveRes = await fetch(`${leadApiBase}/api/hr/candidate`, { method: "POST", body: form });
      if (!saveRes.ok) throw new Error("Failed to submit candidate profile");

      // 2) Analyze resume (separate endpoint)
      if (!candidateResume) throw new Error("Please upload a resume first.");

      const analyzeForm = new FormData();
      analyzeForm.append("resume", candidateResume);

      const analyzeRes = await fetch(`${leadApiBase}/api/hr/candidate/analyze`, { method: "POST", body: analyzeForm });
      const analyzeData = await analyzeRes.json().catch(() => ({}));

      if (!analyzeRes.ok || !analyzeData?.ok) {
        throw new Error(analyzeData?.detail || analyzeData?.error || "Resume analysis failed");
      }

      setAnalysisResult(analyzeData.analysis);
      setActiveTab("overview");
      setCandidateStatus("success");

      // OPTIONAL: keep form as-is (since you want to see result). If you want reset, uncomment below:
      // formEl.reset();
      // setCandidateResume(null);

      setTimeout(() => {
        document.getElementById("resume-analysis-result")?.scrollIntoView({ behavior: "smooth" });
      }, 120);
    } catch (err: any) {
      console.error(err);
      setCandidateStatus("error");
      setAnalysisError(err?.message || "Something went wrong.");
    } finally {
      setAnalysisLoading(false);
    }
  };

  const scoreColor =
    (analysisResult?.overallScore ?? 0) >= 80
      ? COLORS.green
      : (analysisResult?.overallScore ?? 0) >= 60
        ? COLORS.accentGlow
        : COLORS.gold;

  return (
    <main>
      {/* Hero */}
      <section className="bg-slate-950 py-16 text-white">
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr,0.9fr]">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Apply for jobs</h1>
              <p className="mt-3 text-slate-300">
                Submit your profile for open roles. Our HR team will review and contact you for the next steps.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a className="btn btn-primary" href="#apply-form">Submit profile</a>
                <a className="btn btn-outline" href="/hr-consulting">Explore HR consulting</a>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <img src={heroImage} alt="Apply for jobs" className="h-auto w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16" id="apply-form">
        <div className="container-page max-w-4xl">
          <div className="section-title section-title-left">
            <h2>Candidate profile submission</h2>
            <p className="text-slate-600">
              Upload your resume and tell us about your experience so we can match you with the right opportunity.
            </p>
          </div>

          <form className="grid gap-4" onSubmit={handleCandidateSubmit}>
            <input name="full_name" required className="input" placeholder="Full name" />
            <input name="email" required type="email" className="input" placeholder="Email address" />
            <input name="phone" required className="input" placeholder="Phone number" />
            <input name="location" required className="input" placeholder="Location" />
            <input name="role_interest" required className="input" placeholder="Role you are applying for" />

            <div className="grid gap-4 sm:grid-cols-2">
              <input name="experience" required className="input" placeholder="Years of experience" />
              <input name="skills" required className="input" placeholder="Core skills" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <input name="linkedin" className="input" placeholder="LinkedIn URL" />
              <input name="portfolio" className="input" placeholder="Portfolio URL" />
            </div>

            <div className="rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt,.rtf"
                onChange={(event) => setCandidateResume(event.target.files?.[0] || null)}
              />
              <p className="mt-2">Upload resume (PDF/DOC/DOCX/TXT). For best results, use a text-based PDF.</p>
            </div>

            <button className="btn btn-primary" type="submit" disabled={candidateStatus === "loading" || analysisLoading}>
              {(candidateStatus === "loading" || analysisLoading) ? "Analyzing…" : "Analyze & Submit"}
            </button>

            {candidateStatus === "success" && (
              <p className="text-sm text-emerald-600">Profile submitted. Showing your ResumeIQ analysis below.</p>
            )}
            {candidateStatus === "error" && (
              <p className="text-sm text-rose-600">Unable to submit/analyze right now. {analysisError ? `(${analysisError})` : "Please try again."}</p>
            )}
          </form>
        </div>
      </section>

      {/* Results (ResumeIQ UI) */}
      {analysisResult && (
        <section className="py-16" id="resume-analysis-result" style={{ background: "#080d1a" }}>
          <div className="container-page max-w-5xl">
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
              .tab-btn:hover { background: ${COLORS.surfaceHover} !important; }
              .improvement-card:hover { border-color: ${COLORS.accent}44 !important; background: ${COLORS.surfaceHover} !important; }
            `}</style>

            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentGlow})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                  💼
                </div>
                <span style={{ fontSize: 22, fontWeight: 800, color: COLORS.text, letterSpacing: -0.5, fontFamily: "'Sora', sans-serif" }}>ResumeIQ</span>
                <span style={{ fontSize: 11, fontWeight: 800, color: COLORS.accent, background: COLORS.accent + "22", padding: "2px 8px", borderRadius: 999, letterSpacing: 1, fontFamily: "'Sora', sans-serif" }}>
                  AI-POWERED
                </span>
              </div>
              <p style={{ color: COLORS.textMuted, fontSize: 14, margin: 0, fontFamily: "'Sora', sans-serif" }}>
                LinkedIn-grade resume intelligence — scoring, ATS analysis & optimization tips
              </p>
            </div>

            {/* Hero card */}
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 20, padding: 28, marginBottom: 16 }}>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
                <ScoreRing score={analysisResult.overallScore || 0} color={scoreColor} />
                <div style={{ flex: 1, minWidth: 240 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                    <GradeBadge grade={analysisResult.grade || "—"} />
                    <div>
                      <p style={{ margin: 0, fontWeight: 800, fontSize: 17, color: COLORS.text, fontFamily: "'Sora', sans-serif" }}>
                        {analysisResult.tagline || "Resume analysis"}
                      </p>
                      <p style={{ margin: "4px 0 0", color: COLORS.textMuted, fontSize: 13, fontFamily: "'Sora', sans-serif" }}>
                        {analysisResult.industryFit || "—"} · {analysisResult.experienceLevel || "—"} · ~{analysisResult.estimatedYearsExperience ?? "—"} yrs exp
                      </p>
                    </div>
                  </div>

                  <p style={{ margin: "0 0 14px", color: COLORS.textMuted, fontSize: 13, lineHeight: 1.6, fontFamily: "'Sora', sans-serif" }}>
                    {analysisResult.summary || ""}
                  </p>

                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {[
                      { label: "ATS Score", value: analysisResult.atsScore, color: COLORS.accentGlow },
                      { label: "Keywords", value: analysisResult.keywordDensity, color: COLORS.gold },
                      { label: "Readability", value: analysisResult.readabilityScore, color: COLORS.green },
                    ].map((m) => (
                      <div key={m.label} style={{ background: COLORS.surface, borderRadius: 10, padding: "8px 14px", textAlign: "center" }}>
                        <div style={{ fontSize: 18, fontWeight: 900, color: m.color, fontFamily: "'Sora', sans-serif" }}>{m.value ?? "—"}</div>
                        <div style={{ fontSize: 10, color: COLORS.textMuted, fontFamily: "'Sora', sans-serif" }}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 4, background: COLORS.surface, borderRadius: 12, padding: 4, marginBottom: 16 }}>
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className="tab-btn"
                  onClick={() => setActiveTab(tab)}
                  style={{
                    flex: 1,
                    padding: "8px 4px",
                    background: activeTab === tab ? COLORS.accent : "transparent",
                    border: "none",
                    borderRadius: 8,
                    color: activeTab === tab ? "#fff" : COLORS.textMuted,
                    fontFamily: "'Sora', sans-serif",
                    fontSize: 12,
                    fontWeight: activeTab === tab ? 800 : 600,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    textTransform: "capitalize",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Overview */}
            {activeTab === "overview" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 16, padding: 20 }}>
                    <h3 style={{ margin: "0 0 14px", fontSize: 14, fontWeight: 800, color: COLORS.green, fontFamily: "'Sora', sans-serif" }}>✅ Strengths</h3>
                    {(analysisResult.strengths || []).map((s: string, i: number) => (
                      <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 10 }}>
                        <span style={{ color: COLORS.green, fontSize: 12, marginTop: 2 }}>◆</span>
                        <span style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.5, fontFamily: "'Sora', sans-serif" }}>{s}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 16, padding: 20 }}>
                    <h3 style={{ margin: "0 0 14px", fontSize: 14, fontWeight: 800, color: COLORS.red, fontFamily: "'Sora', sans-serif" }}>⚠️ Weaknesses</h3>
                    {(analysisResult.weaknesses || []).map((w: string, i: number) => (
                      <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 10 }}>
                        <span style={{ color: COLORS.red, fontSize: 12, marginTop: 2 }}>◆</span>
                        <span style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.5, fontFamily: "'Sora', sans-serif" }}>{w}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 16, padding: 20 }}>
                  <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 800, color: COLORS.text, fontFamily: "'Sora', sans-serif" }}>📊 Score Breakdown</h3>
                  {[
                    { label: "ATS Compatibility", value: analysisResult.atsScore, color: COLORS.accentGlow },
                    { label: "Keyword Density", value: analysisResult.keywordDensity, color: COLORS.gold },
                    { label: "Readability", value: analysisResult.readabilityScore, color: COLORS.green },
                    { label: "Overall Resume Score", value: analysisResult.overallScore, color: COLORS.accent },
                  ].map((m, i) => (
                    <div key={i} style={{ marginBottom: 14 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 700, fontFamily: "'Sora', sans-serif" }}>{m.label}</span>
                        <span style={{ fontSize: 12, color: m.color, fontWeight: 900, fontFamily: "'Sora', sans-serif" }}>{m.value ?? 0}/100</span>
                      </div>
                      <ProgressBar value={m.value ?? 0} color={m.color} height={8} />
                    </div>
                  ))}
                </div>

                <div style={{ background: COLORS.accent + "11", border: `1px solid ${COLORS.accent}33`, borderRadius: 14, padding: "14px 18px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 20 }}>🔗</span>
                  <div>
                    <p style={{ margin: "0 0 4px", fontWeight: 900, fontSize: 13, color: COLORS.accentGlow, fontFamily: "'Sora', sans-serif" }}>LinkedIn Optimization Tip</p>
                    <p style={{ margin: 0, fontSize: 13, color: COLORS.textMuted, lineHeight: 1.5, fontFamily: "'Sora', sans-serif" }}>
                      {analysisResult.linkedinOptimization || ""}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Sections */}
            {activeTab === "sections" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <SectionCard title="Contact Info" data={analysisResult.sections?.contact} icon="📬" />
                <SectionCard title="Summary / Objective" data={analysisResult.sections?.summary} icon="📝" />
                <SectionCard title="Work Experience" data={analysisResult.sections?.experience} icon="💼" />
                <SectionCard title="Education" data={analysisResult.sections?.education} icon="🎓" />
                <SectionCard title="Skills" data={analysisResult.sections?.skills} icon="🔧" />
                <SectionCard title="Achievements" data={analysisResult.sections?.achievements} icon="🏆" />
              </div>
            )}

            {/* Improvements */}
            {activeTab === "improvements" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {(analysisResult.topImprovements || []).map((item: any, i: number) => (
                  <div
                    key={i}
                    className="improvement-card"
                    style={{
                      background: COLORS.card,
                      border: `1px solid ${COLORS.cardBorder}`,
                      borderRadius: 14,
                      padding: "14px 18px",
                      display: "flex",
                      gap: 14,
                      alignItems: "flex-start",
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: COLORS.surface, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, marginTop: 2 }}>
                      {item.priority === "high" ? "🔴" : item.priority === "medium" ? "🟡" : "🟢"}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontWeight: 900, fontSize: 13, color: COLORS.text, fontFamily: "'Sora', sans-serif" }}>{item.title}</span>
                        <PriorityBadge priority={item.priority} />
                      </div>
                      <p style={{ margin: 0, fontSize: 13, color: COLORS.textMuted, lineHeight: 1.5, fontFamily: "'Sora', sans-serif" }}>{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Keywords */}
            {activeTab === "keywords" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 16, padding: 20 }}>
                  <h3 style={{ margin: "0 0 14px", fontSize: 14, fontWeight: 900, color: COLORS.red, fontFamily: "'Sora', sans-serif" }}>🔍 Missing Keywords to Add</h3>
                  <p style={{ margin: "0 0 14px", fontSize: 13, color: COLORS.textMuted, fontFamily: "'Sora', sans-serif" }}>
                    These keywords are commonly expected by ATS systems and recruiters.
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {(analysisResult.missingKeywords || []).map((kw: string, i: number) => (
                      <span key={i} style={{ background: COLORS.red + "15", border: `1px solid ${COLORS.red}33`, color: COLORS.red, borderRadius: 999, padding: "5px 14px", fontSize: 13, fontWeight: 800, fontFamily: "'Sora', sans-serif" }}>
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 16, padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <h3 style={{ margin: 0, fontSize: 14, fontWeight: 900, color: COLORS.text, fontFamily: "'Sora', sans-serif" }}>📈 Keyword Score</h3>
                    <span style={{ fontSize: 22, fontWeight: 900, color: COLORS.gold, fontFamily: "'Sora', sans-serif" }}>
                      {analysisResult.keywordDensity ?? "—"}/100
                    </span>
                  </div>
                  <ProgressBar value={analysisResult.keywordDensity ?? 0} color={COLORS.gold} height={10} />
                </div>
              </div>
            )}

            <div style={{ marginTop: 18 }}>
              <button
                onClick={() => {
                  setAnalysisResult(null);
                  setAnalysisError("");
                  setCandidateStatus("idle");
                }}
                className="btn btn-outline"
              >
                Analyze Another Resume
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
