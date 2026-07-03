import { ConsultForm } from "../components/ConsultForm";
import { Seo } from "../components/Seo";
import { ServiceHero, ServiceSection, ServiceCapabilityGrid, ServiceProcess, ServiceCta } from "../components/ServicePage";

const capabilities = [
  {
    title: "AI and data strategy",
    description:
      "Identify the highest-impact AI bets, align them to business outcomes, and build a data roadmap. Expect measurable ROI, not hype.",
  },
  {
    title: "Generative AI",
    description:
      "Launch safe GenAI pilots with the right model selection, guardrails, and evaluation workflows — controlled experimentation, results-driven scale-up.",
  },
  {
    title: "Data platforms",
    description:
      "Design modern data stacks with governance, lineage, and analytics-ready pipelines for reliable AI outputs and trustworthy dashboards.",
  },
  {
    title: "Cloud modernization",
    description:
      "Migrate and modernize infrastructure for performance, security, and sustainable spend — lower risk, better uptime.",
  },
  {
    title: "Responsible AI",
    description:
      "Define ethical, compliant, and explainable AI frameworks — governance, bias checks, and human oversight built into delivery.",
  },
  {
    title: "Automation and MLOps",
    description:
      "Operationalize AI with CI/CD, monitoring, and reliability engineering so your models stay stable and auditable in production.",
  },
  {
    title: "IT staff augmentation",
    description:
      "Scale delivery with vetted engineers and data specialists who integrate with your team — no long hiring cycles.",
  },
  {
    title: "IT outsourcing",
    description:
      "Offload delivery with clear governance, predictable SLAs, and outcome-based reporting, so your team can focus on strategy.",
  },
];

const engagementProcess = [
  { step: "1. Assess", description: "Review data stack, app architecture, and cloud readiness." },
  { step: "2. Design", description: "Define target architecture, migration path, and milestones." },
  { step: "3. Deliver", description: "Ship in increments with governance and handover." },
];

export function ITConsulting() {
  return (
    <main>
      <Seo
        title="IT & AI Consulting"
        description="Practical AI and technology consulting — data strategy, generative AI, cloud modernization, and MLOps for growing businesses."
      />
      <ServiceHero
        eyebrow="Services · IT & AI Consulting"
        title="AI and technology, implemented — not just advised on"
        description="We help growing organizations prioritize high-value AI use cases, modernize data foundations, and adopt cloud architectures built for secure, scalable innovation."
      />

      <ServiceSection title="What we cover" subtitle="Eight focused capabilities across data, AI, cloud, and modernization.">
        <ServiceCapabilityGrid items={capabilities} />
      </ServiceSection>

      <ServiceSection title="How we engage" tint>
        <ServiceProcess steps={engagementProcess} />
      </ServiceSection>

      <ServiceSection>
        <ServiceCta
          headline="Get a free IT strategy session"
          subtext="Share your roadmap goals and we'll propose a pragmatic modernization path."
        />
      </ServiceSection>

      <ServiceSection tint>
        <div className="mx-auto max-w-4xl" id="consult-form">
          <ConsultForm
            title="Talk to our IT consulting team"
            description="Share your current stack and the outcomes you want. We'll suggest the right next step."
            submitLabel="Request a consult"
          />
        </div>
      </ServiceSection>
    </main>
  );
}
