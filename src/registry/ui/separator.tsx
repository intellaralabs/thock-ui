"use client";

import { Separator as SeparatorPrimitive } from "radix-ui";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const groove =
  "bg-[linear-gradient(var(--tactile-tray-inset),var(--tactile-tray-inset))_0_0/100%_1px_no-repeat,linear-gradient(var(--tactile-highlight),var(--tactile-highlight))_0_1px/100%_1px_no-repeat]";
const grooveV =
  "bg-[linear-gradient(var(--tactile-tray-inset),var(--tactile-tray-inset))_0_0/1px_100%_no-repeat,linear-gradient(var(--tactile-highlight),var(--tactile-highlight))_1px_0/1px_100%_no-repeat]";

/** An engraved groove: a dark line with a highlight under it. Pass a label to centre text in it. */
export function Separator({
  orientation = "horizontal",
  decorative = true,
  label,
  className,
  ...props
}: ComponentProps<typeof SeparatorPrimitive.Root> & { label?: ReactNode }) {
  if (label && orientation === "horizontal") {
    return (
      <div data-slot="separator" className={cn("flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-subtle", className)}>
        <span className={cn("h-0.5 flex-1", groove)} />
        {label}
        <span className={cn("h-0.5 flex-1", groove)} />
      </div>
    );
  }
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "flex-none",
        orientation === "horizontal" ? cn("h-0.5 w-full", groove) : cn("h-full w-0.5 self-stretch", grooveV),
        className,
      )}
      {...props}
    />
  );
}
