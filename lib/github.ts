export interface Repo {
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
}

const USERNAME = "thasan05";

// Fetched server-side and cached for an hour (ISR), so the unauthenticated
// GitHub rate limit is never a concern. Returns [] on any error so the
// section simply hides rather than breaking the page.
export async function getGitHubRepos(): Promise<Repo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    const json = await res.json();
    if (!Array.isArray(json)) return [];
    const data = json as Array<{
      name: string;
      description: string | null;
      html_url: string;
      stargazers_count: number;
      forks_count: number;
      language: string | null;
      fork: boolean;
      archived: boolean;
    }>;

    return data
      .filter((r) => !r.fork && !r.archived)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
      .map((r) => ({
        name: r.name,
        description: r.description ?? "",
        url: r.html_url,
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language,
      }));
  } catch {
    return [];
  }
}
