export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Stable, URL-friendly slug for a project: explicit slug > slugified title > id.
export function projectSlug(p: { slug?: string; title: string; id: string }): string {
  return (p.slug && p.slug.trim()) || slugify(p.title) || p.id;
}
