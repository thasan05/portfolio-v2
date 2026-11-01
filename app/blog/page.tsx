import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getAllPosts } from "../../lib/blog";
import SiteHeader from "../../components/SiteHeader";
import Footer from "../../components/Footer";
import { getHero } from "../../lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog — Tanvir Hasan",
  description: "Writing on networking, distributed systems, and building software.",
};

export default async function BlogIndex() {
  const [posts, hero] = await Promise.all([
    getAllPosts(),
    getHero(),
  ]);

  return (
    <>
      <SiteHeader showBlog />
      <main id="main" className="flex-1">
        <div className="container-page pt-12 sm:pt-16 pb-20">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg transition-colors mb-8"
          >
            <ArrowLeft className="size-4" /> Back to home
          </Link>

          <header className="border-b border-line pb-8">
            <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl text-fg">
              Notes &amp; Articles
            </h1>
            <p className="mt-4 text-muted text-[17px] max-w-2xl leading-relaxed">
              Writing about computer networks, systems architectures, academic research, and engineering lessons.
            </p>
          </header>

          {posts.length === 0 ? (
            <div className="py-16 text-center text-muted">
              <p className="font-serif text-lg">No posts published yet.</p>
              <p className="text-sm mt-1">Check back soon for new articles.</p>
            </div>
          ) : (
            <ul className="divide-y divide-line border-b border-line">
              {posts.map((post) => {
                const wordCount = post.body ? post.body.trim().split(/\s+/).length : 0;
                const readTime = Math.max(1, Math.round(wordCount / 200));

                return (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block py-8 transition-opacity hover:opacity-95"
                    >
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                        <h2 className="font-serif text-2xl font-semibold text-fg group-hover:text-accent transition-colors leading-snug">
                          {post.title}
                        </h2>
                        <span className="shrink-0 text-sm text-muted tabular-nums sm:text-right">
                          <time dateTime={post.date}>{post.date}</time> · {readTime} min read
                        </span>
                      </div>
                      {post.excerpt && (
                        <p className="mt-2 text-[15px] text-muted leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}
                      {post.tags && post.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {post.tags.map((t) => (
                            <span key={t} className="tag text-xs">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </main>
      <Footer hero={hero} />
    </>
  );
}
