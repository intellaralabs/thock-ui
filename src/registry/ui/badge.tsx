import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Status = "success" | "warning" | "error" | "neutral";
const led: Record<Status, string> = {
  success: "var(--tactile-success)",
  warning: "var(--tactile-warning)",
  error: "var(--tactile-accent)",
  neutral: "var(--tactile-muted)",
};

export type BadgeProps = ComponentProps<"span"> & {
  /** key: a small raised cap. accent: a lit cap. well: recessed. */
  variant?: "key" | "accent" | "well";
  /** Adds a status LED. */
  status?: Status;
};

export function Badge({ variant = "key", status, className, children, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      data-variant={variant === "accent" ? "accent" : undefined}
      className={cn(
        "pointer-events-none inline-flex h-6 items-center gap-1.5 rounded-md px-2 text-xs font-semibold whitespace-nowrap [&_svg]:size-3",
        variant === "well" ? "tactile-well text-fg" : "tactile-key",
        className,
      )}
      {...props}
    >
      {status && (
        <span
          aria-hidden
          className="tactile-led size-1.5"
          data-on
          style={{ background: led[status], boxShadow: `0 0 6px ${led[status]}` }}
        />
      )}
      {children}
    </span>
  );
}
