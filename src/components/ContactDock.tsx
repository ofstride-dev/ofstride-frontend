import { siteContent } from "../data/siteContent";

export function ContactDock() {
  const waNumber = siteContent.brand.whatsapp.replace(/[^\d]/g, "");
  const waMessage = encodeURIComponent("Hi Ofstride, I'd like to talk about a consulting engagement.");

  return (
    <div className="fixed bottom-6 right-24 z-40 flex flex-col items-end gap-3">
      <a
        href={`https://wa.me/${waNumber}?text=${waMessage}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-500 text-white shadow-strong transition hover:-translate-y-0.5 hover:bg-accent-600"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.36a9.86 9.86 0 0 0 4.62 1.16h.01c5.46 0 9.9-4.45 9.9-9.9C21.95 6.45 17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.37-.5.07-1.12.1-1.8-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.17-4.94-4.37-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.13 1.02-2.42.27-.29.58-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.18-.31.4-.44.53-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.35 1.46.29.15.46.13.63-.08.17-.2.72-.84.91-1.13.19-.29.39-.24.65-.15.27.1 1.68.79 1.97.93.29.15.48.22.55.35.07.13.07.75-.17 1.43Z" />
        </svg>
      </a>
      <a
        href={`tel:${siteContent.brand.phoneIntl}`}
        aria-label="Call us"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white shadow-strong transition hover:-translate-y-0.5 hover:bg-primary-600"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 5a2 2 0 0 1 2-2h2.28a1 1 0 0 1 .98.8l.9 4.2a1 1 0 0 1-.5 1.08l-2 1.1a11.5 11.5 0 0 0 5.1 5.1l1.1-2a1 1 0 0 1 1.08-.5l4.2.9a1 1 0 0 1 .8.98V19a2 2 0 0 1-2 2h-1C9.72 21 3 14.28 3 6V5Z"
          />
        </svg>
      </a>
    </div>
  );
}
