"use client";

import { Accordion as AccordionPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Accordion({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("tactile-tray grid gap-1.5 rounded-3xl p-2", className)}
      {...props}
    />
  );
}

export function AccordionItem({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("rounded-2xl transition-colors data-[state=open]:bg-surface/60", className)}
      {...props}
    />
  );
}

export function AccordionTrigger({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex flex-1 items-center justify-between gap-4 rounded-2xl px-4 py-3.5 text-left text-[15px] font-medium text-fg outline-none",
          "focus-visible:ring-2 focus-visible:ring-(--tactile-focus) disabled:opacity-40",
          className,
        )}
        {...props}
      >
        <span className="flex items-center gap-3">
          <span aria-hidden className="tactile-led size-1.5" />
          {children}
        </span>
        <span aria-hidden className="tactile-key grid size-7 flex-none place-items-center rounded-lg">
          <svg viewBox="0 0 24 24" className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180"
            fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-sm text-subtle data-[state=closed]:animate-tactile-collapse data-[state=open]:animate-tactile-expand"
      {...props}
    >
      <div className={cn("px-4 pb-4 pl-[2.1rem] leading-relaxed", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
