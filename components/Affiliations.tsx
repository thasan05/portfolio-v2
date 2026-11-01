"use client";

import type { AffiliationItem } from "../lib/content";
import { safeHref } from "../lib/safe-href";

export default function Affiliations({ data }: { data: AffiliationItem[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="affiliations" className="container-wide mt-16 sm:mt-24 scroll-mt-20" aria-labelledby="affiliations-heading">
      <div className="flex flex-col gap-2">
        <p className="eyebrow">Professional Bodies</p>
        <h2 id="affiliations-heading" className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl text-fg">
          Affiliations &amp; Memberships
        </h2>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {data.map((item) => (
          <div key={item.id} className="card flex flex-col justify-between">
            <div>
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-serif text-lg font-semibold text-fg">
                  {item.orgUrl ? (
                    <a
                      href={safeHref(item.orgUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors underline-offset-2 hover:underline inline-flex items-center gap-1"
                    >
                      {item.org}
                    </a>
                  ) : (
                    item.org
                  )}
                </h3>
                <span className="tag text-xs">{item.role}</span>
              </div>

              <p className="mt-2 text-sm text-muted">
                {item.institution}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-line/60">
              <span className="text-xs text-muted tabular-nums">
                {item.period}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
