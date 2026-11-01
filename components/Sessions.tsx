"use client";

import { ExternalLink } from "lucide-react";
import type { SessionItem } from "../lib/content";
import { safeHref } from "../lib/safe-href";

export default function Sessions({ data }: { data: SessionItem[] }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <section id="sessions" className="container-wide mt-16 sm:mt-24 scroll-mt-20" aria-labelledby="sessions-heading">
      <div className="flex flex-col gap-2">
        <h2 id="sessions-heading" className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl text-fg">
          Sessions &amp; Workshops
        </h2>
      </div>

      <ul className="mt-6 divide-y divide-line border-y border-line">
        {data.map((item) => (
          <li key={item.id} className="py-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-semibold text-fg">
                  {item.title}
                </h3>
                {item.role && <span className="tag text-xs">{item.role}</span>}
              </div>
              {item.host && (
                <p className="text-sm text-muted">
                  {item.host}
                  {item.location && <span> · {item.location}</span>}
                </p>
              )}
              {item.description && (
                <p className="text-sm text-muted leading-relaxed whitespace-pre-line mt-1">
                  {item.description}
                </p>
              )}
              {item.url && (
                <a
                  href={safeHref(item.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-accent hover:underline font-medium pt-1"
                >
                  <span>Materials / Recording</span>
                  <ExternalLink className="size-3 opacity-60" />
                </a>
              )}
            </div>
            {item.date && (
              <span className="shrink-0 text-sm text-muted tabular-nums sm:text-right">
                {item.date}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
