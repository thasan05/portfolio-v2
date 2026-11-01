"use client";

import type { ResearchData } from "../lib/content";

export default function Research({ data }: { data: ResearchData }) {
  if (!data || !data.enabled) return null;
  const hasContent = (data.statement && data.statement.trim()) || (Array.isArray(data.areas) && data.areas.length > 0);
  if (!hasContent) return null;

  return (
    <section id="research-interests" className="container-wide mt-12 sm:mt-16 scroll-mt-20" aria-labelledby="research-interests-heading">
      <div className="flex flex-col gap-2">
        <h3 id="research-interests-heading" className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl text-fg">
          Research Interests
        </h3>
      </div>

      {data.statement && data.statement.trim() && (
        <p className="mt-4 text-[15px] text-muted max-w-2xl leading-relaxed">
          {data.statement}
        </p>
      )}

      {Array.isArray(data.areas) && data.areas.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {data.areas.map((area) => (
            <div key={area.id} className="card">
              <h4 className="font-serif text-lg font-semibold text-fg">
                {area.title}
              </h4>
              {area.description && (
                <p className="mt-2 text-sm text-muted leading-relaxed whitespace-pre-line">
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
