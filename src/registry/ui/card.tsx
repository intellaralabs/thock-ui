import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** A panel. `tray` is the dark recessed console; `surface` is a flat raised sheet. */
export function Card({ variant = "tray", className, ...props }: ComponentProps<"div"> & { variant?: "tray" | "surface" }) {
  return (
    <div
      data-slot="card"
      className={cn(variant === "tray" ? "tactile-tray" : "tactile-surface", "flex flex-col gap-5 rounded-3xl p-6 text-fg", className)}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card-header" className={cn("grid gap-1.5", className)} {...props} />;
}

export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
  return <h3 data-slot="card-title" className={cn("text-lg font-semibold leading-tight", className)} {...props} />;
}

export function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return <p data-slot="card-description" className={cn("text-sm text-subtle", className)} {...props} />;
}

export function CardContent({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("grid gap-4", className)} {...props} />;
}

export function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card-footer" className={cn("flex items-center gap-3", className)} {...props} />;
}
