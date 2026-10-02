import { useInView, useReducedMotion } from "motion/react";
import { Check, Search, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { siCoursera, siGithub, siKaggle, siUdemy, siYoutube } from "simple-icons";
import { cn } from "@/lib/utils";

/** Steps through `count` states while visible; holds the final state for reduced motion. */
function useStepper(count: number, interval: number, holdLast = 2) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? count - 1 : 0);

  useEffect(() => {
    if (reduce) {
      setStep(count - 1);
      return;
    }
    if (!inView) return;
    let s = 0;
    let hold = 0;
    setStep(0);
    const id = window.setInterval(() => {
      if (s >= count - 1) {
        if (++hold > holdLast) {
          s = 0;
          hold = 0;
          setStep(0);
        }
        return;
      }
      s += 1;
      setStep(s);
    }, interval);
    return () => window.clearInterval(id);
  }, [inView, reduce, count, interval, holdLast]);

  return { ref, step };
}

function Frame({ children, label, status, className }: { children: React.ReactNode; label: string; status: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative flex h-full flex-col overflow-hidden rounded-xl border hairline bg-bg/70", className)}>
      <div className="flex items-center justify-between gap-3 border-b hairline px-4 py-2.5">
        <span className="truncate font-mono text-2xs text-muted">{label}</span>
        <span className="shrink-0 font-mono text-2xs">{status}</span>
      </div>
      <div className="relative flex-1 p-4 sm:p-5">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Lead Generation Agent — six pipeline stages that mirror the repo's  */
/* SSE stream, plus an abstract lead grid that fills as stages finish. */
/* ------------------------------------------------------------------ */

const leadStages = [
  { key: "analyzing", label: "Analyze" },
  { key: "searching", label: "Discover" },
  { key: "extracting", label: "Extract" },
  { key: "enriching", label: "Enrich" },
  { key: "validating", label: "Validate" },
  { key: "saving", label: "Store" },
  { key: "done", label: "Outreach" },
];

export function LeadGenVisual() {
  const { ref, step } = useStepper(leadStages.length, 1100);
  const done = step === leadStages.length - 1;

  return (
    <div ref={ref} className="h-full">
      <Frame
        label="POST /api/generate-leads · text/event-stream"
        status={
          <span className={cn("inline-flex items-center gap-1.5", done ? "text-signal" : "text-accent")}>
            <span className={cn("h-1.5 w-1.5 rounded-full", done ? "bg-signal" : "bg-accent animate-pulse-soft")} />
            {done ? "complete" : leadStages[step].key}
          </span>
        }
      >
        {/* stage track */}
        <ol className="relative grid grid-cols-7 gap-1" aria-label="Agent pipeline stages">
          <span aria-hidden="true" className="absolute left-[7%] right-[7%] top-[11px] h-px bg-line/10" />
          <span
            aria-hidden="true"
            className="absolute left-[7%] top-[11px] h-px bg-accent transition-[width] duration-700 ease-out"
            style={{ width: `${(step / (leadStages.length - 1)) * 86}%` }}
          />
          {leadStages.map((s, i) => {
            const state = i < step ? "done" : i === step ? "active" : "idle";
            return (
              <li key={s.key} className="relative flex flex-col items-center gap-2">
                <span
                  className={cn(
                    "relative grid h-[22px] w-[22px] place-items-center rounded-full border text-[0.6rem] transition-all duration-500",
                    state === "done" && "border-accent/60 bg-accent text-accent-fg",
                    state === "active" && "border-accent bg-bg text-accent shadow-[0_0_0_4px_rgb(var(--accent)/0.15)]",
                    state === "idle" && "border-line/20 bg-bg text-subtle",
                  )}
                >
                  {state === "done" ? <Check className="h-3 w-3" strokeWidth={3} /> : i + 1}
                </span>
                <span
                  className={cn(
                    "font-mono text-[0.58rem] uppercase tracking-[0.06em] transition-colors sm:text-[0.62rem]",
                    state === "idle" ? "text-subtle/70" : "text-fg/85",
                    state !== "active" && "max-[420px]:invisible",
                  )}
                >
                  {s.label}
                </span>
              </li>
            );
          })}
        </ol>

        {/* abstract lead grid */}
        <div className="mt-5 overflow-hidden rounded-lg border hairline">
          <div className="grid grid-cols-[1.3fr_1fr_1fr_auto] gap-3 border-b hairline bg-line/[0.03] px-3 py-2 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-subtle">
            <span>Company</span>
            <span>Segment</span>
            <span>Contact</span>
            <span className="w-[4.5rem] text-right">Status</span>
          </div>
          {[0, 1, 2, 3].map((row) => {
            const visible = step >= 2 + Math.min(row, 1); // rows appear at "Extract"
            const enriched = step >= 3;
            const valid = step >= 4;
            return (
              <div
                key={row}
                className={cn(
                  "grid grid-cols-[1.3fr_1fr_1fr_auto] items-center gap-3 px-3 py-2.5 transition-opacity duration-500",
                  row < 3 && "border-b hairline",
                  visible ? "opacity-100" : "opacity-25",
                )}
              >
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 shrink-0 rounded bg-line/10" />
                  <span className="h-1.5 rounded-full bg-fg/25" style={{ width: `${70 - row * 9}%` }} />
                </span>
                <span className="h-1.5 rounded-full bg-line/15" style={{ width: `${55 + row * 8}%` }} />
                <span
                  className={cn("h-1.5 rounded-full transition-colors duration-500", enriched ? "bg-accent/50" : "bg-line/10")}
                  style={{ width: `${80 - row * 10}%` }}
                />
                <span className="flex w-[4.5rem] justify-end">
                  <span
                    className={cn(
                      "rounded-full border px-1.5 py-0.5 font-mono text-[0.55rem] transition-colors duration-500",
                      valid ? "border-signal/30 bg-signal/10 text-signal" : enriched ? "border-accent/30 text-accent" : "hairline text-subtle",
                    )}
                  >
                    {valid ? "valid" : enriched ? "enriched" : visible ? "raw" : "—"}
                  </span>
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[0.62rem] text-subtle">
          <span className="inline-flex items-center gap-1.5 rounded-md border hairline px-2 py-1">
            <Sparkles className="h-3 w-3 text-accent" /> Claude
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md border hairline px-2 py-1">
            <Search className="h-3 w-3" /> Search + Maps
          </span>
          <span className="rounded-md border hairline px-2 py-1">PostgreSQL dedupe</span>
          <span className="rounded-md border hairline px-2 py-1">.xlsx export</span>
        </div>
      </Frame>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Learning Roadmap Generator — goal → Groq → roadmap + 5 sources      */
/* ------------------------------------------------------------------ */

const platforms = [
  { name: "YouTube", icon: siYoutube },
  { name: "GitHub", icon: siGithub },
  { name: "Udemy", icon: siUdemy },
  { name: "Coursera", icon: siCoursera },
  { name: "Kaggle", icon: siKaggle },
];

const modules = ["Fundamentals", "Intermediate", "Advanced", "Capstone project"];

function Connector({ on }: { on: boolean }) {
  return (
    <div className="flex justify-center py-1.5" aria-hidden="true">
      <svg width="2" height="18" className="overflow-visible">
        <line x1="1" y1="0" x2="1" y2="18" stroke="rgb(var(--line) / 0.15)" strokeWidth="1" />
        <line
          x1="1" y1="0" x2="1" y2="18"
          stroke="rgb(var(--accent))"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          className={cn("transition-opacity duration-500", on ? "animate-dash-flow opacity-100" : "opacity-0")}
        />
      </svg>
    </div>
  );
}

export function RoadmapVisual() {
  // 0 goal · 1 groq · 2 roadmap + sources · 3..7 platforms resolve · 8 ranked · 9 result
  const { ref, step } = useStepper(10, 650, 4);

  const node = (on: boolean) =>
    cn(
      "rounded-lg border px-3 py-2 transition-[border-color,background-color,color] duration-500",
      on ? "border-accent/40 bg-accent/[0.07] text-fg" : "hairline bg-line/[0.02] text-subtle",
    );

  return (
    <div ref={ref} className="h-full">
      <Frame
        label="POST /api/roadmap · groq"
        status={
          step >= 9 ? (
            <span className="inline-flex items-center gap-1.5 text-signal">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" /> roadmap ready
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-soft" /> generating
            </span>
          )
        }
      >
        <div className="flex flex-col">
          <div className={cn(node(true), "flex items-center justify-between gap-3")}>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-subtle">Goal</span>
            <span className="truncate text-[0.82rem] font-medium">React Developer</span>
          </div>
          <Connector on={step >= 1} />
          <div className={cn(node(step >= 1), "flex items-center justify-between gap-3")}>
            <span className="inline-flex items-center gap-2 text-[0.82rem] font-medium">
              <Sparkles className="h-3.5 w-3.5 text-accent" /> Groq AI
            </span>
            <span className="truncate font-mono text-[0.6rem] text-subtle">llama-3.1-8b-instant</span>
          </div>
          <Connector on={step >= 2} />

          <div className="grid grid-cols-2 gap-2.5">
            <div className={cn(node(step >= 2), "py-2.5")}>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-subtle">Roadmap</p>
              <ol className="mt-2 space-y-1.5">
                {modules.map((m, i) => (
                  <li key={m} className="flex items-center gap-2 text-[0.72rem]">
                    <span
                      className={cn(
                        "h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-500",
                        step >= 2 + i ? "bg-accent" : "bg-line/20",
                      )}
                    />
                    <span className={cn("truncate transition-colors duration-500", step >= 2 + i ? "text-fg/90" : "text-subtle")}>{m}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className={cn(node(step >= 2), "py-2.5")}>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-subtle">Sources · concurrent</p>
              <ul className="mt-2 grid grid-cols-5 gap-1 min-[400px]:gap-1.5">
                {platforms.map((p, i) => {
                  const on = step >= 3 + i;
                  return (
                    <li key={p.name} title={p.name} className="flex flex-col items-center gap-1">
                      <span
                        className={cn(
                          "grid aspect-square w-full max-w-[2rem] place-items-center rounded-md border transition-all duration-500",
                          on ? "border-accent/40 bg-accent/10 text-fg" : "hairline text-subtle/60",
                        )}
                      >
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                          <path d={p.icon.path} />
                        </svg>
                      </span>
                      <span className="sr-only">{p.name}</span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-2 font-mono text-[0.6rem] text-subtle">
                {Math.max(0, Math.min(5, step - 2))}/5 fetched
              </p>
            </div>
          </div>

          <Connector on={step >= 8} />
          <div className={cn(node(step >= 8), "flex items-center justify-between gap-3")}>
            <span className="text-[0.82rem] font-medium">Rank &amp; filter</span>
            <span className="truncate font-mono text-[0.6rem] text-subtle">AI ranker · URL validation</span>
          </div>
          <Connector on={step >= 9} />
          <div
            className={cn(
              "flex items-center justify-between gap-3 rounded-lg border px-3 py-2 transition-colors duration-500",
              step >= 9 ? "border-signal/30 bg-signal/[0.08] text-fg" : "hairline text-subtle",
            )}
          >
            <span className="text-[0.82rem] font-medium">Personalised roadmap</span>
            <Check className={cn("h-4 w-4 transition-opacity", step >= 9 ? "text-signal opacity-100" : "opacity-0")} />
          </div>
        </div>
      </Frame>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MovieDiary — endpoints + a response body                            */
/* ------------------------------------------------------------------ */

const endpoints = [
  { method: "POST", path: "/movies/", tone: "text-signal" },
  { method: "GET", path: "/movies/", tone: "text-accent" },
  { method: "DELETE", path: "/movies/{id}", tone: "text-[#F28B82]" },
];

export function MovieDiaryVisual() {
  return (
    <Frame label="Movie Diary API · /docs" status={<span className="text-subtle">FastAPI · SQLite</span>}>
      <ul className="space-y-1.5">
        {endpoints.map((e) => (
          <li key={e.method} className="flex items-center gap-3 rounded-md border hairline bg-line/[0.02] px-3 py-2 font-mono text-[0.7rem]">
            <span className={cn("w-12 shrink-0 font-semibold", e.tone)}>{e.method}</span>
            <span className="truncate text-fg/85">{e.path}</span>
          </li>
        ))}
      </ul>
      <pre className="mt-3 overflow-hidden rounded-md border hairline bg-line/[0.02] p-3 font-mono text-[0.66rem] leading-[1.65] text-muted">
        <span className="text-subtle">{"// 200 · response"}</span>
        {"\n{\n  "}
        <span className="text-accent">"id"</span>: <span className="text-fg">1</span>,{"\n  "}
        <span className="text-accent">"title"</span>: <span className="text-fg">"The Shawshank Redemption"</span>,{"\n  "}
        <span className="text-accent">"genre"</span>: <span className="text-fg">"Drama"</span>,{"\n  "}
        <span className="text-accent">"watch_date"</span>: <span className="text-fg">"2025-11-06"</span>,{"\n  "}
        <span className="text-accent">"image_path"</span>: <span className="text-fg">"static/images/…"</span>
        {"\n}"}
      </pre>
    </Frame>
  );
}

export const projectVisuals = {
  leadgen: LeadGenVisual,
  roadmap: RoadmapVisual,
  moviediary: MovieDiaryVisual,
} as const;
