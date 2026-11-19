import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** A pulsing recessed placeholder. Size it with classes. */
export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return <div aria-hidden data-slot="skeleton" className={cn("animate-pulse rounded-lg bg-well", className)} {...props} />;
}
