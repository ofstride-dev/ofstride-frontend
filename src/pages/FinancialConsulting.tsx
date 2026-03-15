import { ConsultForm } from "../components/ConsultForm";
import heroImage from "../assets/img/hero/hero-05.png";

export function FinancialConsulting() {
  const coreServices = [
    {
      title: "Financial Planning and Analysis",
      description: "Comprehensive financial plans aligned with business goals using data‑driven analysis and forecasting.",
      badgeClass: "from-emerald-500 to-teal-500",
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
      title: "Budgeting and Forecasting",
      description: "Realistic budgets and forecasts that support resource allocation and growth planning.",
      badgeClass: "from-blue-500 to-indigo-500",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M6 4h12" />
          <path d="M6 8h12" />
          <path d="M6 12h12" />
          <path d="M6 16h8" />
        </svg>
      ),
    },
    {
      title: "Business Structure and Governance",
      description: "Strategic advice to optimize structure, improve efficiency, and enhance compliance.",
      badgeClass: "from-violet-500 to-purple-500",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 7h16" />
          <path d="M7 7v10" />
          <path d="M17 7v10" />
        </svg>
      ),
    },
    {
      title: "Tax Planning and Compliance",
      description: "Optimize tax liabilities and ensure compliance with changing regulations.",
      badgeClass: "from-amber-500 to-orange-500",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M7 7h10" />
          <path d="M12 4v3" />
          <path d="M9 11h6" />
          <path d="M10 15h4" />
        </svg>
      ),
    },
    {
      title: "Financial Risk Assessment",
      description: "Proactive risk reviews to reduce exposure and strengthen financial stability.",
      badgeClass: "from-rose-500 to-pink-500",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z" />
          <path d="M12 10v4" />
          <path d="M12 17h.01" />
        </svg>
      ),
    },
    {
      title: "Taxation — Direct & Indirect",
      description: "Guidance for income tax planning and GST compliance to stay tax‑efficient.",
      badgeClass: "from-cyan-500 to-sky-500",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 7h16" />
          <path d="M6 7v10" />
          <path d="M18 7v10" />
          <path d="M9 11h6" />
        </svg>
      ),
    },
    {
      title: "Audits — GST Audit, Cost Audit",
      description: "Audit support to keep records accurate, transparent, and regulator‑ready.",
      badgeClass: "from-indigo-500 to-blue-500",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M6 4h9l3 3v13H6z" />
          <path d="M9 12h6" />
          <path d="M9 16h6" />
        </svg>
      ),
    },
    {
      title: "Project Financing and Business Loans",
      description: "Support for securing financing by connecting with suitable lenders and guiding applications.",
      badgeClass: "from-emerald-500 to-green-500",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 11h18" />
          <path d="M5 11v8" />
          <path d="M19 11v8" />
          <path d="M8 7h8" />
          <path d="M10 7V5h4v2" />
        </svg>
      ),
    },
    {
      title: "Virtual CFO Services",
      description: "Strategic financial leadership without a full‑time CFO overhead.",
      badgeClass: "from-fuchsia-500 to-pink-500",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
          <path d="M4 20a8 8 0 0 1 16 0" />
          <path d="M12 14v3" />
        </svg>
      ),
    },
    {
      title: "Tax Audit",
      description: "Detailed reviews to ensure tax compliance and accurate reporting.",
      badgeClass: "from-slate-500 to-slate-700",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M10 14h4" />
          <path d="M12 4v4" />
          <path d="M7 8h10" />
          <path d="M6 8v10h12V8" />
        </svg>
      ),
    },
  ];

  const engagementProcess = [
    { step: "1. Diagnose", description: "Review cashflow, compliance posture, and reporting gaps." },
    { step: "2. Plan", description: "Create a forecasting model and priority improvement roadmap." },
    { step: "3. Execute", description: "Implement controls, reporting cadence, and KPI tracking." },
  ];

  return (
    <main>
      <section className="bg-slate-950 py-16 text-white">
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr,0.9fr]">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Financial Consulting</h1>
              <p className="mt-3 text-slate-300">
                Data-driven planning that turns financial goals into growth.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a className="btn btn-primary" href="#consult-form">Request a consult</a>
                <a className="btn btn-outline" href="/contact">Contact us</a>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <img
                src={heroImage}
                alt="Financial consulting"
                className="h-auto w-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-slate-50 py-16">
        <div className="container-page">
          <div className="section-title section-title-left">
            <h2>Core financial services</h2>
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
            title="Talk to a financial consultant"
            description="Share your goals and timeline. We’ll suggest the right engagement model."
            submitLabel="Request a consult"
          />
        </div>
      </section>
    </main>
  );
}
