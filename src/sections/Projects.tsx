import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useCallback, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { projectFilters, projects, type Project, type ProjectFilter } from "@/data/projects";
import { cn, ease } from "@/lib/utils";

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const close = useCallback(() => setOpen(false), []);
  const onOpen = useCallback((p: Project) => {
    setSelected(p);
    setOpen(true);
  }, []);

  const visible = filter === "all" ? projects : projects.filter((p) => p.filters.includes(filter));

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgb(var(--accent)/0.07),transparent)]" />
      <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="projects-title"
            index="04"
            label="Projects"
            title="Selected Work"
            subtitle="Projects where software engineering meets AI, automation, and real-world problem solving."
          />
          <Reveal>
            <LayoutGroup id="project-filters">
              <div role="tablist" aria-label="Filter projects" className="no-scrollbar -mx-5 flex gap-1 overflow-x-auto px-5 sm:mx-0 sm:px-0">
                {projectFilters.map((f) => {
                  const on = filter === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      aria-controls="project-list"
                      onClick={() => setFilter(f.id)}
                      className={cn(
                        "relative shrink-0 rounded-full px-3.5 py-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] transition-colors",
                        on ? "text-fg" : "text-subtle hover:text-fg",
                      )}
                    >
                      {on && (
                        <motion.span
                          layoutId="project-filter-pill"
                          className="absolute inset-0 rounded-full border border-accent/35 bg-accent/[0.08]"
                          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative">{f.label}</span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </Reveal>
        </div>

        <motion.ul id="project-list" role="tabpanel" layout={!reduce} className="mt-12 space-y-6 sm:mt-14">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p) => (
              <motion.li
                key={p.id}
                layout={!reduce}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease }}
              >
                <Reveal y={28}>
                  <ProjectCard project={p} index={projects.indexOf(p)} onOpen={onOpen} flip={p.id === "roadmap"} />
                </Reveal>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <ProjectModal project={selected} open={open} onClose={close} />
    </section>
  );
}
