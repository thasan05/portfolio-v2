"use client";

import type { CareerItem } from "../lib/content";
import { safeHref } from "../lib/safe-href";

export default function CareerExperience({ data }: { data: CareerItem[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="career" className="container-wide mt-16 sm:mt-24 scroll-mt-20" aria-labelledby="career-heading">
      <div className="flex flex-col gap-2">
        <h2 id="career-heading" className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl text-fg">
          Career Experience
        </h2>
      </div>

      <ol className="mt-6 divide-y divide-line border-y border-line">
        {data.map((item) => (
          <li key={item.id} className="py-5 sm:py-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-lg font-semibold text-fg">
                    {item.role}
                  </h3>
                  {item.employmentType && (
                    <span className="tag text-xs">{item.employmentType}</span>
                  )}
                </div>
                <p className="text-[15px] text-muted mt-0.5">
                  {item.companyUrl ? (
                    <a
                      href={safeHref(item.companyUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors underline-offset-2 hover:underline"
                    >
                      {item.company}
                    </a>
                  ) : (
                    <span>{item.company}</span>
                  )}
                  {item.location && <span> · {item.location}</span>}
                  {item.locationType && <span> ({item.locationType})</span>}
                </p>
              </div>
              <p className="shrink-0 text-sm text-muted tabular-nums sm:text-right">
                {item.startMonth}
                {item.endMonth ? ` – ${item.endMonth}` : ""}
              </p>
            </div>

            {item.description && (
              <p className="mt-3 text-[15px] text-muted leading-relaxed max-w-3xl whitespace-pre-line">
                {item.description}
              </p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
