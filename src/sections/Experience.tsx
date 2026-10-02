import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ChevronDown, MapPin } from "lucide-react";
import { useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { experience } from "@/data/experience";
import { cn, ease } from "@/lib/utils";

export function Experience() {
  const [openId, setOpenId] = useState<string | null>(experience[0].id);
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
        <SectionHeading
          id="experience-title"
          index="03"
          label="Experience"
          title="Where the work happened."
          subtitle="From production web systems to AI agents that support real business decisions."
        />

        <ol ref={listRef} className="relative mt-14 space-y-6 sm:mt-16">
          {/* rail */}
          <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-line/10 md:left-[calc(11rem+7px)]" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: reduce ? 1 : progress }}
            className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-accent via-accent/70 to-accent/10 md:left-[calc(11rem+7px)]"
          />

          {experience.map((job, i) => {
            const open = openId === job.id;
            return (
              <Reveal as="li" key={job.id} delay={i * 0.08} className="relative pl-8 md:grid md:grid-cols-[11rem_1fr] md:gap-0 md:pl-0">
                {/* date column (desktop) */}
                <div className="hidden pr-8 pt-5 text-right md:block">
                  <p className="font-mono text-xs text-fg/80">
                    {job.start.split(" ")[1]} — {job.end === "Present" ? "Present" : job.end.split(" ")[1]}
                  </p>
                  <p className="mt-1 font-mono text-2xs text-subtle">
                    {job.start} – {job.end}
                  </p>
                </div>

                {/* node */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-0 top-[1.45rem] grid h-[15px] w-[15px] place-items-center rounded-full border bg-bg md:left-[11rem]",
                    job.current ? "border-accent" : "border-line/30",
                  )}
                >
                  <span className={cn("h-[5px] w-[5px] rounded-full", job.current ? "bg-accent" : "bg-line/40")} />
                </span>

                <div className="md:pl-10">
                  <div className={cn("card transition-colors duration-300", open && "border-line/[0.14]")}>
                    <h3>
                      <button
                        type="button"
                        aria-expanded={open}
                        aria-controls={`job-${job.id}`}
                        onClick={() => setOpenId(open ? null : job.id)}
                        className="group flex w-full items-start justify-between gap-4 rounded-2xl p-5 text-left sm:p-6"
                      >
                        <span className="min-w-0">
                          <span className="font-mono text-2xs text-subtle md:hidden">
                            {job.start} – {job.end}
                          </span>
                          <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 md:mt-0">
                            <span className="text-lg font-semibold tracking-[-0.02em] text-fg sm:text-xl">{job.title}</span>
                            {job.current && (
                              <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/30 bg-signal/10 px-2 py-0.5 font-mono text-[0.65rem] text-signal">
                                <span className="h-1.5 w-1.5 rounded-full bg-signal" /> Current
                              </span>
                            )}
                          </span>
                          <span className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                            <span className="text-fg/85">{job.company}</span>
                            <span className="inline-flex items-center gap-1 text-subtle">
                              <MapPin className="h-3.5 w-3.5" /> {job.location}
                            </span>
                          </span>
                          <span className="mt-3 block text-[0.95rem] leading-relaxed text-muted">{job.summary}</span>
                          {job.points.some((p) => p.metric) && (
                            <span className="mt-3 flex flex-wrap gap-2">
                              {job.points
                                .filter((p) => p.metric)
                                .map((p) => (
                                  <span
                                    key={p.metric}
                                    className="rounded-md border border-accent/30 bg-accent/[0.08] px-2 py-1 font-mono text-[0.7rem] text-accent"
                                  >
                                    {p.metric}
                                  </span>
                                ))}
                            </span>
                          )}
                        </span>
                        <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border hairline text-muted transition-colors group-hover:text-fg">
                          <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", open && "rotate-180")} />
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          id={`job-${job.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: reduce ? 0 : 0.4, ease }}
                          className="overflow-hidden"
                        >
                          <div className="border-t hairline px-5 pb-6 pt-5 sm:px-6">
                            <ul className="space-y-3">
                              {job.points.map((p) => (
                                <li key={p.text} className="flex gap-3 text-[0.94rem] leading-relaxed text-muted">
                                  <span className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-accent/80" aria-hidden="true" />
                                  <span>{p.text}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-5 flex flex-wrap gap-1.5">
                              {job.stack.map((s) => (
                                <span key={s} className="chip">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
