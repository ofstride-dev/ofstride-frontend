import { siteContent } from "../data/siteContent";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }} />
      <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute right-10 bottom-16 h-80 w-80 rounded-full bg-teal-400/20 blur-3xl" />

      <div className="container-page relative z-10 py-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold">
          {siteContent.hero.badge}
        </div>
        <h1 className="hero-title mt-6 text-4xl font-bold leading-tight text-white md:text-6xl">
          {siteContent.hero.headline.split("towards success.")[0]}
          <span className="gradient-text">towards success.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
          {siteContent.hero.subtext}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a className="btn btn-primary" href={siteContent.hero.ctas[0].href}>
            {siteContent.hero.ctas[0].label}
          </a>
          <a className="btn btn-outline" href={siteContent.hero.ctas[1].href}>
            {siteContent.hero.ctas[1].label}
          </a>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
          {siteContent.hero.trust.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
