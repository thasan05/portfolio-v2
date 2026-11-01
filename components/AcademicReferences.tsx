"use client";

import { Mail, ExternalLink } from "lucide-react";
import type { ReferenceItem } from "../lib/content";
import { safeHref } from "../lib/safe-href";

export default function AcademicReferences({ data }: { data: ReferenceItem[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="references" className="container-wide mt-20 sm:mt-28 scroll-mt-20" aria-labelledby="references-heading">
      <div className="flex flex-col gap-2">
        <h2 id="references-heading" className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-fg">
          Academic References
        </h2>
        <p className="text-muted text-[15px] sm:text-base max-w-2xl leading-relaxed">
          University faculty and academic mentors who supervise coursework, communication, and research.
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
                  {item.nameLink ? (
                    <a
                      href={safeHref(item.nameLink)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors underline-offset-2 hover:underline inline-flex items-center gap-1.5"
                    >
                      <span>{item.name}</span>
                      <ExternalLink className="size-3.5 opacity-60" />
                    </a>
                  ) : (
                    <span>{item.name}</span>
                  )}
                </h3>
                <span className="tag text-xs font-medium">{item.title}</span>
              </div>

              <p className="mt-2 text-sm text-muted font-normal">
                {item.institution}
              </p>
            </div>

            <div className="mt-5 pt-3.5 border-t border-line/60">
              <a
                href={`mailto:${item.email}`}
                className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline font-medium"
              >
                <Mail className="size-3.5" />
                <span>{item.email}</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
