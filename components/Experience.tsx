"use client";

import type { ExperienceItem } from "../lib/content";
import { safeHref } from "../lib/safe-href";

export default function Experience({ data }: { data: ExperienceItem[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="experience" className="container-wide mt-20 sm:mt-28 scroll-mt-20" aria-labelledby="experience-heading">
      <div className="flex flex-col gap-2">
        <h2 id="experience-heading" className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-fg">
          Leadership &amp; Community
        </h2>
        <p className="text-muted text-[15px] sm:text-base max-w-2xl leading-relaxed">
          Student ambassadorship, community founding, and inter-university academic competitions.
        </p>
      </div>

      <ol className="mt-7 divide-y divide-line/70 border-y border-line/70">
        {data.map((item) => (
          <li key={item.id} className="py-6 transition-colors">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <div>
                <h3 className="font-sans text-lg font-semibold tracking-tight text-fg">
                  {item.title}
                </h3>
                <p className="text-[14.5px] text-muted mt-1">
                  {item.orgUrl ? (
                    <a
                      href={safeHref(item.orgUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors underline-offset-2 hover:underline font-medium text-fg/90"
                    >
                      {item.org}
                    </a>
                  ) : (
                    <span className="font-medium text-fg/90">{item.org}</span>
                  )}
                  {item.location && <span> · {item.location}</span>}
                </p>
              </div>
              <p className="shrink-0 text-xs sm:text-sm text-muted tabular-nums sm:text-right font-medium">
                {item.period}
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
