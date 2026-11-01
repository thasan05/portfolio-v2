import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getPost } from "../../../lib/blog";
import { getHero } from "../../../lib/content";
import Markdown from "../../../components/Markdown";
import SiteHeader from "../../../components/SiteHeader";
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
      <SiteHeader showBlog />
      <main id="main" className="flex-1">
        <article className="container-page pt-12 sm:pt-16 pb-24">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg transition-colors mb-10 font-medium"
          >
            <ArrowLeft className="size-4" /> All articles
          </Link>

          <header className="border-b border-line/70 pb-8 mb-10">
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted mb-4 tabular-nums font-medium">
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

            <h1 className="font-sans text-3xl sm:text-5xl font-bold text-fg tracking-tight leading-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-4 text-lg sm:text-xl text-muted leading-relaxed font-normal">
                {post.excerpt}
              </p>
            )}

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-6">
                {post.tags.map((t) => (
                  <span key={t} className="tag text-xs font-medium">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className="prose max-w-none">
            <Markdown>{post.body}</Markdown>
          </div>

          {/* Author Signature Card (Apple Bento Tile) */}
          <div className="card mt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-2xl sm:rounded-3xl border border-line bg-surface p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-4">
              <Image
                src={hero.profileImage || "/profile.jpg"}
                alt={hero.name}
                width={56}
                height={56}
                className="size-14 rounded-full border border-line object-cover shrink-0"
              />
              <div>
                <p className="font-sans text-base font-semibold tracking-tight text-fg">
                  {hero.name}
                </p>
                <p className="text-xs text-muted mt-0.5 font-medium">
                  {hero.title || "Networking & Systems Focused CSE Undergraduate"}
                </p>
                <p className="text-xs text-muted/80 mt-1">
                  Based in {hero.location} · Future MS Candidate
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/#contact"
                className="btn btn-primary text-xs py-1.5 px-3.5 min-h-[2.25rem]"
              >
                Get in touch
              </Link>
              <Link
                href="/"
                className="btn text-xs py-1.5 px-3.5 min-h-[2.25rem]"
              >
                Home
              </Link>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-line/70 flex items-center justify-between">
            <Link
              href="/blog"
              className="text-sm font-medium text-accent hover:underline inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="size-4" /> Back to all articles
            </Link>
            <a
              href={`mailto:${hero.email}?subject=Regarding: ${encodeURIComponent(post.title)}`}
              className="text-sm text-muted hover:text-fg transition-colors font-medium"
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
