import type { ReactNode } from "react";

type HeroAction = {
  label: string;
  href: string;
  variant?: "primary" | "outline";
};

type SectionHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actions: HeroAction[];
  highlight?: string;
  extra?: ReactNode;
  size?: "sm" | "md" | "lg";
};

const heroSizeClasses: Record<NonNullable<SectionHeroProps["size"]>, string> = {
  sm: "py-10 md:py-12",
  md: "py-14 md:py-16",
  lg: "py-16 md:py-20",
};

export function SectionHero({ eyebrow, title, description, actions, highlight, extra, size = "sm" }: SectionHeroProps) {
  return (
    <section className={`bg-gradient-to-r from-primary-700 via-blue-600 to-sky-600 text-white ${heroSizeClasses[size]}`}>
      <div className="container-page">
        <div className="max-w-3xl">
          {eyebrow ? <p className="text-xs uppercase tracking-[0.3em] text-sky-100">{eyebrow}</p> : null}
          <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
          <p className="mt-5 text-base leading-8 text-slate-100 sm:text-lg">{description}</p>
          {highlight ? <p className="mt-6 rounded-3xl border border-white/15 bg-white/10 px-5 py-4 text-sm text-white/90 shadow-soft">{highlight}</p> : null}
          <div className="mt-8 flex flex-wrap gap-3">
            {actions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className={
                  action.variant === "outline"
                    ? "inline-flex rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                    : "inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary-700 transition hover:bg-slate-100"
                }
              >
                {action.label}
              </a>
            ))}
          </div>
          {extra ? <div className="mt-8">{extra}</div> : null}
        </div>
      </div>
    </section>
  );
}
