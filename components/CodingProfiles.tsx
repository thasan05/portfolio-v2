"use client";

import { Code2, ExternalLink } from "lucide-react";
import type { CodingProfile } from "../lib/content";
import { safeHref } from "../lib/safe-href";

export default function CodingProfiles({ data }: { data: CodingProfile[] }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <section id="coding" className="container-wide mt-16 sm:mt-24 scroll-mt-20" aria-labelledby="coding-heading">
      <div className="flex flex-col gap-2">
        <p className="eyebrow">Problem Solving</p>
        <h2 id="coding-heading" className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl text-fg">
          Competitive Programming
        </h2>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {data.map((p) => (
          <a
            key={p.id}
            href={safeHref(p.url)}
            target="_blank"
            rel="noopener noreferrer"
            className="card group flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="grid size-9 place-items-center rounded-lg border border-line bg-surface text-muted">
                <Code2 className="size-4" />
              </div>
              <div>
                <p className="font-serif text-base font-semibold text-fg group-hover:text-accent transition-colors">
                  {p.platform}
                </p>
                <p className="text-xs text-muted">
                  {p.username}{p.stat ? ` · ${p.stat}` : ""}
                </p>
              </div>
            </div>
            <ExternalLink className="size-3.5 text-muted group-hover:text-fg transition-colors" />
          </a>
        ))}
      </div>
    </section>
  );
}
