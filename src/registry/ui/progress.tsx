"use client";

import { Progress as ProgressPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type ProgressProps = ComponentProps<typeof ProgressPrimitive.Root> & {
  /** Render as a row of LED segments instead of a smooth bar. */
  segments?: number;
};

/** A glowing bar in a recessed track. Pass value={null} for indeterminate. */
export function Progress({ value, max = 100, segments, className, ...props }: ProgressProps) {
  const pct = value == null ? null : Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      max={max}
      className={cn("tactile-well relative h-3 w-full overflow-hidden rounded-full p-0.5", segments && "h-auto rounded-lg p-1", className)}
      {...props}
    >
      {segments ? (
        <div className="flex gap-1">
          {Array.from({ length: segments }, (_, i) => (
            <span
              key={i}
              className="tactile-led h-2.5 flex-1 rounded-[3px]"
              data-on={pct != null && (i + 1) / segments <= pct / 100 + 1e-9 ? true : undefined}
            />
          ))}
        </div>
      ) : (
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full rounded-full bg-linear-to-r from-(--tactile-accent) to-(--tactile-accent-from) shadow-[0_0_10px_var(--tactile-accent-glow)] transition-[width] duration-500",
            pct == null && "w-1/3 animate-tactile-indeterminate",
          )}
          style={pct == null ? undefined : { width: `${pct}%` }}
        />
      )}
    </ProgressPrimitive.Root>
  );
}
