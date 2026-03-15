import { useEffect, useMemo, useState } from "react";

const leadApiBase = import.meta.env.VITE_LEAD_API || "";

type OverviewData = {
  totalLeads: number;
  totalMatches: number;
  matchRate: number;
  leadsOverTime: { date: string; count: number }[];
  leadsByDomain: Record<string, number>;
  topLocations: { location: string; count: number }[];
};

type AgentResponse = {
  text: string;
  tools_used?: string[];
  data?: OverviewData;
};

const defaultQuestion = "Summarize lead activity and match rate.";

export function AnalyticsSection() {
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [agentText, setAgentText] = useState<string>("");
  const [question, setQuestion] = useState(defaultQuestion);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const domainEntries = useMemo(() => {
    if (!overview?.leadsByDomain) return [];
    return Object.entries(overview.leadsByDomain).sort((a, b) => b[1] - a[1]);
  }, [overview]);

  const fetchOverview = async () => {
    const response = await fetch(`${leadApiBase}/api/charts/overview`);
    if (!response.ok) {
      throw new Error("Failed to load chart data");
    }
    const data = (await response.json()) as OverviewData;
    setOverview(data);
    return data;
  };

  const fetchAgent = async (prompt: string) => {
    const response = await fetch(`${leadApiBase}/api/charts/agent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: prompt }),
    });

    if (!response.ok) {
      throw new Error("Chart agent failed");
    }

    const data = (await response.json()) as AgentResponse;
    setAgentText(data.text || "");
    if (data.data && !overview) {
      setOverview(data.data);
    }
  };

  const loadData = async (prompt = defaultQuestion) => {
    setIsLoading(true);
    setError("");
    try {
      // Keep overview as standby dataset; agent provides narrative on top.
      const data = await fetchOverview();
      await fetchAgent(prompt);
      return data;
    } catch (err) {
      console.error(err);
      setError("Unable to load analytics right now.");
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAsk = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!question.trim() || isLoading) return;
    await loadData(question.trim());
  };

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-600">
            AI Analytics
          </p>
          <h2 className="text-3xl font-semibold text-slate-900">
            Live lead intelligence
          </h2>
          <p className="max-w-2xl text-sm text-slate-600">
            The chart agent summarizes lead performance and surfaces trends from your CSV data.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleAsk}>
              <input
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                placeholder="Ask the chart agent"
              />
              <button
                type="submit"
                className="btn btn-primary px-5"
                disabled={isLoading}
              >
                {isLoading ? "Thinking…" : "Ask"}
              </button>
            </form>

            <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
              {error ? error : agentText || "Loading agent response…"}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Total leads</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{overview?.totalLeads ?? "—"}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Match rate</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">
                {overview ? `${overview.matchRate}%` : "—"}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {overview ? `${overview.totalMatches} consultant notifications` : ""}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold text-slate-800">Leads by domain</p>
            <div className="mt-4 space-y-3">
              {domainEntries.length === 0 && (
                <p className="text-xs text-slate-500">No data yet.</p>
              )}
              {domainEntries.map(([domain, count]) => (
                <div key={domain} className="flex items-center justify-between text-sm text-slate-600">
                  <span className="capitalize">{domain}</span>
                  <span className="font-semibold text-slate-800">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold text-slate-800">Top locations</p>
            <div className="mt-4 space-y-3">
              {overview?.topLocations?.length ? (
                overview.topLocations.map((item) => (
                  <div key={item.location} className="flex items-center justify-between text-sm text-slate-600">
                    <span>{item.location}</span>
                    <span className="font-semibold text-slate-800">{item.count}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500">No data yet.</p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold text-slate-800">Leads over time</p>
            <div className="mt-4 space-y-3">
              {overview?.leadsOverTime?.length ? (
                overview.leadsOverTime.map((item) => (
                  <div key={item.date} className="flex items-center justify-between text-sm text-slate-600">
                    <span>{item.date}</span>
                    <span className="font-semibold text-slate-800">{item.count}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500">No data yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
