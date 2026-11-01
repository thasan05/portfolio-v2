import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Github, ExternalLink } from "lucide-react";
import { getProjects, getHero } from "../../../lib/content";
import { projectSlug } from "../../../lib/slug";
import { safeHref } from "../../../lib/safe-href";
import Markdown from "../../../components/Markdown";
import SiteHeader from "../../../components/SiteHeader";
import Footer from "../../../components/Footer";

export const dynamic = "force-dynamic";

async function findProject(slug: string) {
  const projects = await getProjects();
  if (!Array.isArray(projects)) return undefined;
  return projects.find((p) => projectSlug(p) === slug && p.body && p.body.trim());
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const project = await findProject(slug);
  if (!project) return { title: "Project Case Study Not Found" };
  return {
    title: `${project.title} — Tanvir Hasan`,
    description: project.description,
    openGraph: { title: project.title, description: project.description, type: "article" },
  };
}

export default async function ProjectCaseStudy(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const [project, hero] = await Promise.all([
    findProject(slug).catch(() => undefined),
    getHero(),
  ]);

  if (!project) notFound();

  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <article className="container-page pt-12 sm:pt-16 pb-24">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg transition-colors mb-10 font-medium"
          >
            <ArrowLeft className="size-4" /> Back to projects
          </Link>

          <header className="border-b border-line/70 pb-8 mb-10">
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted mb-4 tabular-nums">
              <span className="tag text-xs font-medium">
                {project.status}
              </span>
              {project.date && (
                <span className="flex items-center gap-1 font-medium">
                  <Calendar className="size-3" />
                  <span>{project.date}</span>
                </span>
              )}
            </div>

            <h1 className="font-sans text-3xl sm:text-5xl font-bold text-fg tracking-tight leading-tight">
              {project.title}
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-muted leading-relaxed font-normal">
              {project.description}
            </p>

            {project.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-6">
                {project.tags.map((t) => (
                  <span key={t} className="tag text-xs font-medium">
                    {t}
                  </span>
                ))}
              </div>
            )}

            {(project.repoUrl || project.liveUrl) && (
              <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-line/60">
                {project.repoUrl && (
                  <a
                    href={safeHref(project.repoUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn px-5 py-2.5"
                  >
                    <Github className="size-3.5" />
                    <span>Source code</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={safeHref(project.liveUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary px-5 py-2.5"
                  >
                    <ExternalLink className="size-3.5" />
                    <span>Live demo</span>
                  </a>
                )}
              </div>
            )}
          </header>

          <div className="prose max-w-none">
            <Markdown>{project.body!}</Markdown>
          </div>

          <div className="mt-16 pt-8 border-t border-line/70">
            <Link
              href="/#projects"
              className="text-sm font-medium text-accent hover:underline inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="size-4" /> Back to all projects
            </Link>
          </div>
        </article>
      </main>
      <Footer hero={hero} />
    </>
  );
}
