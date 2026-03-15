import { ConsultForm } from "../components/ConsultForm";
import heroImage from "../assets/img/hero/hero-04.png";

export function LegalConsulting() {
  const coreServices = [
    {
      title: "Contract Review and Drafting",
      description: "Ensure clarity, fairness, and compliance across business agreements.",
      badgeClass: "from-emerald-500 to-teal-500",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M6 4h9l3 3v13H6z" />
          <path d="M9 12h6" />
          <path d="M9 16h6" />
        </svg>
      ),
    },
    {
      title: "Intellectual Property Rights",
      description: "Protect trademarks, patents, and innovations with structured IP guidance.",
      badgeClass: "from-blue-500 to-indigo-500",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 3v6" />
          <path d="M9 12h6" />
          <path d="M7 12a5 5 0 1 0 10 0" />
        </svg>
      ),
    },
    {
      title: "Regulatory Compliance",
      description: "Align policies and practices with evolving legal requirements.",
      badgeClass: "from-violet-500 to-purple-500",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      title: "Litigation Support",
      description: "Support dispute resolution and representation with expert guidance.",
      badgeClass: "from-amber-500 to-orange-500",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M6 7h12" />
          <path d="M8 7l-3 5h6l-3-5Z" />
          <path d="M16 7l-3 5h6l-3-5Z" />
        </svg>
      ),
    },
    {
      title: "Legal Risk Assessment / Due Diligence",
      description: "Comprehensive risk analysis to protect business interests and reduce surprises.",
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
      title: "Employee Welfare and Legal Support",
      description: "Guidance on employment laws, contracts, and dispute resolution for a healthy workplace.",
      badgeClass: "from-cyan-500 to-sky-500",
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
          <path d="M4 20a8 8 0 0 1 16 0" />
        </svg>
      ),
    },
  ];

  const engagementProcess = [
    { step: "1. Assess", description: "Review contracts, policies, and compliance exposure." },
    { step: "2. Advise", description: "Create playbooks, templates, and decision paths." },
    { step: "3. Support", description: "Guide execution with ongoing legal and regulatory support." },
  ];

  return (
    <main>
      <section className="bg-slate-950 py-16 text-white">
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr,0.9fr]">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Legal Consulting</h1>
              <p className="mt-3 text-slate-300">
                Confident legal guidance for MSMEs and high-growth startups.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a className="btn btn-primary" href="#consult-form">Request a consult</a>
                <a className="btn btn-outline" href="/contact">Contact us</a>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <img
                src={heroImage}
                alt="Legal consulting"
                className="h-auto w-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-slate-50 py-16">
        <div className="container-page">
          <div className="section-title section-title-left">
            <h2>Core legal services</h2>
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
            title="Talk to a legal consultant"
            description="Share your legal need and any deadlines. We’ll recommend the next steps."
            submitLabel="Request a consult"
          />
        </div>
      </section>
    </main>
  );
}
