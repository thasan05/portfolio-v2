"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import type { ProjectItem } from "../lib/content";
import { safeHref } from "../lib/safe-href";
import { projectSlug } from "../lib/slug";

function ProjectCard({ item }: { item: ProjectItem }) {
  const hasCaseStudy = Boolean(item.body && item.body.trim());

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="card group relative flex h-full flex-col justify-between overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-fg/40 hover:shadow-sm"
    >
      <div>
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-xl font-semibold text-fg">
            {hasCaseStudy ? (
              <Link
                href={`/projects/${projectSlug(item)}`}
                className="stretched after:absolute after:inset-0 hover:text-accent transition-colors inline-flex items-center gap-1"
              >
                <span>{item.title}</span>
                <ArrowRight className="size-4 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-accent" />
              </Link>
            ) : item.liveUrl ? (
              <a
                href={safeHref(item.liveUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="stretched after:absolute after:inset-0 hover:text-accent transition-colors inline-flex items-center gap-1"
              >
                <span>{item.title}</span>
                <ExternalLink className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100 text-accent" />
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
    </motion.article>
  );
}

export default function Projects({ data }: { data: ProjectItem[] }) {
  const [selectedTag, setSelectedTag] = useState<string>("all");

  const availableTags = useMemo(() => {
    if (!Array.isArray(data)) return [];
    const set = new Set<string>();
    data.forEach((p) => {
      p.tags?.forEach((t) => set.add(t));
    });
    return Array.from(set);
  }, [data]);

  const filteredProjects = useMemo(() => {
    if (!Array.isArray(data)) return [];
    if (selectedTag === "all") return data;
    return data.filter((p) => p.tags?.includes(selectedTag));
  }, [data, selectedTag]);

  if (!data || data.length === 0) return null;

  return (
    <section id="projects" className="container-wide mt-16 sm:mt-24 scroll-mt-20" aria-labelledby="projects-heading">
      <div className="flex flex-col gap-2">
        <h2 id="projects-heading" className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl text-fg">
          Selected Work
        </h2>
        <p className="text-muted text-[15px] max-w-2xl">
          Systems simulations, applied data research, and software tools built with intentionality.
        </p>
      </div>

      {/* Filter Chips */}
      {availableTags.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-1.5 text-xs" aria-label="Filter projects by technology">
          <button
            type="button"
            onClick={() => setSelectedTag("all")}
            className={`rounded-full px-3 py-1 font-medium transition-all ${
              selectedTag === "all"
                ? "bg-fg text-bg"
                : "border border-line text-muted hover:text-fg hover:border-fg/50"
            }`}
          >
            All ({data.length})
          </button>
          {availableTags.slice(0, 5).map((tag) => {
            const count = data.filter((p) => p.tags?.includes(tag)).length;
            const active = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(active ? "all" : tag)}
                className={`rounded-full px-3 py-1 transition-all ${
                  active
                    ? "bg-fg text-bg font-medium"
                    : "border border-line text-muted hover:text-fg hover:border-fg/50"
                }`}
              >
                {tag} <span className="opacity-60 tabular-nums">({count})</span>
              </button>
            );
          })}
        </div>
      )}

      <motion.div layout className="mt-6 grid gap-4 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((item) => (
            <ProjectCard key={item.id} item={item} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
