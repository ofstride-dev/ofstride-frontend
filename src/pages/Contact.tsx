import { ConsultForm } from "../components/ConsultForm";

export function Contact() {
  return (
    <main>
      <section className="bg-slate-950 py-16 text-white">
        <div className="container-page">
          <h1 className="text-3xl font-bold gradient-text">Contact Us</h1>
          <p className="mt-3 text-slate-300">Let’s connect. Share a few details and our team will reach out.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="container-page max-w-3xl">
          <ConsultForm submitLabel="Book a 30‑min call" />
        </div>
      </section>
    </main>
  );
}
