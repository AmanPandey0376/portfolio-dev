import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { highlights, stackLayers } from "@/data/profile";
import { cn, ease } from "@/lib/utils";

export function About() {
  const [active, setActive] = useState<string>("intelligence");
  const reduce = useReducedMotion();
  const current = stackLayers.find((l) => l.key === active)!;

  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <SectionHeading id="about-title" index="01" label="About" title="Building across the stack." />
            <Reveal className="mt-8 space-y-5 text-[1.02rem] leading-[1.75] text-muted" delay={0.1}>
              <p>
                I work where <span className="text-fg">product, backend and AI</span> meet. The problems usually start
                messy — finding the right leads, planning inventory, making sense of scattered business data — and the
                goal is software that takes over the repetitive work.
              </p>
              <p>
                In practice that means Python services and REST APIs with <span className="text-fg">FastAPI</span> and{" "}
                <span className="text-fg">Flask</span>, React frontends, SQL databases, and AI agents that call{" "}
                <span className="text-fg">Claude, Gemini and Groq</span> to extract, classify and analyse data.
              </p>
              <p>
                Before building agents, I spent a year on production web work — database tuning, live hotfixes and
                dynamic web forms — which keeps performance and reliability part of every build.
              </p>
            </Reveal>
          </div>

          {/* Interactive stack diagram */}
          <Reveal delay={0.15} className="lg:pt-10">
            <div className="card relative overflow-hidden p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <p className="eyebrow">How the pieces fit</p>
                <p className="font-mono text-2xs text-subtle">select a layer</p>
              </div>
              <div className="mt-5 space-y-2" role="tablist" aria-label="Stack layers">
                {stackLayers.map((layer, i) => {
                  const on = layer.key === active;
                  return (
                    <button
                      key={layer.key}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      aria-controls="layer-detail"
                      onClick={() => setActive(layer.key)}
                      onMouseEnter={() => setActive(layer.key)}
                      onFocus={() => setActive(layer.key)}
                      className={cn(
                        "group relative flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition-[border-color,background-color] duration-300",
                        on ? "border-accent/40 bg-accent/[0.06]" : "hairline bg-line/[0.02] hover:bg-line/[0.04]",
                      )}
                      style={{ marginLeft: `${i * 0.5}rem`, width: `calc(100% - ${i * 0.5}rem)` }}
                    >
                      <span className="flex items-center gap-3">
                        <span className={cn("font-mono text-2xs", on ? "text-accent" : "text-subtle")}>L{i + 1}</span>
                        <span className={cn("text-[0.95rem] font-medium", on ? "text-fg" : "text-fg/80")}>{layer.label}</span>
                      </span>
                      <span className="hidden gap-1.5 min-[400px]:flex">
                        {layer.tools.map((t) => (
                          <span key={t} className="rounded-md border hairline px-1.5 py-0.5 font-mono text-[0.65rem] text-muted">
                            {t}
                          </span>
                        ))}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div id="layer-detail" role="tabpanel" className="mt-5 min-h-[3.5rem] border-t hairline pt-4">
                <motion.p
                  key={current.key}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease }}
                  className="text-sm leading-relaxed text-muted"
                >
                  {current.detail}
                </motion.p>
              </div>
            </div>
          </Reveal>
        </div>

        <ul className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border hairline bg-line/[0.08] sm:grid-cols-6 lg:grid-cols-5">
          {highlights.map((h, i) => (
            <Reveal as="li" key={h.label} delay={0.05 * i} className={cn("bg-bg p-5 sm:p-6 lg:col-span-1", i === 0 && "col-span-2", i < 3 ? "sm:col-span-2" : "sm:col-span-3")}>
              <p className="text-xl font-semibold tracking-[-0.03em] text-fg sm:text-2xl">{h.value}</p>
              <p className="mt-1.5 text-[0.8rem] text-muted">{h.label}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
