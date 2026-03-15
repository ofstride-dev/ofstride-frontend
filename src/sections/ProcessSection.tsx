import { siteContent } from "../data/siteContent";

export function ProcessSection() {
  return (
    <section className="py-20">
      <div className="container-page">
        <div className="section-title">
          <h2>How we engage</h2>
          <p className="text-slate-600">A simple, reliable process focused on measurable outcomes.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {siteContent.process.map((step, index) => (
            <div key={step.title} className="card">
              <div className="text-4xl font-bold text-slate-100">{String(index + 1).padStart(2, "0")}</div>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
