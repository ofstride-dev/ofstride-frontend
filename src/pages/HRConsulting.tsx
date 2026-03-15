import { useEffect, useMemo, useRef, useState } from "react";
import { ConsultForm } from "../components/ConsultForm";
import heroImage from "../assets/img/hero/hero-02.png";

const leadApiBase = import.meta.env.VITE_LEAD_API || "";

export function HRConsulting() {
  const [hiringStatus, setHiringStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [candidateStatus, setCandidateStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [candidateResume, setCandidateResume] = useState<File | null>(null);
  const [employmentType, setEmploymentType] = useState("Full-time");
  const [workMode, setWorkMode] = useState("Hybrid");
  const hiringRef = useRef<HTMLDivElement | null>(null);
  const candidateRef = useRef<HTMLDivElement | null>(null);

  const intent = useMemo(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("intent") || "";
  }, []);

  useEffect(() => {
    if (intent === "hiring") {
      hiringRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (intent === "candidate") {
      candidateRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [intent]);
  const coreServices = [
    {
      title: "Talent Acquisition and Recruitment",
      description:
        "Identify and recruit individuals who align with your company culture and objectives using proven sourcing and selection practices.",
      badgeClass: "from-emerald-500 to-teal-500",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
          <path d="M4 20a8 8 0 0 1 16 0" />
        </svg>
      ),
    },
    {
      title: "Employee Development and Training",
      description:
        "Customized training programs across leadership and technical skills to help teams grow and perform at their best.",
      badgeClass: "from-blue-500 to-indigo-500",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 6h16" />
          <path d="M6 6v12" />
          <path d="M18 6v12" />
          <path d="M6 18h12" />
        </svg>
      ),
    },
    {
      title: "Compensation and Benefits Design",
      description:
        "Design strategic reward systems that are competitive, fair, and aligned to performance and retention goals.",
      badgeClass: "from-amber-500 to-orange-500",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 19h16" />
          <path d="M7 15V9" />
          <path d="M12 15V5" />
          <path d="M17 15v-7" />
        </svg>
      ),
    },
    {
      title: "HR Policy Development",
      description:
        "Create policies that promote a positive work environment, consistency, and compliance across HR operations.",
      badgeClass: "from-violet-500 to-purple-500",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M6 4h9l3 3v13H6z" />
          <path d="M9 12h6" />
          <path d="M9 16h6" />
        </svg>
      ),
    },
    {
      title: "HR Compliance and Legal Support",
      description:
        "Stay compliant with evolving regulations through proactive guidance and risk mitigation support.",
      badgeClass: "from-rose-500 to-pink-500",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      title: "Industrial Training and Placement",
      description:
        "Bridge academia and industry through training and placement programs that align talent with real‑world roles.",
      badgeClass: "from-cyan-500 to-sky-500",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 10l8-4 8 4-8 4-8-4Z" />
          <path d="M6 12v4c2 1.3 4 2 6 2s4-.7 6-2v-4" />
        </svg>
      ),
    },
  ];

  const engagementProcess = [
    { step: "1. Diagnose", description: "Map talent gaps, hiring flow, and retention risks." },
    { step: "2. Design", description: "Build role scorecards, policies, and enablement playbooks." },
    { step: "3. Embed", description: "Operationalize routines and track engagement metrics." },
  ];

  const openRoles = [
    { title: "HR Generalist", location: "Bangalore", service: "HR", grade: "Associate" },
    { title: "Talent Acquisition Specialist", location: "Remote", service: "HR", grade: "Senior Associate" },
    { title: "HR Operations Lead", location: "Hyderabad", service: "HR", grade: "Manager" },
  ];

  const showForms = intent === "hiring" || intent === "candidate";

  const handleHiringSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (hiringStatus === "loading") return;
    setHiringStatus("loading");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const response = await fetch(`${leadApiBase}/api/hr/hiring`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Failed");
      setHiringStatus("success");
      event.currentTarget.reset();
    } catch (error) {
      console.error(error);
      setHiringStatus("error");
    }
  };

  const handleCandidateSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (candidateStatus === "loading") return;
    setCandidateStatus("loading");
    const form = new FormData(event.currentTarget);
    if (candidateResume) {
      form.append("resume", candidateResume);
    }
    try {
      const response = await fetch(`${leadApiBase}/api/hr/candidate`, {
        method: "POST",
        body: form,
      });
      if (!response.ok) throw new Error("Failed");
      setCandidateStatus("success");
      event.currentTarget.reset();
      setCandidateResume(null);
    } catch (error) {
      console.error(error);
      setCandidateStatus("error");
    }
  };

  return (
    <main>
      <section className="bg-slate-950 py-16 text-white">
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr,0.9fr]">
            <div>
              <h1 className="text-3xl font-bold gradient-text">HR Consulting</h1>
              <p className="mt-3 text-slate-300">
                People-first strategies that strengthen culture and performance.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a className="btn btn-primary" href="#consult-form">Request a consultant</a>
                <a className="btn btn-outline" href="/hire-through-ofstride">Hire through Ofstride</a>
                <a className="btn btn-outline" href="/apply-for-jobs">Apply for jobs</a>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <img
                src={heroImage}
                alt="HR consulting"
                className="h-auto w-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-10">
        <div className="container-page grid gap-4 md:grid-cols-3">
          <a className="card card-hover" href="#consult-form">
            <h3 className="text-lg font-semibold text-slate-900">Consult / Inquiry</h3>
            <p className="mt-2 text-sm text-slate-600">Share your HR goals and get a tailored response.</p>
          </a>
          <a className="card card-hover" href="/hire-through-ofstride">
            <h3 className="text-lg font-semibold text-slate-900">Hire through Ofstride</h3>
            <p className="mt-2 text-sm text-slate-600">Submit role requirements for faster hiring support.</p>
          </a>
          <a className="card card-hover" href="/apply-for-jobs">
            <h3 className="text-lg font-semibold text-slate-900">Apply for jobs</h3>
            <p className="mt-2 text-sm text-slate-600">Upload your profile and resume for open roles.</p>
          </a>
        </div>
      </section>
      <section className="bg-slate-50 py-16">
        <div className="container-page">
          <div className="section-title section-title-left">
            <h2>Core HR services</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {coreServices.map((service) => (
              <div key={service.title} className="card card-hover">
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${service.badgeClass} shadow-strong`}>
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container-page">
          <div className="section-title section-title-left">
            <h2>How we engage</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {engagementProcess.map((item) => (
              <div key={item.step} className="card card-hover">
                <h3 className="text-lg font-semibold">{item.step}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16" id="consult-form">
        <div className="container-page max-w-4xl">
          <ConsultForm
            title="Talk to an HR consultant"
            description="Share your hiring or people-ops goals and we’ll suggest the right next step."
            submitLabel="Request a consult"
          />
          <div className="mt-4 flex flex-wrap gap-3">
            <a className="btn btn-outline-dark" href="/hire-through-ofstride">Recruiter request form</a>
            <a className="btn btn-outline-dark" href="/apply-for-jobs">Candidate profile form</a>
          </div>
        </div>
      </section>
      <section className="bg-slate-50 py-16" id="apply-jobs">
        <div className="container-page">
          <div className="section-title section-title-left">
            <h2>Open roles</h2>
            <p className="text-sm text-slate-600">Apply to current openings or submit your profile for future roles.</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">Grade</th>
                  <th className="px-4 py-3">Apply</th>
                </tr>
              </thead>
              <tbody>
                {openRoles.map((role) => (
                  <tr key={role.title} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-semibold text-slate-800">{role.title}</td>
                    <td className="px-4 py-3">{role.location}</td>
                    <td className="px-4 py-3">{role.service}</td>
                    <td className="px-4 py-3">{role.grade}</td>
                    <td className="px-4 py-3">
                      <a className="btn btn-outline-dark" href="/apply-for-jobs">
                        Apply
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a className="btn btn-primary" href="/apply-for-jobs">Submit candidate profile</a>
            <a className="btn btn-outline-dark" href="/hire-through-ofstride">Hire through Ofstride</a>
          </div>
        </div>
      </section>
      {showForms && (
        <section className="bg-white py-16" id="hr-forms">
          <div className="container-page grid gap-10 lg:grid-cols-2">
            {intent === "hiring" && (
              <div className="space-y-4" ref={hiringRef}>
                <h2 className="text-2xl font-semibold text-slate-900">Hire through Ofstride HR</h2>
                <p className="text-sm text-slate-600">
                  Share your role requirements and we’ll match you with vetted talent. Our HR team will confirm details and schedule next steps.
                </p>
                <form className="grid gap-4" onSubmit={handleHiringSubmit}>
                  <input name="company" required className="input" placeholder="Company name" />
                  <input name="roleTitle" required className="input" placeholder="Role title" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <select
                      name="employmentType"
                      value={employmentType}
                      onChange={(event) => setEmploymentType(event.target.value)}
                      className="input"
                      required
                    >
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                    </select>
                    <select
                      name="workMode"
                      value={workMode}
                      onChange={(event) => setWorkMode(event.target.value)}
                      className="input"
                      required
                    >
                      <option>Hybrid</option>
                      <option>Remote</option>
                      <option>Onsite</option>
                    </select>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input name="experience" required className="input" placeholder="Experience needed" />
                    <input name="positionsCount" className="input" placeholder="Positions to hire" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input name="location" required className="input" placeholder="Location / Timezone" />
                    <input name="salaryRange" className="input" placeholder="Salary range" />
                  </div>
                  <input name="skills" required className="input" placeholder="Key skills" />
                  <input name="urgency" className="input" placeholder="Urgency (e.g., Immediate / 30 days)" />
                  {employmentType === "Contract" && (
                    <input name="contractDuration" className="input" placeholder="Contract duration (e.g., 6 months)" />
                  )}
                  {workMode === "Onsite" && (
                    <input name="officeAddress" className="input" placeholder="Office location / address" />
                  )}
                  {workMode === "Remote" && (
                    <input name="timezone" className="input" placeholder="Preferred timezone" />
                  )}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input name="contactName" required className="input" placeholder="Contact name" />
                    <input name="contactPhone" required className="input" placeholder="Contact phone" />
                  </div>
                  <input name="contactEmail" required className="input" placeholder="Contact email" type="email" />
                  <textarea name="notes" className="input min-h-[120px]" placeholder="Notes / role context" />
                  <button className="btn btn-primary" type="submit" disabled={hiringStatus === "loading"}>
                    {hiringStatus === "loading" ? "Submitting…" : "Submit hiring request"}
                  </button>
                  {hiringStatus === "success" && (
                    <p className="text-sm text-emerald-600">Thanks! Our HR team will follow up shortly.</p>
                  )}
                  {hiringStatus === "error" && (
                    <p className="text-sm text-rose-600">Unable to submit right now. Please try again.</p>
                  )}
                </form>
              </div>
            )}
            {intent === "candidate" && (
              <div className="space-y-4" ref={candidateRef}>
                <h2 className="text-2xl font-semibold text-slate-900">Candidate profile submission</h2>
                <p className="text-sm text-slate-600">
                  Apply for roles advertised by Ofstride. Upload your resume and our HR team will reach out to schedule interviews.
                </p>
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
                      accept=".pdf,.doc,.docx"
                      onChange={(event) => setCandidateResume(event.target.files?.[0] || null)}
                    />
                    <p className="mt-2">Upload resume (PDF/DOC/DOCX).</p>
                  </div>
                  <button className="btn btn-primary" type="submit" disabled={candidateStatus === "loading"}>
                    {candidateStatus === "loading" ? "Submitting…" : "Submit candidate profile"}
                  </button>
                  {candidateStatus === "success" && (
                    <p className="text-sm text-emerald-600">Profile submitted. Our HR team will contact you.</p>
                  )}
                  {candidateStatus === "error" && (
                    <p className="text-sm text-rose-600">Unable to submit right now. Please try again.</p>
                  )}
                </form>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
