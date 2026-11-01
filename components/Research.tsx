"use client";

import type { ResearchData } from "../lib/content";

export default function Research({ data }: { data: ResearchData }) {
  if (!data || !data.enabled) return null;
  const hasContent = (data.statement && data.statement.trim()) || (Array.isArray(data.areas) && data.areas.length > 0);
  if (!hasContent) return null;

  return (
    <section id="research-interests" className="container-wide mt-14 sm:mt-18 scroll-mt-20" aria-labelledby="research-interests-heading">
      <div className="flex flex-col gap-2">
        <h3 id="research-interests-heading" className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-fg">
          Research Interests
        </h3>
      </div>

      {data.statement && data.statement.trim() && (
        <p className="mt-4 text-[15px] sm:text-base text-muted max-w-2xl leading-relaxed">
          {data.statement}
        </p>
      )}

      {Array.isArray(data.areas) && data.areas.length > 0 && (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {data.areas.map((area) => (
            <div
              key={area.id}
              className="card rounded-2xl sm:rounded-3xl border border-line bg-surface p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-fg/20"
            >
              <h4 className="font-sans text-base sm:text-lg font-semibold tracking-tight text-fg">
                {area.title}
              </h4>
              {area.description && (
                <p className="mt-2 text-sm text-muted leading-relaxed whitespace-pre-line font-normal">
                  {area.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
