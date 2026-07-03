import { ConsultForm } from "../components/ConsultForm";
import { ReachUsDirectlySection } from "../components/ContactHighlights";
import { SectionHero } from "../components/SectionHero";

export function Contact() {
  return (
    <main>
      <SectionHero
        eyebrow="Contact"
        title="Connect with the team that can support your next growth step"
        description="Share your challenge, and we’ll help you identify the right consulting path, advisory support, or AI-enabled solution."
        highlight="We respond quickly and help you map practical next actions."
        size="sm"
        actions={[
          { label: "Book a call", href: "#contact-form" },
          { label: "Email us", href: "mailto:support@ofstrideservices.com", variant: "outline" },
        ]}
      />
      <ReachUsDirectlySection />
      <section className="py-16" id="contact-form">
        <div className="container-page max-w-3xl">
          <ConsultForm submitLabel="Book a 30‑min call" />
        </div>
      </section>
    </main>
  );
}
