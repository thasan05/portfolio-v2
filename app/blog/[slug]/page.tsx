import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getPost } from "../../../lib/blog";
import { getHero } from "../../../lib/content";
import Markdown from "../../../components/Markdown";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export const dynamic = "force-dynamic";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article Not Found — Tanvir Hasan" };
  return {
    title: `${post.title} — Tanvir Hasan`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function BlogPost(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const [post, hero] = await Promise.all([
    getPost(slug),
    getHero(),
  ]);

  if (!post) notFound();

  const wordCount = post.body ? post.body.trim().split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.round(wordCount / 200));

  return (
    <>
      <Navbar showBlog />
      <main id="main" className="flex-1">
        <article className="container-page pt-12 sm:pt-16 pb-24">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg transition-colors mb-10"
          >
            <ArrowLeft className="size-4" /> All articles
          </Link>

          <header className="border-b border-line pb-8 mb-10">
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted mb-4 tabular-nums">
              <span className="flex items-center gap-1">
                <Calendar className="size-3" />
                <time dateTime={post.date}>{post.date}</time>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="size-3" />
                <span>{readTime} min read</span>
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-fg tracking-tight leading-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-4 font-serif text-xl sm:text-2xl text-muted leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-6">
                {post.tags.map((t) => (
                  <span key={t} className="tag text-xs">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className="prose max-w-none">
            <Markdown>{post.body}</Markdown>
          </div>

          <div className="mt-16 pt-8 border-t border-line flex items-center justify-between">
            <Link
              href="/blog"
              className="text-sm font-medium text-accent hover:underline inline-flex items-center gap-1"
            >
              <ArrowLeft className="size-4" /> Back to all articles
            </Link>
            <a
              href={`mailto:${hero.email}?subject=Regarding: ${encodeURIComponent(post.title)}`}
              className="text-sm text-muted hover:text-fg transition-colors"
            >
              Share your thoughts →
            </a>
          </div>
        </article>
      </main>
      <Footer hero={hero} />
    </>
  );
}
