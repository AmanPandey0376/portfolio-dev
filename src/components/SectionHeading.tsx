import { motion, useReducedMotion } from "motion/react";
import { Fragment, type ReactNode } from "react";
import { cn, ease } from "@/lib/utils";

type Props = {
  index: string;
  label: string;
  title: string;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
  id?: string;
};

export function SectionHeading({ index, label, title, subtitle, align = "left", className, id }: Props) {
  const reduce = useReducedMotion();
  const words = title.split(" ");

  return (
    <header className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <motion.p
        className={cn("eyebrow flex items-center gap-3", align === "center" && "justify-center")}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-accent">{index}</span>
        <span className="h-px w-8 bg-line/20" aria-hidden="true" />
        <span>{label}</span>
      </motion.p>
      <h2 id={id} className="mt-4 text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.035em] text-fg sm:text-[2.6rem] lg:text-[3rem]">
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-bottom">
              <motion.span
                className="inline-block"
                initial={reduce ? { opacity: 0 } : { y: "105%" }}
                whileInView={reduce ? { opacity: 1 } : { y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.04 * i, ease }}
              >
                {w}
              </motion.span>
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </h2>
      {subtitle && (
        <motion.p
          className="mt-4 text-pretty text-[0.98rem] leading-relaxed text-muted sm:text-base"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
        >
          {subtitle}
        </motion.p>
      )}
    </header>
  );
}
