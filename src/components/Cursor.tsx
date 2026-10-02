import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * A soft trailing ring that complements (never replaces) the native cursor.
 * Only mounts on fine-pointer, hover-capable devices without reduced motion.
 */
export function Cursor() {
  const enabled = useMediaQuery("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });
  const [mode, setMode] = useState<"idle" | "link" | "card">("idle");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as HTMLElement | null;
      if (t?.closest("[data-cursor='card']")) setMode("card");
      else if (t?.closest("a, button, [role='button'], input, label, summary")) setMode("link");
      else setMode("idle");
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = mode === "card" ? 56 : mode === "link" ? 40 : 26;

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[100] rounded-full border transition-colors duration-200 ${
        mode === "idle" ? "border-fg/25 bg-transparent" : "border-accent/60 bg-accent/[0.07]"
      }`}
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{ width: size, height: size, opacity: visible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    />
  );
}
