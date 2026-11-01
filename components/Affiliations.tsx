"use client";

import type { AffiliationItem } from "../lib/content";
import { safeHref } from "../lib/safe-href";

export default function Affiliations({ data }: { data: AffiliationItem[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="affiliations" className="container-wide mt-20 sm:mt-28 scroll-mt-20" aria-labelledby="affiliations-heading">
      <div className="flex flex-col gap-2">
        <h2 id="affiliations-heading" className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-fg">
          Affiliations &amp; Memberships
        </h2>
        <p className="text-muted text-[15px] sm:text-base max-w-2xl leading-relaxed">
          Professional societies, academic bodies, and global engineering organizations.
        </p>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        {data.map((item) => (
          <div
            key={item.id}
            className="card flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-line bg-surface p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-fg/20"
          >
            <div>
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <h3 className="font-sans text-base sm:text-lg font-semibold tracking-tight text-fg">
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
                <span className="tag text-xs font-medium">{item.role}</span>
              </div>

              <p className="mt-2 text-sm text-muted font-normal">
                {item.institution}
              </p>
            </div>

            <div className="mt-5 pt-3.5 border-t border-line/60">
              <span className="text-xs text-muted tabular-nums font-medium">
                {item.period}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
