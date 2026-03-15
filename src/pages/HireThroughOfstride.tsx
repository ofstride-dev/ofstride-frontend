import { useState } from "react";
import heroImage from "../assets/img/hero/hero-02.png";

const leadApiBase = import.meta.env.VITE_LEAD_API || "";

export function HireThroughOfstride() {
  const [hiringStatus, setHiringStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [employmentType, setEmploymentType] = useState("Full-time");
  const [workMode, setWorkMode] = useState("Hybrid");

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

  return (
    <main>
      <section className="bg-slate-950 py-16 text-white">
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr,0.9fr]">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Hire through Ofstride</h1>
              <p className="mt-3 text-slate-300">
                Share role requirements and hiring timelines. Our HR team will match you with vetted talent.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a className="btn btn-primary" href="#hire-form">Start hiring request</a>
                <a className="btn btn-outline" href="/hr-consulting">Explore HR consulting</a>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <img src={heroImage} alt="Hire through Ofstride" className="h-auto w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" id="hire-form">
        <div className="container-page max-w-4xl">
          <div className="section-title section-title-left">
            <h2>Hiring request form</h2>
            <p className="text-slate-600">
              Provide role details so we can shortlist candidates that fit your requirements and culture.
            </p>
          </div>
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
      </section>
    </main>
  );
}
