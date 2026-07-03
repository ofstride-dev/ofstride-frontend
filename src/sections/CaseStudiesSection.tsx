import { siteContent } from "../data/siteContent";

export function CaseStudiesSection() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="container-page">
        <div className="section-title">
          <h2>How we structure an engagement</h2>
          <p className="text-slate-600">Illustrative models showing how we scope, deliver, and target outcomes.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {siteContent.caseStudies.map((study) => (
            <div key={study.title} className="card">
              <h3 className="text-lg font-semibold">{study.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{study.summary}</p>
              <p className="mt-4 text-sm font-semibold text-primary-500">{study.metric}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
