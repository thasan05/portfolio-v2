// Blog posts are now managed from the admin CMS (stored in Redis), not MDX
// files. These helpers wrap getBlog() with the list/find logic the routes use.
import { getBlog, type BlogPost } from "./content";

export type { BlogPost };

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await getBlog();
  return posts
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const posts = await getBlog();
  const post = posts.find((p) => p.slug === slug && p.published);
  return post ?? null;
}
