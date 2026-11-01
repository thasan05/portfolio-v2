"use client";

import Link from "next/link";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import type { ProjectItem } from "../lib/content";
import { safeHref } from "../lib/safe-href";
import { projectSlug } from "../lib/slug";

function ProjectCard({ item }: { item: ProjectItem }) {
  const hasCaseStudy = Boolean(item.body && item.body.trim());

  return (
    <article className="card relative flex h-full flex-col justify-between overflow-hidden">
      <div>
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-xl font-semibold text-fg">
            {hasCaseStudy ? (
              <Link
                href={`/projects/${projectSlug(item)}`}
                className="stretched after:absolute after:inset-0 hover:text-accent transition-colors"
              >
                {item.title}
              </Link>
            ) : item.liveUrl ? (
              <a
                href={safeHref(item.liveUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="stretched after:absolute after:inset-0 hover:text-accent transition-colors"
              >
                {item.title}
              </a>
            ) : (
              <span>{item.title}</span>
            )}
          </h3>
          <div className="flex items-center gap-1.5 shrink-0">
            {item.status && <span className="tag text-xs">{item.status}</span>}
            {item.date && (
              <span className="text-xs text-muted tabular-nums">{item.date}</span>
            )}
          </div>
        </div>

        <p className="mt-3 text-[15px] text-muted leading-relaxed whitespace-pre-line">
          {item.description}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-line/60">
        {item.tags && item.tags.length > 0 && (
          <ul className="flex flex-wrap gap-1.5" aria-label="Project technologies">
            {item.tags.map((tag) => (
              <li key={tag} className="tag text-xs">
                {tag}
              </li>
            ))}
          </ul>
        )}

        {/* Explicit interactive links outside stretched link if needed */}
        <div className="relative z-10 mt-3 flex items-center gap-4 text-xs">
          {item.repoUrl && (
            <a
              href={safeHref(item.repoUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted hover:text-fg transition-colors"
            >
              <Github className="size-3.5" />
              <span>Source code</span>
            </a>
          )}
          {item.liveUrl && (
            <a
              href={safeHref(item.liveUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted hover:text-fg transition-colors"
            >
              <ExternalLink className="size-3.5" />
              <span>Live deployment</span>
            </a>
          )}
          {hasCaseStudy && (
            <Link
              href={`/projects/${projectSlug(item)}`}
              className="inline-flex items-center gap-1 text-accent font-medium hover:underline"
            >
              <span>Case study</span>
              <ArrowRight className="size-3" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects({ data }: { data: ProjectItem[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="projects" className="container-wide mt-16 sm:mt-24 scroll-mt-20" aria-labelledby="projects-heading">
      <div className="flex flex-col gap-2">
        <p className="eyebrow">Projects</p>
        <h2 id="projects-heading" className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl text-fg">
          Selected Work
        </h2>
        <p className="text-muted text-[15px] max-w-2xl">
          Systems simulations, applied data research, and software tools built with intentionality.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {data.map((item) => (
          <ProjectCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
