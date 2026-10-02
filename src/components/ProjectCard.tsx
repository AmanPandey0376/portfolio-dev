import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { GithubIcon } from "./BrandIcons";
import { projectVisuals } from "./ProjectVisuals";

type Props = { project: Project; index: number; onOpen: (p: Project) => void; flip?: boolean };

export function ProjectCard({ project, index, onOpen, flip }: Props) {
  const Visual = projectVisuals[project.id];
  const featured = project.featured;

  return (
    <article
      data-cursor="card"
      className={cn(
        "group relative isolate overflow-hidden rounded-2xl border hairline bg-surface transition-[transform,border-color,box-shadow] duration-500 ease-out",
        "hover:-translate-y-1 hover:border-line/[0.16] hover:shadow-[0_30px_80px_-40px_rgb(var(--accent)/0.45)]",
        "focus-within:border-line/[0.16]",
      )}
    >
      {/* hover aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: "radial-gradient(600px circle at 20% 0%, rgb(var(--accent) / 0.08), transparent 60%)" }}
      />

      <div
        className={cn(
          "grid grid-cols-1 [&>*]:min-w-0",
          featured ? "lg:grid-cols-[1fr_1.08fr]" : "md:grid-cols-[1.1fr_0.9fr]",
          flip && "lg:[&>*:first-child]:order-2",
        )}
      >
        {/* Content */}
        <div className={cn("flex flex-col p-6 sm:p-8", featured && "lg:p-10")}>
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xs text-accent">{String(index + 1).padStart(2, "0")}</span>
            <span className="h-px w-6 bg-line/20" aria-hidden="true" />
            <span className="eyebrow">{project.category}</span>
          </div>

          <h3 className={cn("mt-5 font-semibold tracking-[-0.03em] text-fg", featured ? "text-2xl sm:text-[2rem] sm:leading-[1.1]" : "text-xl sm:text-2xl")}>
            {project.title}
          </h3>
          <p className="mt-1.5 text-sm text-subtle">{project.tagline}</p>
          <p className="mt-4 max-w-prose text-[0.97rem] leading-relaxed text-muted">{project.summary}</p>

          {project.results.some((r) => r.value) && (
            <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border hairline bg-line/[0.08]">
              {project.results
                .filter((r) => r.value)
                .map((r) => (
                  <div key={r.label} className="bg-surface px-3 py-3">
                    <dt className="sr-only">{r.label}</dt>
                    <dd>
                      <span className="block text-lg font-semibold tracking-[-0.02em] text-fg">{r.value}</span>
                      <span className="mt-0.5 block text-[0.68rem] leading-snug text-subtle">{r.label}</span>
                    </dd>
                  </div>
                ))}
            </dl>
          )}

          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.stack.slice(0, featured ? 7 : 5).map((t, i) => (
              <li
                key={t}
                className="chip transition-[transform,border-color,color] duration-300 group-hover:border-line/20 group-hover:text-fg/90"
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-2 pt-8">
            {/* Stretched button: the whole card opens the case study. Links sit above it. */}
            <button
              type="button"
              onClick={() => onOpen(project)}
              aria-haspopup="dialog"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-fg px-4 text-sm font-medium text-bg transition-colors after:absolute after:inset-0 after:z-10 after:content-[''] hover:bg-fg/90"
            >
              View case study
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="relative z-20 inline-flex h-10 items-center gap-2 rounded-full border hairline-strong px-4 text-sm text-fg transition-colors hover:bg-line/[0.06]"
            >
              <GithubIcon /> GitHub
            </a>
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                className="relative z-20 inline-flex h-10 items-center gap-2 rounded-full border hairline-strong px-4 text-sm text-fg transition-colors hover:bg-line/[0.06]"
              >
                <ExternalLink className="h-4 w-4" /> Live demo
              </a>
            )}
          </div>
        </div>

        {/* Visual */}
        <div className={cn("relative border-t hairline p-4 sm:p-6", featured ? "lg:border-l lg:border-t-0 lg:p-8" : "md:border-l md:border-t-0", flip && "lg:border-l-0 lg:border-r")}>
          <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <div aria-hidden="true" className="relative h-full transition-transform duration-700 ease-out group-hover:scale-[1.015]">
            <Visual />
          </div>
        </div>
      </div>
    </article>
  );
}
