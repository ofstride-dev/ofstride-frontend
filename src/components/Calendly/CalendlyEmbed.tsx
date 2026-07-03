// src/components/Calendly/CalendlyEmbed.tsx
import { useRef, useState, useEffect } from 'react';

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, string>;
        utm?: Record<string, string>;
      }) => void;
    };
  }
}

interface CalendlyEmbedProps {
  url: string;
  height?: number;
  prefill?: Record<string, string>;
}

export function CalendlyEmbed({ url, height = 700, prefill = {} }: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let retryCount = 0;
    const maxRetries = 30;

    const initWidget = () => {
      if (window.Calendly && containerRef.current) {
        try {
          window.Calendly.initInlineWidget({
            url,
            parentElement: containerRef.current,
            prefill,
            utm: {},
          });
          setLoaded(true);
        } catch {
          setError('Failed to initialize calendar widget');
        }
      } else if (retryCount < maxRetries) {
        retryCount++;
        timeoutId = setTimeout(initWidget, 200);
      } else {
        setError('Calendar widget failed to load. Please refresh or contact us directly.');
      }
    };

    initWidget();
    return () => clearTimeout(timeoutId);
  }, [url, prefill]);

  return (
    <div
      ref={containerRef}
      style={{ minWidth: '320px', height: `${height}px` }}
      aria-label={loaded ? 'Booking calendar' : 'Loading booking calendar'}
      role="region"
      className="rounded-2xl border border-white/5 bg-slate-950/40 backdrop-blur-xl overflow-hidden shadow-2xl transition-all duration-300 filter invert-[0.03] hue-rotate-180"
    >
      {!loaded && !error && (
        <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-500">
          <div className="h-6 w-6 border-2 border-slate-700 border-t-[#5D7CC1] rounded-full animate-spin" />
          <p className="text-xs uppercase tracking-widest font-semibold">Loading Interface...</p>
        </div>
      )}
      {error && (
        <div className="flex flex-col items-center justify-center h-full gap-3 p-6 text-center">
          <p className="text-red-400 text-xs font-medium">{error}</p>
        </div>
      )}
    </div>
  );
}
