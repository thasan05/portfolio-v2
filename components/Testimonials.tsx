"use client";

import type { TestimonialItem } from "../lib/content";
import { safeHref } from "../lib/safe-href";

export default function Testimonials({ data }: { data: TestimonialItem[] }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <section id="testimonials" className="container-wide mt-16 sm:mt-24 scroll-mt-20" aria-labelledby="testimonials-heading">
      <div className="flex flex-col gap-2">
        <p className="eyebrow">Recommendations</p>
        <h2 id="testimonials-heading" className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl text-fg">
          Endorsements
        </h2>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {data.map((item) => (
          <figure key={item.id} className="card flex flex-col justify-between">
            <blockquote className="font-serif text-[17px] text-fg leading-relaxed italic">
              “{item.quote}”
            </blockquote>
            <figcaption className="mt-4 pt-3 border-t border-line/60 flex items-center gap-3">
              <div className="min-w-0">
                <p className="font-serif text-sm font-semibold text-fg">
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
                  <p className="text-xs text-muted">
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
