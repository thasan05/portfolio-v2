"use client";

import type { EducationItem } from "../lib/content";
import { safeHref } from "../lib/safe-href";

export default function Education({ data }: { data: EducationItem[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="education" className="container-wide mt-16 sm:mt-24 scroll-mt-20" aria-labelledby="education-heading">
      <div className="flex flex-col gap-2">
        <h2 id="education-heading" className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl text-fg">
          Academic Background
        </h2>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {data.map((item) => (
          <div key={item.id} className="card flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-serif text-lg font-semibold text-fg leading-snug">
                  {item.degree}
                </h3>
              </div>

              <div className="mt-2 text-sm text-muted">
                {item.schoolUrl ? (
                  <a
                    href={safeHref(item.schoolUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors underline-offset-2 hover:underline"
                  >
                    {item.school}
                  </a>
                ) : (
                  <span>{item.school}</span>
                )}
              </div>

              {item.subtitle && (
                <p className="mt-1 text-xs text-muted">
                  {item.subtitle}
                </p>
              )}

              {item.gpa && (
                <div className="mt-2">
                  <span className="tag text-xs font-medium">
                    GPA {item.gpa}
                  </span>
                </div>
              )}

              {item.description && (
                <p className="mt-3 text-sm text-muted leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>
              )}
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
