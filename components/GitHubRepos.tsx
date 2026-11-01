"use client";

import { Github, Star, GitFork, ExternalLink } from "lucide-react";
import type { Repo } from "../lib/github";
import { safeHref } from "../lib/safe-href";

export default function GitHubRepos({ data }: { data: Repo[] }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <section id="github" className="container-wide mt-20 sm:mt-28 scroll-mt-20" aria-labelledby="github-heading">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h2 id="github-heading" className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-fg">
            Recent Repositories
          </h2>
          <p className="text-muted text-[15px] sm:text-base max-w-2xl leading-relaxed mt-1">
            Open-source code, network experiments, and tool repositories on GitHub.
          </p>
        </div>
        <a
          href={safeHref("https://github.com/thasan05")}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted hover:text-fg transition-colors inline-flex items-center gap-1 font-medium shrink-0"
        >
          <span>All repositories</span>
          <ExternalLink className="size-3 opacity-60" />
        </a>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        {data.map((repo) => (
          <a
            key={repo.name}
            href={safeHref(repo.url)}
            target="_blank"
            rel="noopener noreferrer"
            className="card group flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-line bg-surface p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-fg/20"
          >
            <div>
              <div className="flex items-center gap-2.5">
                <Github className="size-4 text-muted group-hover:text-fg transition-colors" />
                <h3 className="font-sans text-base font-semibold tracking-tight text-fg group-hover:text-accent transition-colors">
                  {repo.name}
                </h3>
              </div>
              {repo.description && (
                <p className="mt-2.5 text-sm text-muted leading-relaxed line-clamp-2 font-normal">
                  {repo.description}
                </p>
              )}
            </div>

            <div className="mt-5 pt-3.5 border-t border-line/60 flex items-center gap-3 text-xs text-muted tabular-nums">
              {repo.language && (
                <span className="tag text-xs font-medium">
                  {repo.language}
                </span>
              )}
              {repo.stars > 0 && (
                <span className="inline-flex items-center gap-1 font-medium">
                  <Star className="size-3" /> {repo.stars}
                </span>
              )}
              {repo.forks > 0 && (
                <span className="inline-flex items-center gap-1 font-medium">
                  <GitFork className="size-3" /> {repo.forks}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
