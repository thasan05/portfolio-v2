"use client";

import { ExternalLink, FileText } from "lucide-react";
import type { PublicationsData } from "../lib/content";
import { safeHref } from "../lib/safe-href";

export default function Publications({ data }: { data: PublicationsData }) {
  const hasConferences = Array.isArray(data?.conferences) && data.conferences.length > 0;
  const hasJournals = Array.isArray(data?.journals) && data.journals.length > 0;

  if (!hasConferences && !hasJournals) return null;

  return (
    <section id="research" className="container-wide mt-16 sm:mt-24 scroll-mt-20" aria-labelledby="research-heading">
      <div className="flex flex-col gap-2">
        <h2 id="research-heading" className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl text-fg">
          Academic Research &amp; Publications
        </h2>
        <p className="text-muted text-[15px] max-w-2xl">
          Peer-reviewed conference proceedings and research investigations in applied computing.
        </p>
      </div>

      {hasConferences && (
        <div className="mt-8">
          <h3 className="font-serif text-lg font-semibold text-fg mb-3">
            Conference Proceedings
          </h3>
          <ul className="divide-y divide-line border-y border-line">
            {data.conferences.map((item) => (
              <li key={item.id} className="py-4 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <div className="space-y-1.5 flex-1">
                  <h4 className="font-serif text-lg font-semibold text-fg leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[15px] text-muted">
                    {item.venue}
                    {item.location && <span> · {item.location}</span>}
                  </p>
                  {(item.doi || item.paperUrl) && (
                    <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                      {item.paperUrl && (
                        <a
                          href={safeHref(item.paperUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-accent hover:underline font-medium"
                        >
                          <FileText className="size-3.5" />
                          <span>Read Paper</span>
                          <ExternalLink className="size-3 opacity-70" />
                        </a>
                      )}
                      {item.doi && (
                        <span className="font-mono text-xs text-muted">
                          DOI: {item.doi}
                        </span>
                      )}
                    </div>
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
        </div>
      )}

      {hasJournals && (
        <div className="mt-10">
          <h3 className="font-serif text-lg font-semibold text-fg mb-3">
            Journal Articles
          </h3>
          <ul className="divide-y divide-line border-y border-line">
            {data.journals.map((item) => (
              <li key={item.id} className="py-4 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <div className="space-y-1.5 flex-1">
                  <h4 className="font-serif text-lg font-semibold text-fg leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[15px] text-muted">
                    {item.journal}
                  </p>
                  {(item.doi || item.paperUrl) && (
                    <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                      {item.paperUrl && (
                        <a
                          href={safeHref(item.paperUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-accent hover:underline font-medium"
                        >
                          <FileText className="size-3.5" />
                          <span>View Article</span>
                          <ExternalLink className="size-3 opacity-70" />
                        </a>
                      )}
                      {item.doi && (
                        <span className="font-mono text-xs text-muted">
                          DOI: {item.doi}
                        </span>
                      )}
                    </div>
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
        </div>
      )}
    </section>
  );
}
