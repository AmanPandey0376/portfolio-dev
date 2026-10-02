import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { FileText, Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navItems, profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/useActiveSection";
import type { Theme } from "@/hooks/useTheme";
import { cn, ease } from "@/lib/utils";
import { GithubIcon, Logo } from "./BrandIcons";

const ids = navItems.map((n) => n.id);

export function Navbar({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: () => void }) {
  const active = useActiveSection(ids);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock scroll, close on Escape, close when resizing to desktop.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const mql = window.matchMedia("(min-width: 1024px)");
    const onMql = () => mql.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mql.addEventListener("change", onMql);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      mql.removeEventListener("change", onMql);
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[70]"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled || open ? "border-b hairline bg-bg/75 backdrop-blur-xl backdrop-saturate-150" : "border-b border-transparent",
        )}
      >
        <nav aria-label="Primary" className="mx-auto flex h-16 max-w-site items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-2.5 rounded-lg" onClick={() => setOpen(false)}>
            <Logo />
            <span className="font-mono text-[0.78rem] font-medium tracking-[0.2em] text-fg">AMAN PANDEY</span>
          </a>

          <ul className="hidden items-center gap-0.5 rounded-full border hairline bg-surface/60 p-1 lg:flex">
            {navItems.map((item) => (
              <li key={item.id} className="relative">
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "relative z-10 block rounded-full px-3.5 py-1.5 text-[0.8125rem] transition-colors duration-200",
                    active === item.id ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {item.label}
                </a>
                {active === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full border hairline-strong bg-line/[0.06]"
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-line/[0.06] hover:text-fg"
            >
              {theme === "dark" ? <Sun className="h-[1.05rem] w-[1.05rem]" /> : <Moon className="h-[1.05rem] w-[1.05rem]" />}
            </button>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="hidden h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-line/[0.06] hover:text-fg sm:grid"
            >
              <GithubIcon className="h-[1.05rem] w-[1.05rem]" />
            </a>
            <a
              href={profile.links.resume}
              download="Aman_Pandey_Resume.pdf"
              className="ml-1 hidden h-9 items-center gap-1.5 rounded-full border hairline-strong bg-line/[0.04] px-3.5 text-[0.8125rem] font-medium text-fg transition-colors hover:bg-line/[0.08] sm:inline-flex"
            >
              <FileText className="h-3.5 w-3.5" /> Resume
            </a>
            <button
              ref={menuButton}
              type="button"
              className="relative ml-1 grid h-10 w-10 place-items-center rounded-full text-fg hover:bg-line/[0.06] lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span
                className={cn(
                  "absolute h-[1.5px] w-[18px] rounded bg-current transition-transform duration-300 ease-out",
                  open ? "rotate-45" : "-translate-y-[4px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-[1.5px] w-[18px] rounded bg-current transition-transform duration-300 ease-out",
                  open ? "-rotate-45" : "translate-y-[4px]",
                )}
              />
            </button>
          </div>
        </nav>

        <motion.div
          className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-accent/70"
          style={{ scaleX: progress }}
          aria-hidden="true"
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 flex flex-col bg-bg/95 px-5 pb-8 pt-20 backdrop-blur-xl sm:px-6 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className="flex flex-col">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i + 0.05, duration: 0.45, ease }}
                  className="border-b hairline"
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-4 text-[1.6rem] font-medium tracking-[-0.03em] text-fg"
                    aria-current={active === item.id ? "true" : undefined}
                  >
                    {item.label}
                    <span className={cn("font-mono text-2xs", active === item.id ? "text-accent" : "text-subtle")}>
                      0{i + 1}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="mt-auto grid grid-cols-2 gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <a
                href={profile.links.resume}
                download="Aman_Pandey_Resume.pdf"
                className="flex h-12 items-center justify-center gap-2 rounded-full bg-fg text-sm font-medium text-bg"
              >
                <FileText className="h-4 w-4" /> Resume
              </a>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="flex h-12 items-center justify-center gap-2 rounded-full border hairline-strong text-sm font-medium text-fg"
              >
                <GithubIcon /> GitHub
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
