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
  return (
    <div className="card">
      <div className={compact ? "space-y-1" : "space-y-2"}>
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
      <form className="mt-6 grid gap-4">
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
          <button type="submit" className="btn btn-primary">
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
