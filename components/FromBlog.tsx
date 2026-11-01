import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "../lib/blog";

export default function FromBlog({ posts }: { posts: BlogPost[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section id="blog-preview" className="container-wide mt-16 sm:mt-24 scroll-mt-20" aria-labelledby="blog-preview-heading">
      <div className="flex items-baseline justify-between border-b border-line pb-4">
        <div>
          <h2 id="blog-preview-heading" className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl text-fg">
            From the Blog
          </h2>
        </div>
        <Link
          href="/blog"
          className="text-sm text-muted hover:text-fg transition-colors inline-flex items-center gap-1"
        >
          <span>All posts</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      <div className="mt-4">
        <ul className="divide-y divide-line border-b border-line">
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
                    <h3 className="font-serif text-xl font-semibold text-fg group-hover:text-accent transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <span className="shrink-0 text-sm text-muted tabular-nums sm:text-right">
                      <time dateTime={post.date}>{post.date}</time> · {readTime} min read
                    </span>
                  </div>
                  {post.excerpt && (
                    <p className="mt-2 text-[15px] text-muted max-w-3xl leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span key={tag} className="tag text-xs">
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
