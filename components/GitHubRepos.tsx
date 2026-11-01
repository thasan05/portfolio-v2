"use client";

import { Github, Star, GitFork, ExternalLink } from "lucide-react";
import type { Repo } from "../lib/github";
import { safeHref } from "../lib/safe-href";

export default function GitHubRepos({ data }: { data: Repo[] }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <section id="github" className="container-wide mt-16 sm:mt-24 scroll-mt-20" aria-labelledby="github-heading">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="eyebrow">Open Source</p>
          <h2 id="github-heading" className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl text-fg">
            Recent Repositories
          </h2>
        </div>
        <a
          href={safeHref("https://github.com/thasan05")}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted hover:text-fg transition-colors inline-flex items-center gap-1"
        >
          <span>All repositories</span>
          <ExternalLink className="size-3 opacity-60" />
        </a>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {data.map((repo) => (
          <a
            key={repo.name}
            href={safeHref(repo.url)}
            target="_blank"
            rel="noopener noreferrer"
            className="card group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2">
                <Github className="size-4 text-muted group-hover:text-fg transition-colors" />
                <h3 className="font-serif text-base font-semibold text-fg group-hover:text-accent transition-colors">
                  {repo.name}
                </h3>
              </div>
              {repo.description && (
                <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">
                  {repo.description}
                </p>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-line/60 flex items-center gap-3 text-xs text-muted tabular-nums">
              {repo.language && (
                <span className="tag text-xs">
                  {repo.language}
                </span>
              )}
              {repo.stars > 0 && (
                <span className="inline-flex items-center gap-1">
                  <Star className="size-3" /> {repo.stars}
                </span>
              )}
              {repo.forks > 0 && (
                <span className="inline-flex items-center gap-1">
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
