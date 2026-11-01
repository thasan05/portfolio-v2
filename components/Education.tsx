"use client";

import type { EducationItem } from "../lib/content";
import { safeHref } from "../lib/safe-href";

export default function Education({ data }: { data: EducationItem[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="education" className="container-wide mt-20 sm:mt-28 scroll-mt-20" aria-labelledby="education-heading">
      <div className="flex flex-col gap-2">
        <h2 id="education-heading" className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-fg">
          Academic Background
        </h2>
        <p className="text-muted text-[15px] sm:text-base max-w-2xl leading-relaxed">
          Higher education, academic foundations, and formal computing coursework.
        </p>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="card flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-line bg-surface p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-fg/20"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-sans text-base sm:text-lg font-semibold tracking-tight text-fg leading-snug">
                  {item.degree}
                </h3>
              </div>

              <div className="mt-2 text-sm text-muted">
                {item.schoolUrl ? (
                  <a
                    href={safeHref(item.schoolUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors underline-offset-2 hover:underline font-medium"
                  >
                    {item.school}
                  </a>
                ) : (
                  <span className="font-medium text-fg/90">{item.school}</span>
                )}
              </div>

              {item.subtitle && (
                <p className="mt-1 text-xs text-muted">
                  {item.subtitle}
                </p>
              )}

              {item.gpa && (
                <div className="mt-2.5">
                  <span className="tag text-xs font-medium">
                    GPA {item.gpa}
                  </span>
                </div>
              )}

              {item.description && (
                <p className="mt-3 text-sm text-muted leading-relaxed whitespace-pre-line font-normal">
                  {item.description}
                </p>
              )}
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
