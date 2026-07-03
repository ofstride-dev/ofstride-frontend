import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ChatWidget } from "./ChatWidget";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <div className="border-b border-slate-200 bg-blue-50 text-slate-900">
        <div className="container-page flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm">AI-first consulting, agentic enablement, and growth services are available from any page.</p>
          <div className="flex flex-wrap gap-3">
            <a className="btn btn-primary btn-sm" href="/services">Explore services</a>
            <a className="btn btn-outline-white btn-sm" href="/contact">Book a call</a>
            <a className="btn btn-outline-white btn-sm" href="/it-consulting">AI enablement</a>
          </div>
        </div>
      </div>
      {children}
      <Footer />
      <ChatWidget />
    </div>
  );
}
