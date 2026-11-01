import type { MetadataRoute } from "next";
import { getAllPosts } from "../lib/blog";
import { getProjects } from "../lib/content";
import { projectSlug } from "../lib/slug";

const BASE = "https://tanvirh.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = (await getAllPosts()).map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const projects = (await getProjects())
    .filter((p) => p.body && p.body.trim())
    .map((p) => ({
      url: `${BASE}/projects/${projectSlug(p)}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...posts,
    ...projects,
  ];
}
