"use client";

import { Code2, ExternalLink } from "lucide-react";
import type { CodingProfile } from "../lib/content";
import { safeHref } from "../lib/safe-href";

export default function CodingProfiles({ data }: { data: CodingProfile[] }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <section id="coding" className="container-wide mt-20 sm:mt-28 scroll-mt-20" aria-labelledby="coding-heading">
      <div className="flex flex-col gap-2">
        <h2 id="coding-heading" className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-fg">
          Competitive Programming
        </h2>
        <p className="text-muted text-[15px] sm:text-base max-w-2xl leading-relaxed">
          Algorithmic problem solving, contest ratings, and verified online judge profiles.
        </p>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        {data.map((p) => (
          <a
            key={p.id}
            href={safeHref(p.url)}
            target="_blank"
            rel="noopener noreferrer"
            className="card group flex items-center justify-between rounded-2xl sm:rounded-3xl border border-line bg-surface p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-fg/20"
          >
            <div className="flex items-center gap-3.5">
              <div className="grid size-10 place-items-center rounded-xl border border-line/80 bg-black/[0.03] dark:bg-white/[0.06] text-muted">
                <Code2 className="size-4" />
              </div>
              <div>
                <p className="font-sans text-base font-semibold tracking-tight text-fg group-hover:text-accent transition-colors">
                  {p.platform}
                </p>
                <p className="text-xs text-muted font-medium mt-0.5">
                  {p.username}{p.stat ? ` · ${p.stat}` : ""}
                </p>
              </div>
            </div>
            <ExternalLink className="size-4 text-muted group-hover:text-fg transition-colors" />
          </a>
        ))}
      </div>
    </section>
  );
}
