import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { cn, isTouch } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-fg text-bg hover:bg-fg/90 shadow-[0_1px_0_0_rgb(255_255_255/0.25)_inset,0_8px_30px_-10px_rgb(var(--accent)/0.6)]",
  secondary: "border hairline-strong bg-line/[0.03] text-fg hover:bg-line/[0.07] hover:border-line/25",
  ghost: "text-muted hover:text-fg hover:bg-line/[0.05]",
};

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  icon?: ReactNode;
  magnetic?: boolean;
  size?: "md" | "sm";
};

/** Link-styled button. Magnetic pull is desktop-only and disabled for reduced motion. */
export function ButtonLink({ variant = "primary", icon, magnetic = false, size = "md", className, children, ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 20, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 20, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (!magnetic || reduce || isTouch() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.18);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn(
        "group inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,border-color,color,box-shadow] duration-200",
        size === "md" ? "h-11 px-5 text-sm" : "h-9 px-3.5 text-[0.8125rem]",
        variants[variant],
        className,
      )}
      {...(rest as object)}
    >
      {children}
      {icon && <span className="transition-transform duration-300 ease-out group-hover:translate-x-0.5">{icon}</span>}
    </motion.a>
  );
}
