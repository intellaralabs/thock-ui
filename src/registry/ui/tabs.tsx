"use client";

import { Tabs as TabsPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Tabs({ className, ...props }: ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-4 data-[orientation=vertical]:flex-row", className)}
      {...props}
    />
  );
}

/** A tray holding the tab keys. The active tab rises as a lit key. */
export function TabsList({ className, ...props }: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "tactile-tray inline-flex w-fit gap-1.5 rounded-2xl p-1.5",
        "data-[orientation=vertical]:flex-col data-[orientation=vertical]:self-start",
        className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger({
  led = false,
  className,
  children,
  ...props
}: ComponentProps<typeof TabsPrimitive.Trigger> & { led?: boolean }) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex h-9 items-center justify-center gap-2 rounded-xl px-3.5 text-sm font-medium text-subtle outline-none transition-colors",
        "hover:text-fg focus-visible:ring-2 focus-visible:ring-(--tactile-focus) disabled:pointer-events-none disabled:opacity-40",
        "data-[state=active]:tactile-key data-[state=active]:text-key-fg",
        "[&_svg]:size-4",
        className,
      )}
      {...props}
    >
      {led && <span aria-hidden className="tactile-led size-1.5" />}
      {children}
    </TabsPrimitive.Trigger>
  );
}

export function TabsContent({ className, ...props }: ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "outline-none focus-visible:ring-2 focus-visible:ring-(--tactile-focus) data-[state=active]:animate-tactile-fade-in",
        className,
      )}
      {...props}
    />
  );
}
