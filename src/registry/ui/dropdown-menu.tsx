"use client";

import { DropdownMenu as Menu } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const content =
  "tactile-surface z-50 min-w-48 overflow-hidden rounded-2xl p-1.5 outline-none " +
  "data-[state=open]:animate-tactile-pop-in data-[state=closed]:animate-tactile-pop-out";
const item =
  "relative flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-fg outline-none select-none " +
  "data-[highlighted]:bg-well data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-4 [&_svg]:text-subtle";

export const DropdownMenu = Menu.Root;
export const DropdownMenuTrigger = Menu.Trigger;
export const DropdownMenuGroup = Menu.Group;
export const DropdownMenuSub = Menu.Sub;
export const DropdownMenuRadioGroup = Menu.RadioGroup;

export function DropdownMenuContent({ className, sideOffset = 8, ...props }: ComponentProps<typeof Menu.Content>) {
  return (
    <Menu.Portal>
      <Menu.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(content, "origin-(--radix-dropdown-menu-content-transform-origin)", className)}
        {...props}
      />
    </Menu.Portal>
  );
}

export function DropdownMenuItem({
  className,
  variant = "default",
  ...props
}: ComponentProps<typeof Menu.Item> & { variant?: "default" | "destructive" }) {
  return (
    <Menu.Item
      className={cn(item, variant === "destructive" && "text-brand [&_svg]:text-brand", className)}
      {...props}
    />
  );
}

export function DropdownMenuCheckboxItem({ className, children, ...props }: ComponentProps<typeof Menu.CheckboxItem>) {
  return (
    <Menu.CheckboxItem className={cn(item, "pl-8", className)} {...props}>
      <span className="absolute left-3 flex">
        <span aria-hidden className="tactile-led size-1.5" />
      </span>
      {children}
    </Menu.CheckboxItem>
  );
}

export function DropdownMenuRadioItem({ className, children, ...props }: ComponentProps<typeof Menu.RadioItem>) {
  return (
    <Menu.RadioItem className={cn(item, "pl-8", className)} {...props}>
      <span className="absolute left-3 flex">
        <span aria-hidden className="tactile-led size-1.5" />
      </span>
      {children}
    </Menu.RadioItem>
  );
}

export function DropdownMenuLabel({ className, ...props }: ComponentProps<typeof Menu.Label>) {
  return <Menu.Label className={cn("px-3 pb-1 pt-2 text-xs font-medium text-subtle", className)} {...props} />;
}

export function DropdownMenuSeparator({ className, ...props }: ComponentProps<typeof Menu.Separator>) {
  return <Menu.Separator className={cn("mx-1 my-1.5 h-px bg-line", className)} {...props} />;
}

export function DropdownMenuShortcut({ className, ...props }: ComponentProps<"span">) {
  return <span className={cn("ml-auto pl-4 text-xs tracking-wider text-subtle", className)} {...props} />;
}

export function DropdownMenuSubTrigger({ className, children, ...props }: ComponentProps<typeof Menu.SubTrigger>) {
  return (
    <Menu.SubTrigger className={cn(item, "data-[state=open]:bg-well", className)} {...props}>
      {children}
      <span aria-hidden className="ml-auto text-subtle">›</span>
    </Menu.SubTrigger>
  );
}

export function DropdownMenuSubContent({ className, ...props }: ComponentProps<typeof Menu.SubContent>) {
  return (
    <Menu.Portal>
      <Menu.SubContent
        className={cn(content, "origin-(--radix-dropdown-menu-content-transform-origin)", className)}
        {...props}
      />
    </Menu.Portal>
  );
}
