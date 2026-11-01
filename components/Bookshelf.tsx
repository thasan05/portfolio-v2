"use client";

import type { BookItem } from "../lib/content";
import { safeHref } from "../lib/safe-href";

export default function Bookshelf({ data }: { data: BookItem[] }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <section id="books" className="container-wide mt-16 sm:mt-24 scroll-mt-20" aria-labelledby="bookshelf-heading">
      <div className="flex flex-col gap-2">
        <h2 id="bookshelf-heading" className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl text-fg">
          Bookshelf
        </h2>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {data.map((book) => (
          <div key={book.id} className="card flex items-start gap-4">
            {book.coverImage && (
              <div className="relative aspect-[2/3] w-16 shrink-0 overflow-hidden rounded-md border border-line bg-line/20">
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
              <h3 className="font-serif text-base font-semibold text-fg leading-snug">
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
                <p className="mt-1 text-sm text-muted">
                  {book.author}
                </p>
              )}
              <div className="mt-2.5">
                <span className="tag text-xs capitalize">
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
