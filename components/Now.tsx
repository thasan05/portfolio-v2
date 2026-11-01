"use client";

import type { NowData } from "../lib/content";

export default function Now({ data }: { data: NowData }) {
  if (!data || !data.enabled || !Array.isArray(data.items) || data.items.length === 0) {
    return null;
  }

  return (
    <section id="now" className="container-wide mt-12 sm:mt-16" aria-labelledby="now-heading">
      <div className="flex items-baseline justify-between border-b border-line pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          <h2 id="now-heading" className="eyebrow">
            Now
          </h2>
        </div>
        {data.updated && (
          <p className="text-xs text-muted tabular-nums">
            Updated {data.updated}
          </p>
        )}
      </div>

      <div className="card mt-4">
        <ul className="divide-y divide-line/60">
          {data.items.map((item, i) => (
            <li key={i} className="py-2.5 first:pt-0 last:pb-0 text-[15px] text-muted flex items-start gap-2.5">
              <span className="text-accent mt-1 text-xs shrink-0">✦</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
