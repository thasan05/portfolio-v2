"use client";

import type { TestimonialItem } from "../lib/content";
import { safeHref } from "../lib/safe-href";

export default function Testimonials({ data }: { data: TestimonialItem[] }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <section id="testimonials" className="container-wide mt-20 sm:mt-28 scroll-mt-20" aria-labelledby="testimonials-heading">
      <div className="flex flex-col gap-2">
        <h2 id="testimonials-heading" className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-fg">
          Endorsements
        </h2>
        <p className="text-muted text-[15px] sm:text-base max-w-2xl leading-relaxed">
          Reflections from faculty advisors, peers, and project collaborators.
        </p>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        {data.map((item) => (
          <figure
            key={item.id}
            className="card flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-line bg-surface p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-fg/20"
          >
            <blockquote className="font-sans text-base text-fg leading-relaxed">
              “{item.quote}”
            </blockquote>
            <figcaption className="mt-5 pt-3.5 border-t border-line/60 flex items-center gap-3">
              <div className="min-w-0">
                <p className="font-sans text-sm font-semibold tracking-tight text-fg">
                  {item.link ? (
                    <a
                      href={safeHref(item.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors underline-offset-2 hover:underline"
                    >
                      {item.name}
                    </a>
                  ) : (
                    item.name
                  )}
                </p>
                {(item.role || item.org) && (
                  <p className="text-xs text-muted font-normal mt-0.5">
                    {item.role}{item.role && item.org ? " · " : ""}{item.org}
                  </p>
                )}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
