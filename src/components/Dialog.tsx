import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn, ease } from "@/lib/utils";

type Props = {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  /** "lg" = project detail (full-screen sheet on mobile), "sm" = compact panel (bottom sheet on mobile) */
  size?: "sm" | "lg";
};

const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

/** Accessible dialog: portal, focus trap, Escape + backdrop close, scroll lock, focus restore. */
export function Dialog({ open, onClose, labelledBy, children, size = "lg" }: Props) {
  const panel = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const t = window.setTimeout(() => panel.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus(), 30);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const nodes = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((n) => n.offsetParent !== null);
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!panel.current.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [open, onClose]);

  const lg = size === "lg";

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className={cn("fixed inset-0 z-[80] flex justify-center", lg ? "items-stretch sm:items-center sm:p-6" : "items-end sm:items-center sm:p-6")}>
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            aria-hidden="true"
          />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            className={cn(
              "relative flex w-full flex-col overflow-hidden border hairline-strong bg-surface shadow-[0_40px_120px_-20px_rgb(0_0_0/0.7)]",
              lg
                ? "h-[100dvh] sm:h-auto sm:max-h-[min(88vh,56rem)] sm:max-w-4xl sm:rounded-2xl"
                : "max-h-[85dvh] rounded-t-2xl sm:max-w-md sm:rounded-2xl",
            )}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: lg ? 24 : 40, scale: lg ? 0.985 : 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: lg ? 16 : 40, scale: lg ? 0.99 : 1 }}
            transition={{ duration: 0.4, ease }}
          >
            <button
              type="button"
              onClick={onClose}
              data-autofocus
              aria-label="Close"
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full border hairline bg-surface/80 text-muted backdrop-blur transition-colors hover:text-fg"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="overflow-y-auto overscroll-contain">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
