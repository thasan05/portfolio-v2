const ALLOWED = new Set(["https:", "http:", "mailto:", "tel:"]);

export function safeHref(url: string | undefined | null): string {
  if (!url) return "#";
  try {
    const { protocol } = new URL(url);
    return ALLOWED.has(protocol) ? url : "#";
  } catch {
    return url.startsWith("/") ? url : "#";
  }
}
