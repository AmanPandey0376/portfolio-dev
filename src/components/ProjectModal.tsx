import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, Check, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import type { Project } from "@/data/projects";
import { cn, ease } from "@/lib/utils";
import { GithubIcon } from "./BrandIcons";
import { Dialog } from "./Dialog";
import { projectVisuals } from "./ProjectVisuals";

type Props = { project: Project | null; open: boolean; onClose: () => void };

function Block({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={className}>
      <h4 className="eyebrow">{title}</h4>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Architecture({ project }: { project: Project }) {
  const [active, setActive] = useState(project.architecture[0].id);
  const reduce = useReducedMotion();
  useEffect(() => setActive(project.architecture[0].id), [project]);
  const node = project.architecture.find((n) => n.id === active) ?? project.architecture[0];

  return (
    <div>
      <ol className="flex flex-col items-stretch gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-y-2" aria-label="Architecture flow">
        {project.architecture.map((n, i) => {
          const on = n.id === active;
          return (
            <li key={n.id} className="flex flex-col items-stretch sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => setActive(n.id)}
                onMouseEnter={() => setActive(n.id)}
                aria-pressed={on}
                className={cn(
                  "rounded-lg border px-3 py-2 text-left transition-[border-color,background-color] duration-300",
                  on ? "border-accent/50 bg-accent/[0.09]" : "hairline bg-line/[0.02] hover:bg-line/[0.05]",
                )}
              >
                <span className={cn("block text-[0.82rem] font-medium", on ? "text-fg" : "text-fg/80")}>{n.label}</span>
                <span className="block font-mono text-[0.62rem] text-subtle">{n.sub}</span>
              </button>
              {i < project.architecture.length - 1 && (
                <span className="flex justify-center py-0.5 text-subtle sm:px-1.5 sm:py-0" aria-hidden="true">
                  <ArrowDown className="h-3.5 w-3.5 sm:hidden" />
                  <ArrowRight className="hidden h-3.5 w-3.5 sm:block" />
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <div className="mt-4 rounded-lg border hairline bg-bg/60 p-4" aria-live="polite">
        <motion.p
          key={node.id}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease }}
          className="text-sm leading-relaxed text-muted"
        >
          <span className="font-medium text-fg">{node.label}.</span> {node.detail}
        </motion.p>
      </div>
    </div>
  );
}

export function ProjectModal({ project, open, onClose }: Props) {
  if (!project) return null;
  const Visual = projectVisuals[project.id];

  return (
    <Dialog open={open} onClose={onClose} labelledBy="project-title" size="lg">
      <article>
        <header className="border-b hairline p-6 pr-16 sm:p-8 sm:pr-20">
          <p className="eyebrow">{project.category}</p>
          <h3 id="project-title" className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-fg sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-1.5 text-sm text-muted">{project.tagline}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-fg px-4 text-sm font-medium text-bg hover:bg-fg/90"
            >
              <GithubIcon /> View on GitHub
            </a>
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full border hairline-strong px-4 text-sm text-fg hover:bg-line/[0.06]"
              >
                <ExternalLink className="h-4 w-4" /> Live demo
              </a>
            )}
          </div>
        </header>

        <div className="space-y-9 p-6 sm:p-8">
          <div className="grid gap-8 md:grid-cols-2">
            <Block title="Problem">
              <p className="text-[0.95rem] leading-relaxed text-muted">{project.problem}</p>
            </Block>
            <Block title="Solution">
              <p className="text-[0.95rem] leading-relaxed text-muted">{project.solution}</p>
            </Block>
          </div>

          <Block title="Architecture · select a node">
            <Architecture project={project} />
          </Block>

          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
            <Block title="Key features">
              <ul className="space-y-2.5">
                {project.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-[0.92rem] leading-snug text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </Block>
            <div className="min-w-0" aria-hidden="true">
              <Visual />
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Block title="Performance / Results">
              <ul className="space-y-2.5">
                {project.results.map((r) => (
                  <li key={r.label} className="flex items-baseline gap-3 text-[0.92rem] text-muted">
                    {r.value ? (
                      <span className="w-12 shrink-0 font-semibold text-fg">{r.value}</span>
                    ) : (
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    )}
                    <span>{r.label}</span>
                  </li>
                ))}
              </ul>
            </Block>
            <Block title="Technology stack">
              <ul className="flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            </Block>
          </div>
        </div>
      </article>
    </Dialog>
  );
}
