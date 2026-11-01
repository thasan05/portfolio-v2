"use client";

import type { CareerItem } from "../lib/content";
import { safeHref } from "../lib/safe-href";

export default function CareerExperience({ data }: { data: CareerItem[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="career" className="container-wide mt-20 sm:mt-28 scroll-mt-20" aria-labelledby="career-heading">
      <div className="flex flex-col gap-2">
        <h2 id="career-heading" className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-fg">
          Career Experience
        </h2>
        <p className="text-muted text-[15px] sm:text-base max-w-2xl leading-relaxed">
          Professional engagements, industry roles, and software engineering practice.
        </p>
      </div>

      <ol className="mt-7 divide-y divide-line/70 border-y border-line/70">
        {data.map((item) => (
          <li key={item.id} className="py-6 transition-colors">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-sans text-lg font-semibold tracking-tight text-fg">
                    {item.role}
                  </h3>
                  {item.employmentType && (
                    <span className="tag text-xs font-medium">{item.employmentType}</span>
                  )}
                </div>
                <p className="text-[14.5px] text-muted mt-1">
                  {item.companyUrl ? (
                    <a
                      href={safeHref(item.companyUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors underline-offset-2 hover:underline font-medium text-fg/90"
                    >
                      {item.company}
                    </a>
                  ) : (
                    <span className="font-medium text-fg/90">{item.company}</span>
                  )}
                  {item.location && <span> · {item.location}</span>}
                  {item.locationType && <span> ({item.locationType})</span>}
                </p>
              </div>
              <p className="shrink-0 text-xs sm:text-sm text-muted tabular-nums sm:text-right font-medium">
                {item.startMonth}
                {item.endMonth ? ` – ${item.endMonth}` : ""}
              </p>
            </div>

            {item.description && (
              <p className="mt-3 text-[14.5px] text-muted leading-relaxed max-w-3xl whitespace-pre-line font-normal">
                {item.description}
              </p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
