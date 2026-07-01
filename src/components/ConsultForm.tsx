import { useState } from "react";

type ConsultFormProps = {
  title?: string;
  description?: string;
  submitLabel?: string;
  compact?: boolean;
};

const web3formsKey = import.meta.env.VITE_WEB3FORMS_KEY || "";

export function ConsultForm({
  title = "Consult with an Ofstride expert",
  description = "Share a few details and our team will follow up within one business day.",
  submitLabel = "Request a consult",
  compact = false,
}: ConsultFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (!web3formsKey) {
      setStatus("error");
      setMessage("Missing Web3Forms API key. Please set VITE_WEB3FORMS_KEY.");
      return;
    }

    setStatus("sending");
    setMessage("");

    data.append("access_key", web3formsKey);
    data.append("subject", "Ofstride contact form submission");
    data.append("redirect", "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        setMessage("Thank you! Your request has been submitted. We will be in touch soon.");
        form.reset();
      } else {
        throw new Error(result.message || "Unable to submit form.");
      }
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while submitting the form."
      );
    }
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
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">We typically respond within 24 hours.</p>
          <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : submitLabel}
          </button>
        </div>
      </form>
      {message ? (
        <div className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${status === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"}`}>
          {message}
        </div>
      ) : null}
    </div>
  );
}
