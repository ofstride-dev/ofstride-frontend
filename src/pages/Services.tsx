import { ConsultForm } from "../components/ConsultForm";
import heroImage from "../assets/img/hero/hero-01.png";
import { ServicesSection } from "../sections/ServicesSection";

export function Services() {
  return (
    <main>
      <section className="bg-slate-950 py-16 text-white">
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr,0.9fr]">
            <div>
              <h1 className="text-3xl font-bold gradient-text">Services</h1>
              <p className="mt-3 text-slate-300">
                A unified consulting platform across HR, finance, legal, and IT.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a className="btn btn-primary" href="#consult-form">Request a consult</a>
                <a className="btn btn-outline" href="/contact">Contact us</a>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <img
                src={heroImage}
                alt="Ofstride consulting services"
                className="h-auto w-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>
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
