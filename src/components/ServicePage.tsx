import type { ReactNode } from "react";

const badgeTones = ["bg-primary-500", "bg-accent-500", "bg-ink-700"];

export function ServiceHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="bg-ink-900 py-14 text-white">
      <div className="container-page">
        <div className="text-xs uppercase tracking-[0.3em] text-slate-400">{eyebrow}</div>
        <h1 className="mt-4 max-w-2xl text-3xl font-bold gradient-text">{title}</h1>
        <p className="mt-3 max-w-2xl text-slate-300">{description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a className="btn btn-primary" href="#consult-form">Book a consult</a>
          <a className="btn btn-outline" href="/contact">Contact us</a>
        </div>
      </div>
    </section>
  );
}

export function ServiceSection({
  title,
  subtitle,
  tint,
  children,
}: {
  title?: string;
  subtitle?: string;
  tint?: boolean;
  children: ReactNode;
}) {
  return (
    <section className={tint ? "bg-slate-50 py-14" : "py-14"}>
      <div className="container-page">
        {title && (
          <div className="section-title section-title-left">
            <h2>{title}</h2>
            {subtitle && <p className="text-slate-600">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function ServiceCapabilityGrid({
  items,
}: {
  items: { title: string; description: string }[];
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, i) => (
        <div key={item.title} className="card card-hover card-animated">
          <div className={`mb-4 h-10 w-10 rounded-xl ${badgeTones[i % badgeTones.length]}`} />
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="mt-2 text-sm text-slate-600">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export function ServiceProcess({
  steps,
}: {
  steps: { step: string; description: string }[];
}) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {steps.map((item) => (
        <div key={item.step} className="card card-hover">
          <h3 className="text-lg font-semibold">{item.step}</h3>
          <p className="mt-2 text-sm text-slate-600">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export function ServiceCta({ headline, subtext }: { headline: string; subtext: string }) {
  return (
    <div className="rounded-3xl bg-primary-50 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-slate-900">{headline}</p>
          <p className="text-sm text-slate-600">{subtext}</p>
        </div>
        <a className="btn btn-primary" href="#consult-form">Send request</a>
      </div>
    </div>
  );
}
