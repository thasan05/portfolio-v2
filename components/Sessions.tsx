"use client";

import { ExternalLink } from "lucide-react";
import type { SessionItem } from "../lib/content";
import { safeHref } from "../lib/safe-href";

export default function Sessions({ data }: { data: SessionItem[] }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <section id="sessions" className="container-wide mt-20 sm:mt-28 scroll-mt-20" aria-labelledby="sessions-heading">
      <div className="flex flex-col gap-2">
        <h2 id="sessions-heading" className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-fg">
          Sessions &amp; Workshops
        </h2>
        <p className="text-muted text-[15px] sm:text-base max-w-2xl leading-relaxed">
          Technical workshops, community presentations, and peer-to-peer computing sessions.
        </p>
      </div>

      <ul className="mt-7 divide-y divide-line/70 border-y border-line/70">
        {data.map((item) => (
          <li key={item.id} className="py-5 flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-sans text-base sm:text-lg font-semibold tracking-tight text-fg">
                  {item.title}
                </h3>
                {item.role && <span className="tag text-xs font-medium">{item.role}</span>}
              </div>
              {item.host && (
                <p className="text-[14px] text-muted font-medium">
                  {item.host}
                  {item.location && <span> · {item.location}</span>}
                </p>
              )}
              {item.description && (
                <p className="text-[14px] text-muted leading-relaxed whitespace-pre-line mt-1 font-normal">
                  {item.description}
                </p>
              )}
              {item.url && (
                <a
                  href={safeHref(item.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline font-medium pt-1.5"
                >
                  <span>Materials / Recording</span>
                  <ExternalLink className="size-3 opacity-60" />
                </a>
              )}
            </div>
            {item.date && (
              <span className="shrink-0 text-xs sm:text-sm text-muted tabular-nums sm:text-right font-medium">
                {item.date}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
