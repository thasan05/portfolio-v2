"use client";

import type { ExperienceItem } from "../lib/content";
import { safeHref } from "../lib/safe-href";

export default function Experience({ data }: { data: ExperienceItem[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="experience" className="container-wide mt-16 sm:mt-24 scroll-mt-20" aria-labelledby="experience-heading">
      <div className="flex flex-col gap-2">
        <p className="eyebrow">Experience &amp; Leadership</p>
        <h2 id="experience-heading" className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl text-fg">
          Leadership &amp; Community
        </h2>
        <p className="text-muted text-[15px] max-w-2xl">
          Student ambassadorship, community founding, and inter-university academic competitions.
        </p>
      </div>

      <ol className="mt-6 divide-y divide-line border-y border-line">
        {data.map((item) => (
          <li key={item.id} className="py-5 sm:py-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <div>
                <h3 className="font-serif text-lg font-semibold text-fg">
                  {item.title}
                </h3>
                <p className="text-[15px] text-muted mt-0.5">
                  {item.orgUrl ? (
                    <a
                      href={safeHref(item.orgUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors underline-offset-2 hover:underline"
                    >
                      {item.org}
                    </a>
                  ) : (
                    <span>{item.org}</span>
                  )}
                  {item.location && <span> · {item.location}</span>}
                </p>
              </div>
              <p className="shrink-0 text-sm text-muted tabular-nums sm:text-right">
                {item.period}
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
