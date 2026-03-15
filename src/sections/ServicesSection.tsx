import React from "react";
import { siteContent } from "../data/siteContent";

const serviceIcons: Record<string, React.JSX.Element> = {
  hr: (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
      <path d="M4 20a8 8 0 0 1 16 0" />
    </svg>
  ),
  finance: (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 19h16" />
      <path d="M7 15V9" />
      <path d="M12 15V5" />
      <path d="M17 15v-7" />
    </svg>
  ),
  legal: (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3v18" />
      <path d="M6 7h12" />
      <path d="M8 7l-3 5h6l-3-5Z" />
      <path d="M16 7l-3 5h6l-3-5Z" />
    </svg>
  ),
  it: (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="4" y="6" width="16" height="10" rx="2" />
      <path d="M9 20h6" />
      <path d="M12 16v4" />
    </svg>
  ),
};

const serviceBadgeClasses: Record<string, string> = {
  hr: "from-emerald-500 to-teal-500",
  finance: "from-amber-500 to-orange-500",
  legal: "from-indigo-500 to-violet-500",
  it: "from-sky-500 to-blue-500",
};

export function ServicesSection() {
  return (
    <section className="section-gradient py-20">
      <div className="container-page">
        <div className="section-title">
          <h2>Our expertise by discipline</h2>
          <p className="text-slate-600">Service categories aligned to the specialized teams we deliver.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {siteContent.services.map((service) => (
            <div key={service.key} className="card border-slate-200/80 bg-white/90 backdrop-blur hover:-translate-y-1 transition">
              <div
                className={`icon-badge bg-gradient-to-br ${serviceBadgeClasses[service.key] ?? "from-primary-500 to-primary-600"} shadow-strong`}
              >
                {serviceIcons[service.key] ?? service.shortLabel}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{service.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-500">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <a className="mt-4 inline-flex text-sm font-semibold text-primary-500" href={service.href}>
                Explore {service.title.split(" ")[0]} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
