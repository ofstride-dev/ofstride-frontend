import { useState } from "react";
import { DATA_ENDPOINTS, logApiCall } from "../config/api";

type ConsultFormProps = {
  title?: string;
  description?: string;
  submitLabel?: string;
  compact?: boolean;
};

export function ConsultForm({
  title = "Consult with an Ofstride expert",
  description = "Share a few details and our team will follow up within one business day.",
  submitLabel = "Request a consult",
  compact = false,
}: ConsultFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const endpoint = DATA_ENDPOINTS.leads();
      logApiCall(endpoint, "POST");
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Failed to submit");
      setStatus("success");
      event.currentTarget.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="card text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-500/15 text-accent-600">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-4 text-xl font-semibold text-slate-900">Thanks — we've got it.</h3>
        <p className="mt-2 text-sm text-slate-600">
          Someone from our team will follow up within one business day. In the meantime, feel free to book a slot
          directly on our calendar.
        </p>
        <button type="button" className="btn btn-primary mt-5" onClick={() => setStatus("idle")}>
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <div className={compact ? "space-y-1" : "space-y-2"}>
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
      <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <input className="input" name="fullName" placeholder="Full name" required />
          <input className="input" name="workEmail" placeholder="Work email" type="email" required />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <input className="input" name="company" placeholder="Company" required />
          <input className="input" name="location" placeholder="Location" />
        </div>
        <textarea
          className="input min-h-[120px]"
          name="needs"
          placeholder="Tell us about your requirement"
          required
        />
        {status === "error" && (
          <p className="text-xs font-medium text-red-600">
            Something went wrong sending that — please try again, or reach us directly on WhatsApp / phone below.
          </p>
        )}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">We typically respond within 24 hours.</p>
          <button type="submit" className="btn btn-primary" disabled={status === "loading"}>
            {status === "loading" ? "Sending…" : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
