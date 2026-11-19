"use client";

import { Switch as SwitchPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const sizes = {
  sm: { root: "h-7 w-[52px]", thumb: "h-5 w-7 data-[state=checked]:translate-x-[18px]", led: "left-2.5 size-1.5" },
  md: { root: "h-10 w-[76px]", thumb: "h-8 w-10 data-[state=checked]:translate-x-7", led: "left-3.5 size-2" },
};

/** A raised knob sliding in a recessed well, with an indicator light when on. */
export function Switch({
  size = "md",
  className,
  ...props
}: ComponentProps<typeof SwitchPrimitive.Root> & { size?: keyof typeof sizes }) {
  const s = sizes[size];
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "tactile-well group relative inline-flex flex-none cursor-pointer items-center rounded-full p-1",
        "disabled:cursor-not-allowed disabled:opacity-50",
        s.root,
        className,
      )}
      {...props}
    >
      <span aria-hidden className={cn("tactile-led absolute top-1/2 -translate-y-1/2", s.led)} />
      <SwitchPrimitive.Thumb
        className={cn(
          "relative flex items-center justify-center gap-[3px] rounded-full transition-transform duration-300 ease-tactile",
          "bg-linear-to-b from-(--tactile-key-from) to-(--tactile-key-to) group-active:scale-95",
          "shadow-[inset_0_1px_0_var(--tactile-key-highlight),inset_0_-2px_0_var(--tactile-key-inner-edge),0_3px_0_var(--tactile-key-edge),0_6px_10px_var(--tactile-shadow)]",
          s.thumb,
        )}
      >
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-[40%] w-px rounded-full bg-(--tactile-key-inner-edge)" />
        ))}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
}
