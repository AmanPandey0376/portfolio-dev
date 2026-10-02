import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { ButtonLink } from "@/components/Button";
import { GithubIcon } from "@/components/BrandIcons";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/profile";
import { useGithubRepos } from "@/hooks/useGithubRepos";

const featured = ["Lead-Generation-Agent", "ai-powered-learning-roadmap-generator", "MovieDiary"];
const pretty = (name: string) => name.replace(/[-_]+/g, " ").replace(/\b(\w)/g, (c) => c.toUpperCase());

export function GithubSection() {
  const state = useGithubRepos("AmanPandey0376", featured);

  return (
    <section aria-labelledby="github-title" className="relative pb-24 sm:pb-32">
      <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
        <div className="card overflow-hidden">
          <div className="flex flex-col gap-6 border-b hairline p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
            <div>
              <p className="eyebrow flex items-center gap-2">
                <GithubIcon className="h-3.5 w-3.5" /> github.com/AmanPandey0376
              </p>
              <h2 id="github-title" className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-fg sm:text-[1.75rem]">
                Open Source &amp; Experiments
              </h2>
              <p className="mt-2 max-w-lg text-[0.95rem] text-muted">
                Earlier builds and experiments — Java systems projects, web pages and data work — alongside the featured projects above.
              </p>
            </div>
            <ButtonLink href={profile.links.github} target="_blank" rel="noreferrer" variant="secondary" icon={<ArrowUpRight className="h-4 w-4" />}>
              Explore GitHub
            </ButtonLink>
          </div>

          <div className="p-3 sm:p-4">
            {state.status === "loading" && (
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading repositories" aria-busy="true">
                {Array.from({ length: 6 }).map((_, i) => (
                  <li key={i} className="h-[5.5rem] animate-pulse rounded-xl bg-line/[0.04]" />
                ))}
              </ul>
            )}

            {state.status === "error" && (
              <p className="px-3 py-6 text-sm text-muted">
                Repositories couldn't be loaded right now.{" "}
                <a href={profile.links.github} target="_blank" rel="noreferrer" className="text-fg underline decoration-line/30 underline-offset-4 hover:decoration-accent">
                  Browse them on GitHub
                </a>
                .
              </p>
            )}

            {state.status === "ready" && state.repos.length === 0 && (
              <p className="px-3 py-6 text-sm text-muted">No additional public repositories yet.</p>
            )}

            {state.status === "ready" && state.repos.length > 0 && (
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {state.repos.slice(0, 6).map((r, i) => (
                  <Reveal as="li" key={r.name} delay={i * 0.04}>
                    <a
                      href={r.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex h-full min-h-[5.5rem] items-start gap-3 rounded-xl border border-transparent p-4 transition-colors hover:border-line/10 hover:bg-line/[0.03]"
                    >
                      <FolderGit2 className="mt-0.5 h-4 w-4 shrink-0 text-subtle transition-colors group-hover:text-accent" />
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-2">
                          <span className="truncate text-[0.92rem] font-medium text-fg">{pretty(r.name)}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-subtle opacity-0 transition-opacity group-hover:opacity-100" />
                        </span>
                        {r.description && <span className="mt-1 line-clamp-2 block text-xs text-muted">{r.description}</span>}
                        <span className="mt-2 flex items-center gap-3 font-mono text-2xs text-subtle">
                          {r.language && (
                            <span className="inline-flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-accent/70" /> {r.language}
                            </span>
                          )}
                          <span>Updated {new Date(r.updated_at).getFullYear()}</span>
                        </span>
                      </span>
                    </a>
                  </Reveal>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
