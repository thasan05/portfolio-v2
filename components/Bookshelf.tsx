"use client";

import type { BookItem } from "../lib/content";
import { safeHref } from "../lib/safe-href";

export default function Bookshelf({ data }: { data: BookItem[] }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <section id="books" className="container-wide mt-20 sm:mt-28 scroll-mt-20" aria-labelledby="bookshelf-heading">
      <div className="flex flex-col gap-2">
        <h2 id="bookshelf-heading" className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-fg">
          Bookshelf
        </h2>
        <p className="text-muted text-[15px] sm:text-base max-w-2xl leading-relaxed">
          Influential reading on systems architecture, networking protocols, computing history, and engineering craft.
        </p>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-3">
        {data.map((book) => (
          <div
            key={book.id}
            className="card group flex items-start gap-4 rounded-2xl sm:rounded-3xl border border-line bg-surface p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-fg/20"
          >
            {book.coverImage && (
              <div className="relative aspect-[2/3] w-16 shrink-0 overflow-hidden rounded-xl border border-line/80 bg-line/20 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:rotate-1 group-hover:shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={book.coverImage}
                  alt={book.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h3 className="font-sans text-base font-semibold tracking-tight text-fg leading-snug">
                {book.coverLink ? (
                  <a
                    href={safeHref(book.coverLink)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors underline-offset-2 hover:underline"
                  >
                    {book.title}
                  </a>
                ) : (
                  book.title
                )}
              </h3>
              {book.author && (
                <p className="mt-1 text-xs text-muted font-normal">
                  {book.author}
                </p>
              )}
              <div className="mt-3">
                <span className="tag text-xs capitalize font-medium">
                  {book.status === "reading" ? "Currently reading" : "Completed"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
