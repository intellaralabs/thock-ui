import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** A tiny keycap for shortcuts. */
export function Kbd({ className, ...props }: ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "tactile-key pointer-events-none inline-grid h-6 min-w-6 place-items-center rounded-md px-1.5 font-mono text-[11px] font-medium",
        className,
      )}
      {...props}
    />
  );
}

export function KbdGroup({ className, ...props }: ComponentProps<"span">) {
  return <span data-slot="kbd-group" className={cn("inline-flex items-center gap-1", className)} {...props} />;
}
