"use client";

import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function ToggleGroup({ className, ...props }: ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      className={cn(
        "tactile-tray inline-flex gap-2 rounded-2xl p-2 data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    />
  );
}

export function ToggleGroupItem({
  led = false,
  className,
  children,
  ...props
}: ComponentProps<typeof ToggleGroupPrimitive.Item> & { led?: boolean }) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      className={cn(
        "tactile-key inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-xl px-3.5 text-[15px] font-medium [&_svg]:size-[1.1em]",
        className,
      )}
      {...props}
    >
      {led && <span aria-hidden className="tactile-led size-1.5" />}
      {children}
    </ToggleGroupPrimitive.Item>
  );
}
