import { HeroSection } from "../sections/HeroSection";
import { ServicesSection } from "../sections/ServicesSection";
import { ProcessSection } from "../sections/ProcessSection";
import { CaseStudiesSection } from "../sections/CaseStudiesSection";
import { AnalyticsSection } from "../sections/AnalyticsSection";
import { ReachUsDirectlySection, StartConversationSection } from "../components/ContactHighlights";

export function Home() {
  return (
    <main>
      <HeroSection />
      <section className="bg-blue-50 py-16">
        <div className="container-page">
          <div className="section-title">
            <h2>Start with the outcome you need</h2>
            <p className="text-slate-600">Access consulting, AI advisory, and agentic business support from any page.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="card border border-slate-200 bg-white p-8 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-600">Consulting</p>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">Explore service tracks</h3>
              <p className="mt-3 text-sm text-slate-600">Find the right blend of HR, finance, legal, and IT advisory for your growth stage.</p>
              <a href="/services" className="mt-6 inline-flex rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-strong hover:bg-primary-700">View services</a>
            </div>
            <div className="card border border-slate-200 bg-white p-8 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-600">Discovery</p>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">Book a strategy call</h3>
              <p className="mt-3 text-sm text-slate-600">Jump straight to a tailored discussion around AI and agentic solutions for your business.</p>
              <a href="/contact" className="mt-6 inline-flex rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-strong hover:bg-primary-700">Talk to us</a>
            </div>
            <div className="card border border-slate-200 bg-white p-8 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-600">AI Enablement</p>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">Launch agentic workflows</h3>
              <p className="mt-3 text-sm text-slate-600">Get hands-on guidance for AI use cases that span HR, finance, legal, and IT operations.</p>
              <a href="/it-consulting" className="mt-6 inline-flex rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-strong hover:bg-primary-700">Explore AI</a>
            </div>
          </div>
        </div>
      </section>
      <StartConversationSection />
      <ReachUsDirectlySection />
      <ServicesSection />
      <section className="cta-diceus py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-100">Get Free Consultation</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Start with a focused discovery call.</h2>
            <p className="mt-4 text-sm text-white/80">
              Tell us about your goal and we’ll propose the right service track. We keep the first step simple, practical, and tailored to your stage.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="btn btn-primary" href="/contact">Request consultation</a>
              <a className="btn btn-outline" href="/services">Explore services</a>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="grid gap-3 text-sm text-white/80">
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary-100" />
                <p>30-minute consult with a domain expert.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary-100" />
                <p>Clear next steps, scope, and timeline options.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary-100" />
                <p>Optional follow-up plan with milestones.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AnalyticsSection />
      <ProcessSection />
      <CaseStudiesSection />
    </main>
  );
}
