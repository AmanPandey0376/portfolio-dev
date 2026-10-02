import { useEffect, useState } from "react";

export interface Repo {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  homepage: string | null;
  updated_at: string;
  fork: boolean;
}

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; repos: Repo[] };

const CACHE_KEY = "ap-gh-repos-v1";
const TTL = 1000 * 60 * 60; // 1h — avoids hitting the unauthenticated rate limit

/**
 * Public, unauthenticated GitHub API call. The section renders fine without it:
 * on error the component falls back to static links.
 */
export function useGithubRepos(user: string, exclude: string[] = []) {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const filter = (repos: Repo[]) =>
      repos.filter((r) => !r.fork && r.name.toLowerCase() !== user.toLowerCase() && !exclude.includes(r.name));

    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const { at, repos } = JSON.parse(cached) as { at: number; repos: Repo[] };
        if (Date.now() - at < TTL) {
          setState({ status: "ready", repos: filter(repos) });
          return;
        }
      }
    } catch {
      /* ignore cache errors */
    }

    const ctrl = new AbortController();
    fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=updated`, {
      signal: ctrl.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json() as Promise<Repo[]>;
      })
      .then((data) => {
        const repos = data.map(({ name, description, language, html_url, homepage, updated_at, fork }) => ({
          name, description, language, html_url, homepage, updated_at, fork,
        }));
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), repos }));
        } catch {
          /* ignore */
        }
        setState({ status: "ready", repos: filter(repos) });
      })
      .catch((err) => {
        if (err?.name !== "AbortError") setState({ status: "error" });
      });

    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return state;
}
