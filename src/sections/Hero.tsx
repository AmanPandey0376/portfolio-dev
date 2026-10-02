import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Download, Mail } from "lucide-react";
import { useRef } from "react";
import { ButtonLink } from "@/components/Button";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { DevConsole } from "@/components/DevConsole";
import { TechIcon } from "@/components/TechIcon";
import { profile } from "@/data/profile";
import { ease, isTouch } from "@/lib/utils";

const lead = "Building intelligent software".split(" ");
const rest = "that turns complex problems into scalable products.".split(" ");

const dailyStack = [
  { icon: "python", name: "Python" },
  { icon: "react", name: "React" },
  { icon: "typescript", name: "TypeScript" },
  { icon: "fastapi", name: "FastAPI" },
  { icon: "flask", name: "Flask" },
  { icon: "claude", name: "Claude API" },
  { icon: "gemini", name: "Gemini API" },
  { icon: "groq", name: "Groq API" },
  { icon: "sql", name: "SQL" },
  { icon: "pandas", name: "Pandas" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Pointer-reactive glow: write CSS vars directly, no React re-render.
  const onPointerMove = (e: React.PointerEvent) => {
    if (reduce || isTouch() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const fade = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
  });

  let w = 0;
  const word = (text: string, muted: boolean) => {
    const i = w++;
    return (
      <span key={i} className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
        <motion.span
          className={muted ? "inline-block text-muted" : "inline-block text-fg"}
          initial={reduce ? { opacity: 0 } : { y: "110%" }}
          animate={reduce ? { opacity: 1 } : { y: "0%" }}
          transition={{ duration: 0.9, delay: 0.25 + i * 0.045, ease }}
        >
          {text}
        </motion.span>
      </span>
    );
  };

  return (
    <section
      id="home"
      ref={ref}
      onPointerMove={onPointerMove}
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-28 sm:pt-32 lg:flex lg:min-h-[100svh] lg:items-center lg:pt-24"
      style={{ ["--mx" as string]: "70%", ["--my" as string]: "30%" }}
    >
      {/* Background: masked grid + static aura + pointer glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_75%_60%_at_50%_35%,black,transparent_75%)]" />
        <div className="absolute left-1/2 top-[-18rem] h-[36rem] w-[64rem] max-w-[160vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent)/var(--glow-strength)),transparent)]" />
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(520px circle at var(--mx) var(--my), rgb(var(--accent) / calc(var(--glow-strength) * 0.7)), transparent 60%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div className="mx-auto grid w-full max-w-site items-center gap-14 px-5 pb-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:px-8 lg:pb-24">
        <div className="min-w-0">
          <motion.div {...fade(0.05)} className="flex flex-wrap items-center gap-2">
            <span className="chip">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
              {profile.current.title} @ {profile.current.company}
            </span>
          </motion.div>

          <h1 id="hero-title" className="mt-7">
            <motion.span {...fade(0.12)} className="block font-mono text-[0.78rem] tracking-[0.22em] text-muted">
              AMAN PANDEY <span className="mx-1.5 hidden text-subtle sm:inline">/</span>
              <span className="mt-1.5 block text-fg/80 sm:mt-0 sm:inline">Full-Stack Developer • AI Engineer</span>
            </motion.span>
            <span className="mt-5 block text-[2.3rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[3.2rem] lg:text-[3.3rem] xl:text-[3.85rem]">
              {lead.map((t, i) => (
                <span key={`l${i}`}>
                  {word(t, false)}{" "}
                </span>
              ))}
              {rest.map((t, i) => (
                <span key={`r${i}`}>
                  {word(t, true)}
                  {i < rest.length - 1 ? " " : ""}
                </span>
              ))}
            </span>
          </h1>

          <motion.p {...fade(0.7)} className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-muted sm:text-lg">
            {profile.summary}
          </motion.p>

          <motion.div {...fade(0.82)} className="mt-9 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
            <ButtonLink href="#projects" magnetic icon={<ArrowRight className="h-4 w-4" />}>
              View Projects
            </ButtonLink>
            <ButtonLink
              href={profile.links.resume}
              download="Aman_Pandey_Resume.pdf"
              variant="secondary"
              magnetic
              icon={<Download className="h-4 w-4" />}
            >
              Download Resume
            </ButtonLink>
          </motion.div>

          <motion.ul {...fade(0.92)} className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm" aria-label="Profiles">
            <li>
              <a href={profile.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 py-1.5 text-muted transition-colors hover:text-fg">
                <GithubIcon /> GitHub
              </a>
            </li>
            <li>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 py-1.5 text-muted transition-colors hover:text-fg">
                <LinkedinIcon /> LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.links.email} className="inline-flex items-center gap-2 py-1.5 text-muted transition-colors hover:text-fg">
                <Mail className="h-4 w-4" /> Email
              </a>
            </li>
          </motion.ul>
        </div>

        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease }}
          className="relative min-w-0"
        >
          <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(closest-side,rgb(var(--accent)/0.12),transparent)] blur-2xl" />
          <DevConsole />
        </motion.div>

        <motion.div {...fade(1.05)} className="lg:col-span-2">
          <div className="flex flex-col gap-4 border-t hairline pt-6 sm:flex-row sm:items-center sm:gap-8">
            <p className="eyebrow shrink-0">Daily stack</p>
            <ul className="flex flex-wrap items-center gap-x-1 gap-y-1">
              {dailyStack.map((t) => (
                <li key={t.name} className="group relative">
                  <span
                    className="grid h-10 w-10 place-items-center rounded-lg text-subtle transition-colors duration-200 group-hover:bg-line/[0.05] group-hover:text-fg"
                  >
                    <TechIcon name={t.icon} className="h-[1.15rem] w-[1.15rem]" />
                    <span className="sr-only">{t.name}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md border hairline bg-elevated px-2 py-1 font-mono text-2xs text-fg opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    {t.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
