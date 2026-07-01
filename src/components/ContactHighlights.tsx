import type { ReactNode } from "react";
import { siteContent } from "../data/siteContent";

const calendlyUrl = import.meta.env.VITE_CALENDLY_URL || "https://calendly.com";

function normalizePhone(phone: string) {
  return phone.replace(/[^+0-9]/g, "");
}

function actionCard({ title, subtitle, href, children }: { title: string; subtitle: string; href: string; children: ReactNode; }) {
  return (
    <a
      className="group block rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-white/20"
      href={href}
      target={href.startsWith("mailto:") || href.startsWith("tel:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") || href.startsWith("tel:") ? undefined : "noopener noreferrer"}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-primary-200">{title}</p>
          <p className="mt-3 text-lg font-semibold text-white">{subtitle}</p>
        </div>
        <div className="rounded-2xl bg-slate-900 px-3 py-2 text-xs text-slate-200">Go</div>
      </div>
      <div className="mt-4 text-sm leading-relaxed text-slate-300">{children}</div>
    </a>
  );
}

export function StartConversationSection() {
  return (
    <section className="bg-slate-950 py-16 text-white">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-100">Start a Conversation</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Let’s talk about your next growth milestone.</h2>
            <p className="mt-5 max-w-2xl text-sm text-slate-300">
              Share your priorities and we’ll help you book the right path forward. Whether you want a quick strategy call, a deep discovery session, or a direct introduction to our consultants, we’ve got the right channel ready.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-primary-200">Fast response</p>
                <p className="mt-3 text-lg font-semibold text-white">Get a reply within one business day.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-primary-200">No packages</p>
                <p className="mt-3 text-lg font-semibold text-white">We recommend the right service, not the most expensive one.</p>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <h3 className="text-xl font-semibold text-white">Ready to start?</h3>
            <p className="mt-3 text-sm text-slate-300">Choose the easiest way to reach us, and we’ll connect you with the right expert.</p>
            <div className="mt-6 space-y-4">
              {actionCard({
                title: "Email",
                subtitle: siteContent.brand.email,
                href: `mailto:${siteContent.brand.email}`,
                children: "Send a note and we’ll follow up with availability, pricing, and next steps.",
              })}
              {actionCard({
                title: "Schedule a call",
                subtitle: "Book a time on Calendly",
                href: calendlyUrl,
                children: "Pick a slot that works for you and get on a discovery call with our team.",
              })}
              {actionCard({
                title: "Mobile",
                subtitle: siteContent.brand.phone,
                href: `tel:${normalizePhone(siteContent.brand.phone)}`,
                children: "Speak with our team directly if you want an immediate response.",
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ReachUsDirectlySection() {
  return (
    <section className="py-16">
      <div className="container-page">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-500">Reach Us Directly</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-950 sm:text-4xl">Connect with our team in the way that suits you best.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-600">
            Whether you want a quick email, a direct phone call, or to schedule a conversation on Calendly, we make it simple to get the right support.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {actionCard({
            title: "Email",
            subtitle: siteContent.brand.email,
            href: `mailto:${siteContent.brand.email}`,
            children: "Email our consulting team with your business challenge and we’ll respond within one business day.",
          })}
          {actionCard({
            title: "Calendar",
            subtitle: "Schedule a call",
            href: calendlyUrl,
            children: "Choose a convenient time for a 30-minute discovery call with one of our consultants.",
          })}
          {actionCard({
            title: "Phone",
            subtitle: siteContent.brand.phone,
            href: `tel:${normalizePhone(siteContent.brand.phone)}`,
            children: "Call us directly for immediate support and account guidance.",
          })}
        </div>
      </div>
    </section>
  );
}
