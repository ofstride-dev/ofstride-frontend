import { useState } from "react";
import { ConsultForm } from "../components/ConsultForm";
import heroImage from "../assets/img/hero/hero-07.png";

export function ITConsulting() {
  const [openGroup, setOpenGroup] = useState("IT services");

  const sidebarGroups = [
    {
      label: "AI and data strategy",
      items: ["AI opportunity mapping", "Data readiness", "ROI prioritization"],
    },
    {
      label: "Generative AI",
      items: ["GenAI pilots", "LLM evaluation", "Prompt engineering"],
    },
    {
      label: "Data platforms",
      items: ["Modern data stack", "Data governance", "Analytics enablement"],
    },
    {
      label: "Cloud modernization",
      items: ["Cloud migration", "Platform security", "Cost optimization"],
    },
    {
      label: "Responsible AI",
      items: ["Ethics & governance", "Model risk", "Compliance readiness"],
    },
    {
      label: "Automation and MLOps",
      items: ["Pipeline automation", "Model monitoring", "Reliability engineering"],
    },
    {
      label: "IT staff augmentation",
      items: ["Dedicated squads", "Skill-based staffing", "Team extensions"],
    },
    {
      label: "IT outsourcing",
      items: ["Managed delivery", "Governance & SLAs", "Cost optimization"],
    },
  ];

  const serviceCards = [
    {
      title: "Cloud Solutions",
      description: "Secure cloud foundations, migration planning, and modernization roadmaps.",
      items: ["Cloud readiness", "Landing zones", "Cost optimization"],
      badgeClass: "from-indigo-500 to-violet-500",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M7 18h9a4 4 0 0 0 0-8 5 5 0 0 0-9-2" />
          <path d="M7 18a4 4 0 1 1 0-8" />
        </svg>
      ),
    },
    {
      title: "Data Warehouse Solutions",
      description: "Centralize data with governance, quality, and performance in mind.",
      items: ["Data modeling", "ETL pipelines", "BI readiness"],
      badgeClass: "from-sky-500 to-blue-500",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 7c0-2 3-4 8-4s8 2 8 4-3 4-8 4-8-2-8-4Z" />
          <path d="M4 7v10c0 2 3 4 8 4s8-2 8-4V7" />
        </svg>
      ),
    },
    {
      title: "Data Science",
      description: "Turn data into insights with forecasting and decision models.",
      items: ["Exploratory analysis", "Predictive models", "Dashboard insights"],
      badgeClass: "from-rose-500 to-pink-500",
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
      title: "AI Consulting",
      description: "Identify practical AI opportunities and safe deployment paths.",
      items: ["Use-case discovery", "Governance & risk", "Pilot planning"],
      badgeClass: "from-emerald-500 to-teal-500",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="6" y="4" width="12" height="12" rx="3" />
          <path d="M9 20h6" />
          <path d="M12 16v4" />
        </svg>
      ),
    },
    {
      title: "Machine Learning",
      description: "Model development and MLOps foundations for reliable deployment.",
      items: ["Model selection", "Training pipelines", "Monitoring"],
      badgeClass: "from-cyan-500 to-sky-500",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 12h6" />
          <path d="M14 6h6" />
          <path d="M14 18h6" />
          <circle cx="10" cy="12" r="2" />
        </svg>
      ),
    },
    {
      title: "App Modernization",
      description: "Move from monoliths to microservices with minimal disruption.",
      items: ["Assessment", "Service decomposition", "Incremental migration"],
      badgeClass: "from-amber-500 to-orange-500",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="4" y="4" width="7" height="7" rx="2" />
          <rect x="13" y="4" width="7" height="7" rx="2" />
          <rect x="4" y="13" width="7" height="7" rx="2" />
          <rect x="13" y="13" width="7" height="7" rx="2" />
        </svg>
      ),
    },
  ];

  const engagementProcess = [
    { step: "1. Assess", description: "Review data stack, app architecture, and cloud readiness." },
    { step: "2. Design", description: "Define target architecture, migration path, and milestones." },
    { step: "3. Deliver", description: "Ship in increments with governance and handover." },
  ];

  return (
    <main>
      <section className="bg-slate-950 py-16 text-white">
        <div className="container-page">
          <div className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Services · AI and Technology
          </div>
          <div className="mt-5">
            <div>
              <h1 className="text-3xl font-bold gradient-text">AI and Technology</h1>
              <p className="mt-3 text-slate-300">
                Explore AI’s impact on industries, trends, and challenges. Get insights on data science, generative AI,
                and ethical considerations to stay ahead with Offstride’s expertise.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a className="btn btn-primary" href="#consult-form">Get in touch</a>
                <a className="btn btn-outline" href="/contact">Contact us</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[260px,1fr]">
          <aside>
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Services</p>
              <div className="mt-4 space-y-3">
                {sidebarGroups.map((group) => {
                  const isOpen = openGroup === group.label;
                  return (
                    <div key={group.label} className="rounded-2xl border border-slate-100 bg-slate-50">
                      <button
                        type="button"
                        onClick={() => setOpenGroup(isOpen ? "" : group.label)}
                        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-slate-800"
                      >
                        {group.label}
                        <span className="text-slate-400">{isOpen ? "–" : "+"}</span>
                      </button>
                      {isOpen && (
                        <ul className="space-y-2 px-4 pb-4 text-xs text-slate-600">
                          {group.items.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-500" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>

          <div className="space-y-12">
            <section className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
                <img src={heroImage} alt="IT advisory" className="h-auto w-full rounded-2xl" />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">What we offer</h2>
                <p className="text-slate-600">
                  Offstride delivers practical AI and technology guidance for growing organizations. We help you
                  prioritize high‑value AI use cases, modernize data foundations, and adopt cloud architectures that
                  support secure, scalable innovation.
                </p>
                <p className="text-slate-600">
                  Our advisory focuses on data science, generative AI, responsible AI, and modernization so you can
                  move from experimentation to production with confidence.
                </p>
              </div>
            </section>

            <section className="grid gap-6 md:grid-cols-2">
              {[
                {
                  title: "AI and data strategy",
                  description:
                    "Identify the highest-impact AI bets, align them to business outcomes, and build a data roadmap. We map quick wins and longer-term plays so you can invest with clarity. Expect measurable ROI, not hype.",
                },
                {
                  title: "Generative AI",
                  description:
                    "Launch safe GenAI pilots with the right model selection, guardrails, and evaluation workflows. We validate use cases, protect sensitive data, and scale only what proves value. This keeps experimentation controlled and results‑driven.",
                },
                {
                  title: "Data platforms",
                  description:
                    "Design modern data stacks with governance, lineage, and analytics‑ready pipelines. We help you unify data sources and make insights available faster. Strong foundations mean reliable AI outputs and trustworthy dashboards.",
                },
                {
                  title: "Cloud modernization",
                  description:
                    "Migrate and modernize infrastructure for performance, security, and sustainable cloud spend. We prioritize workloads, reduce complexity, and build resilient architectures. The result is lower risk and better uptime.",
                },
                {
                  title: "Responsible AI",
                  description:
                    "Define ethical, compliant, and explainable AI frameworks to reduce model risk. We embed governance, bias checks, and human oversight into delivery. This helps teams deploy AI with confidence and accountability.",
                },
                {
                  title: "Automation and MLOps",
                  description:
                    "Operationalize AI with CI/CD, monitoring, and reliability engineering for production‑ready systems. We reduce model drift and automate retraining where it makes sense. Your AI stays stable and auditable in production.",
                },
                {
                  title: "IT staff augmentation",
                  description:
                    "Scale delivery with vetted engineers and data specialists who integrate seamlessly with your team. We fill skill gaps quickly without long hiring cycles. You stay in control while accelerating delivery.",
                },
                {
                  title: "IT outsourcing",
                  description:
                    "Offload delivery with clear governance, predictable SLAs, and outcome‑based reporting. We take ownership of execution while keeping you informed through transparent reporting. This frees your team to focus on strategy.",
                },
              ].map((item) => (
                <div key={item.title} className="card card-hover">
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                </div>
              ))}
            </section>

            <section>
              <div className="section-title section-title-left">
                <h2>AI and technology capabilities</h2>
                <p className="text-slate-600">Focused services across data, AI, cloud, and modernization.</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {serviceCards.map((card) => (
                  <div key={card.title} className="card card-hover card-animated">
                    <div
                      className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.badgeClass} shadow-strong`}
                    >
                      {card.icon}
                    </div>
                    <h3 className="text-lg font-semibold">{card.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{card.description}</p>
                    <ul className="mt-4 space-y-2 text-sm text-slate-500">
                      {card.items.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
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
            </section>

            <section className="rounded-3xl bg-slate-50 p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-lg font-semibold text-slate-900">Get a free IT strategy session</p>
                  <p className="text-sm text-slate-600">
                    Share your roadmap goals and we’ll propose a pragmatic modernization path.
                  </p>
                </div>
                <a className="btn btn-primary" href="#consult-form">Send request</a>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="py-16" id="consult-form">
        <div className="container-page max-w-4xl">
          <ConsultForm
            title="Talk to our IT consulting team"
            description="Share your current stack and the outcomes you want. We’ll suggest the right next step."
            submitLabel="Request a consult"
          />
        </div>
      </section>
    </main>
  );
}
