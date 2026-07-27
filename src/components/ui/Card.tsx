import clsx from "clsx";
import type { HTMLAttributes } from "react";

export function Card({
  className,
  glass = false,
  hover = false,
  ...props
}: HTMLAttributes<HTMLDivElement> & { glass?: boolean; hover?: boolean }) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-[var(--color-border)]",
        glass ? "glass" : "bg-[var(--color-card)]",
        hover &&
          "transition-all duration-300 hover:border-[var(--color-accent)]/50 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(20,184,166,0.12)]",
        className
      )}
      {...props}
    />
  );
}
