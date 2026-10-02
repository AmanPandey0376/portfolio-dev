import { useReducedMotion } from "motion/react";
import { CornerDownLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { answer, bootSequence, commands, quickQuestions } from "@/data/console";
import { cn, isTouch } from "@/lib/utils";

type Line = { kind: "cmd" | "out" | "answer"; text: string };

const PROMPT = "aman@portfolio";

function run(input: string): Line[] | "clear" {
  const raw = input.trim();
  if (!raw) return [];
  const [head, ...rest] = raw.split(/\s+/);
  const cmd = head.toLowerCase();
  if (cmd === "clear") return "clear";
  if (cmd === "ask") {
    const q = rest.join(" ");
    return q ? [{ kind: "answer", text: answer(q) }] : [{ kind: "out", text: "usage: ask <question>" }];
  }
  if (commands[cmd]) return commands[cmd].map((text) => ({ kind: "out" as const, text }));
  // Anything that reads like a question goes to the local knowledge base.
  if (raw.includes(" ") || raw.endsWith("?")) return [{ kind: "answer", text: answer(raw) }];
  return [{ kind: "out", text: `command not found: ${cmd} — try 'help'` }];
}

/**
 * Hero storytelling element: types a short boot sequence, then becomes a tiny
 * interactive shell with an offline "ask about Aman" knowledge base.
 */
export function DevConsole({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState<string | null>(null);
  const [booted, setBooted] = useState(false);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState(-1);
  const scroller = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Boot sequence
  useEffect(() => {
    if (reduce) {
      setLines(bootSequence.flatMap((b) => [{ kind: "cmd" as const, text: b.cmd }, ...b.out.map((t) => ({ kind: "out" as const, text: t }))]));
      setBooted(true);
      return;
    }
    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) => new Promise<void>((r) => timers.push(window.setTimeout(r, ms)));

    (async () => {
      await wait(900);
      for (const step of bootSequence) {
        for (let i = 1; i <= step.cmd.length; i++) {
          if (cancelled) return;
          setTyping(step.cmd.slice(0, i));
          await wait(55);
        }
        await wait(160);
        if (cancelled) return;
        setTyping(null);
        setLines((l) => [...l, { kind: "cmd", text: step.cmd }, ...step.out.map((t) => ({ kind: "out" as const, text: t }))]);
        await wait(380);
      }
      if (!cancelled) setBooted(true);
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [reduce]);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, typing]);

  const submit = (text: string) => {
    const result = run(text);
    if (text.trim()) setHistory((h) => [text, ...h].slice(0, 20));
    setHIndex(-1);
    setValue("");
    if (result === "clear") return setLines([]);
    setLines((l) => [...l, { kind: "cmd", text }, ...result]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const i = Math.min(hIndex + 1, history.length - 1);
      setHIndex(i);
      setValue(history[i]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = hIndex - 1;
      setHIndex(Math.max(i, -1));
      setValue(i >= 0 ? history[i] : "");
    }
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border hairline-strong bg-surface/80 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.6)] backdrop-blur",
        className,
      )}
      onClick={() => booted && !isTouch() && inputRef.current?.focus({ preventScroll: true })}
    >
      {/* header */}
      <div className="flex items-center justify-between border-b hairline px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-signal animate-pulse-soft" aria-hidden="true" />
          <span className="font-mono text-2xs text-muted">~/aman — console</span>
        </div>
        <span className="font-mono text-2xs text-subtle">type “help”</span>
      </div>

      {/* output */}
      <div
        ref={scroller}
        className="h-[15.5rem] overflow-y-auto px-4 py-4 font-mono text-[0.78rem] leading-[1.7] sm:h-[17rem] sm:text-[0.8rem]"
        role="log"
        aria-live="polite"
        aria-label="Console output"
      >
        {lines.map((l, i) =>
          l.kind === "cmd" ? (
            <div key={i} className="flex gap-2 text-fg">
              <span className="shrink-0 text-accent">$</span>
              <span className="break-words">{l.text}</span>
            </div>
          ) : (
            <div
              key={i}
              className={cn(
                "whitespace-pre-wrap break-words pl-4",
                l.kind === "answer" ? "my-1 border-l border-accent/40 pl-3 text-fg/90" : "text-muted",
              )}
            >
              {l.text}
            </div>
          ),
        )}
        {typing !== null && (
          <div className="flex gap-2 text-fg">
            <span className="text-accent">$</span>
            <span>
              {typing}
              <span className="ml-px inline-block h-[1.05em] w-[0.5em] translate-y-[0.15em] bg-fg/70 animate-blink" />
            </span>
          </div>
        )}
      </div>

      {/* input */}
      <form
        className={cn("border-t hairline transition-opacity duration-500", booted ? "opacity-100" : "pointer-events-none opacity-0")}
        onSubmit={(e) => {
          e.preventDefault();
          submit(value);
        }}
      >
        <label htmlFor="console-input" className="sr-only">
          Type a console command or ask a question about Aman
        </label>
        <div className="flex items-center gap-2 px-4 py-2.5">
          <span className="hidden font-mono text-2xs text-subtle sm:inline">{PROMPT}</span>
          <span className="font-mono text-sm text-accent" aria-hidden="true">›</span>
          <input
            ref={inputRef}
            id="console-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            spellCheck={false}
            placeholder="ask what ai experience?"
            tabIndex={booted ? 0 : -1}
            className="min-w-0 flex-1 bg-transparent font-mono text-base text-fg placeholder:text-subtle focus:outline-none sm:text-[0.8rem]"
          />
          <button
            type="submit"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-subtle transition-colors hover:bg-line/[0.06] hover:text-fg"
            aria-label="Run command"
            tabIndex={booted ? 0 : -1}
          >
            <CornerDownLeft className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="no-scrollbar flex gap-1.5 overflow-x-auto px-4 pb-3">
          {quickQuestions.map((q) => (
            <button
              key={q}
              type="button"
              tabIndex={booted ? 0 : -1}
              onClick={(e) => {
                e.stopPropagation();
                submit(`ask ${q}`);
              }}
              className="shrink-0 rounded-full border hairline bg-line/[0.03] px-2.5 py-1 font-mono text-2xs text-muted transition-colors hover:border-accent/40 hover:text-fg"
            >
              {q}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}
