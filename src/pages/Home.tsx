import { HeroSection } from "../sections/HeroSection";
import { ServicesSection } from "../sections/ServicesSection";
import { ProcessSection } from "../sections/ProcessSection";
import { CaseStudiesSection } from "../sections/CaseStudiesSection";
import { AnalyticsSection } from "../sections/AnalyticsSection";

export function Home() {
  return (
    <main>
      <HeroSection />
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
