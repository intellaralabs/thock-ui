import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "info" | "success" | "warning" | "error";

const color: Record<Variant, string> = {
  info: "var(--tactile-muted)",
  success: "var(--tactile-success)",
  warning: "var(--tactile-warning)",
  error: "var(--tactile-accent)",
};

/** An inline message panel. The LED colour carries the status. */
export function Alert({
  variant = "info",
  icon,
  className,
  children,
  ...props
}: ComponentProps<"div"> & { variant?: Variant; icon?: ReactNode }) {
  return (
    <div
      role={variant === "error" || variant === "warning" ? "alert" : "status"}
      data-slot="alert"
      data-variant={variant}
      className={cn("tactile-tray relative flex w-full gap-3 rounded-2xl p-4 text-sm text-fg", className)}
      style={{ "--alert": color[variant] } as React.CSSProperties}
      {...props}
    >
      <span className="tactile-well grid size-9 flex-none place-items-center rounded-xl text-(--alert) [&_svg]:size-4">
        {icon ?? <span className="tactile-led size-2" data-on style={{ background: "var(--alert)", boxShadow: "0 0 10px var(--alert)" }} />}
      </span>
      <div className="grid flex-1 gap-1 pt-0.5">{children}</div>
    </div>
  );
}

export function AlertTitle({ className, ...props }: ComponentProps<"p">) {
  return <p data-slot="alert-title" className={cn("font-semibold leading-tight", className)} {...props} />;
}

export function AlertDescription({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="alert-description" className={cn("leading-relaxed text-subtle", className)} {...props} />;
}
