"use client";

import { Toggle as TogglePrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const sizes = {
  sm: "h-9 gap-1.5 rounded-[10px] px-3 text-sm",
  md: "h-11 gap-2 rounded-xl px-4 text-[15px]",
  lg: "h-14 gap-2.5 rounded-[14px] px-6 text-base",
};

export type ToggleProps = ComponentProps<typeof TogglePrimitive.Root> & {
  size?: keyof typeof sizes;
  /** Show an indicator light that glows while pressed. */
  led?: boolean;
};

export function Toggle({ size = "md", led = false, className, children, ...props }: ToggleProps) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(
        "tactile-key inline-flex items-center justify-center font-medium [&_svg]:size-[1.1em]",
        sizes[size],
        className,
      )}
      {...props}
    >
      {led && <span aria-hidden className="tactile-led size-1.5" />}
      {children}
    </TogglePrimitive.Root>
  );
}
