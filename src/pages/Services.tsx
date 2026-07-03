import { ConsultForm } from "../components/ConsultForm";
import { ServicesSection } from "../sections/ServicesSection";
import { SectionHero } from "../components/SectionHero";

export function Services() {
  return (
    <main>
      <SectionHero
        eyebrow="Services"
        title="Practical consulting built around your business priorities"
        description="Explore how we help leaders use AI-enabled strategy, process design, and domain expertise to improve HR, finance, legal, and IT outcomes."
        highlight="Start with a clear path, not a long sales cycle."
        size="sm"
        actions={[
          { label: "Request a consult", href: "#consult-form" },
          { label: "Contact us", href: "/contact", variant: "outline" },
        ]}
      />
      <ServicesSection />
      <section className="py-16" id="consult-form">
        <div className="container-page max-w-4xl">
          <ConsultForm
            title="Consult with Ofstride"
            description="Tell us about your goal and we’ll recommend the right service track."
            submitLabel="Request a consult"
          />
        </div>
      </section>
    </main>
  );
}
