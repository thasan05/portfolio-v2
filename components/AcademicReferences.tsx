"use client";

import { Mail, ExternalLink } from "lucide-react";
import type { ReferenceItem } from "../lib/content";
import { safeHref } from "../lib/safe-href";

export default function AcademicReferences({ data }: { data: ReferenceItem[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="references" className="container-wide mt-16 sm:mt-24 scroll-mt-20" aria-labelledby="references-heading">
      <div className="flex flex-col gap-2">
        <h2 id="references-heading" className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl text-fg">
          Academic References
        </h2>
        <p className="text-muted text-[15px] max-w-2xl">
          University faculty and academic mentors who supervise coursework, communication, and research.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {data.map((item) => (
          <div key={item.id} className="card flex flex-col justify-between">
            <div>
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-serif text-lg font-semibold text-fg">
                  {item.nameLink ? (
                    <a
                      href={safeHref(item.nameLink)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors underline-offset-2 hover:underline inline-flex items-center gap-1"
                    >
                      <span>{item.name}</span>
                      <ExternalLink className="size-3 opacity-60" />
                    </a>
                  ) : (
                    <span>{item.name}</span>
                  )}
                </h3>
                <span className="tag text-xs">{item.title}</span>
              </div>

              <p className="mt-2 text-sm text-muted">
                {item.institution}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-line/60">
              <a
                href={`mailto:${item.email}`}
                className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline font-medium"
              >
                <Mail className="size-3" />
                <span>{item.email}</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
