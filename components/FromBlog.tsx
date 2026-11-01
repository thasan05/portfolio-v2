import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "../lib/blog";

export default function FromBlog({ posts }: { posts: BlogPost[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section id="blog-preview" className="container-wide mt-20 sm:mt-28 scroll-mt-20" aria-labelledby="blog-preview-heading">
      <div className="flex items-baseline justify-between border-b border-line/70 pb-4">
        <div>
          <h2 id="blog-preview-heading" className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-fg">
            From the Blog
          </h2>
          <p className="text-muted text-[15px] sm:text-base max-w-2xl leading-relaxed mt-1">
            Technical notes, systems deep dives, and reflections on computing.
          </p>
        </div>
        <Link
          href="/blog"
          className="text-xs sm:text-sm text-accent hover:underline transition-colors inline-flex items-center gap-1 font-medium shrink-0"
        >
          <span>All posts</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      <div className="mt-4">
        <ul className="divide-y divide-line/70 border-b border-line/70">
          {posts.slice(0, 3).map((post) => {
            const wordCount = post.body ? post.body.trim().split(/\s+/).length : 0;
            const readTime = Math.max(1, Math.round(wordCount / 200));

            return (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block py-6 transition-opacity hover:opacity-95"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <h3 className="font-sans text-lg sm:text-xl font-semibold tracking-tight text-fg group-hover:text-accent transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <span className="shrink-0 text-xs sm:text-sm text-muted tabular-nums sm:text-right font-medium">
                      <time dateTime={post.date}>{post.date}</time> · {readTime} min read
                    </span>
                  </div>
                  {post.excerpt && (
                    <p className="mt-2.5 text-[14.5px] text-muted max-w-3xl leading-relaxed font-normal">
                      {post.excerpt}
                    </p>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span key={tag} className="tag text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
