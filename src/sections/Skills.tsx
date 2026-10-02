import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Dialog } from "@/components/Dialog";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TechIcon } from "@/components/TechIcon";
import { categoryLabel, skillCategories, skills, type Skill, type SkillCategory } from "@/data/skills";
import { cn, ease } from "@/lib/utils";

const shortLabel: Record<SkillCategory, string> = {
  frontend: "Frontend",
  backend: "Backend",
  ai: "AI / LLM",
  database: "Database",
  data: "Data",
  languages: "Language",
  tools: "Tools",
};

export function Skills() {
  const [filter, setFilter] = useState<"all" | SkillCategory>("all");
  const [selected, setSelected] = useState<Skill | null>(null);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const close = useCallback(() => setOpen(false), []);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: skills.length };
    for (const s of skills) for (const cat of s.categories) c[cat] = (c[cat] ?? 0) + 1;
    return c;
  }, []);

  const visible = filter === "all" ? skills : skills.filter((s) => s.categories.includes(filter));

  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="skills-title"
            index="02"
            label="Skills"
            title="Tools I Build With"
            subtitle="A practical stack spanning product development, backend systems, AI, data, and automation. Select any tool to see how it's used."
          />
        </div>

        {/* Filters */}
        <Reveal className="relative mt-10">
          <LayoutGroup id="skill-filters">
            <div
              role="tablist"
              aria-label="Filter skills by category"
              className="no-scrollbar -mx-5 flex gap-1 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
            >
              {skillCategories.map((c) => {
                const on = filter === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls="skill-grid"
                    onClick={() => setFilter(c.id)}
                    className={cn(
                      "relative shrink-0 rounded-full px-3.5 py-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] transition-colors duration-200",
                      on ? "text-fg" : "text-subtle hover:text-fg",
                    )}
                  >
                    {on && (
                      <motion.span
                        layoutId="skill-filter-pill"
                        className="absolute inset-0 rounded-full border border-accent/35 bg-accent/[0.08]"
                        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative">
                      {c.label}
                      <span className={cn("ml-1.5", on ? "text-accent" : "text-subtle/70")}>{counts[c.id]}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </Reveal>

        {/* Grid */}
        <motion.ul
          id="skill-grid"
          role="tabpanel"
          aria-label={`${filter === "all" ? "All" : categoryLabel[filter]} skills`}
          layout={!reduce}
          className="skill-grid mt-6 grid grid-cols-2 gap-2.5 min-[480px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((s) => (
              <motion.li
                key={s.id}
                layout={!reduce}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, ease }}
                className="skill-card"
              >
                <button
                  type="button"
                  onClick={() => {
                    setSelected(s);
                    setOpen(true);
                  }}
                  data-cursor="card"
                  aria-haspopup="dialog"
                  aria-label={`${s.name} — ${s.categories.map((c) => shortLabel[c]).join(", ")}. View details`}
                  className="group relative flex h-[7.25rem] w-full flex-col justify-between overflow-hidden rounded-xl border hairline bg-surface p-4 text-left transition-[transform,border-color,background-color,opacity] duration-300 ease-out hover:-translate-y-[3px] hover:border-accent/30 focus-visible:-translate-y-[3px]"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <span className="flex items-start justify-between">
                    <span className="grid h-9 w-9 place-items-center rounded-lg border hairline bg-line/[0.03] text-fg/80 transition-[transform,color] duration-300 group-hover:scale-110 group-hover:text-fg">
                      <TechIcon name={s.icon} className="h-[1.1rem] w-[1.1rem]" />
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 translate-y-1 text-subtle opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                  </span>
                  <span>
                    <span className="block truncate text-[0.9rem] font-medium text-fg">{s.name}</span>
                    <span className="mt-0.5 block truncate font-mono text-[0.65rem] uppercase tracking-[0.1em] text-subtle">
                      {s.categories
                        .slice(0, 2)
                        .map((c) => shortLabel[c])
                        .join(" / ")}
                    </span>
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <Dialog open={open} onClose={close} labelledBy="skill-dialog-title" size="sm">
        {selected && (
          <div className="p-6 pt-7 sm:p-7">
            <div className="flex items-center gap-4 pr-10">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border hairline-strong bg-line/[0.04] text-fg">
                <TechIcon name={selected.icon} className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <p className="eyebrow">Technology</p>
                <h3 id="skill-dialog-title" className="mt-1 text-xl font-semibold tracking-[-0.02em] text-fg">
                  {selected.name}
                </h3>
              </div>
            </div>

            <dl className="mt-6 space-y-5">
              <div>
                <dt className="eyebrow">Category</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {selected.categories.map((c) => (
                    <span key={c} className="chip">
                      {categoryLabel[c]}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">How Aman uses it</dt>
                <dd className="mt-2 text-[0.95rem] leading-relaxed text-fg/90">{selected.usage}</dd>
              </div>
              {selected.seenIn && (
                <div>
                  <dt className="eyebrow">Seen in</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {selected.seenIn.map((x) => (
                      <span key={x} className="rounded-md border hairline bg-line/[0.03] px-2 py-1 text-xs text-muted">
                        {x}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        )}
      </Dialog>
    </section>
  );
}
