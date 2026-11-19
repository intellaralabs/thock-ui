"use client";

import { Avatar as AvatarPrimitive } from "radix-ui";
import { Children, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Status = "online" | "away" | "busy" | "offline";
const statusColor: Record<Status, string> = {
  online: "var(--tactile-success)",
  away: "var(--tactile-warning)",
  busy: "var(--tactile-accent)",
  offline: "var(--tactile-led-off)",
};

const sizes = { sm: "size-8 text-xs", md: "size-11 text-sm", lg: "size-16 text-lg" };

export type AvatarProps = ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: keyof typeof sizes;
  /** Adds a status LED in the corner. */
  status?: Status;
};

/** A round key holding a photo or initials. */
export function Avatar({ size = "md", status, className, children, ...props }: AvatarProps) {
  return (
    <span data-slot="avatar" className={cn("relative inline-flex flex-none", sizes[size], className)}>
      <AvatarPrimitive.Root className="tactile-key pointer-events-none size-full overflow-hidden rounded-full p-0.5" {...props}>
        {children}
      </AvatarPrimitive.Root>
      {status && (
        <span
          role="img"
          aria-label={status}
          className="absolute -bottom-0.5 -right-0.5 grid size-[32%] min-h-2.5 min-w-2.5 place-items-center rounded-full bg-bg"
        >
          <span
            className="tactile-led size-[70%]"
            data-on={status !== "offline" || undefined}
            style={status === "offline" ? undefined : { background: statusColor[status], boxShadow: `0 0 6px ${statusColor[status]}` }}
          />
        </span>
      )}
    </span>
  );
}

export function AvatarImage({ className, ...props }: ComponentProps<typeof AvatarPrimitive.Image>) {
  return <AvatarPrimitive.Image className={cn("size-full rounded-full object-cover", className)} {...props} />;
}

export function AvatarFallback({ className, ...props }: ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      className={cn("grid size-full place-items-center rounded-full font-semibold uppercase", className)}
      {...props}
    />
  );
}

/** Overlapping avatars. Anything past `max` collapses into a "+N" key. */
export function AvatarGroup({
  max,
  size = "md",
  className,
  children,
  ...props
}: ComponentProps<"div"> & { max?: number; size?: keyof typeof sizes }) {
  const all = Children.toArray(children);
  const shown = max ? all.slice(0, max) : all;
  const rest = all.length - shown.length;
  return (
    <div data-slot="avatar-group" className={cn("flex items-center -space-x-3 [&>*]:ring-4 [&>*]:ring-bg [&>*]:rounded-full", className)} {...props}>
      {shown}
      {rest > 0 && (
        <span
          className={cn("tactile-key pointer-events-none grid flex-none place-items-center rounded-full font-semibold tabular-nums", sizes[size])}
          aria-label={`${rest} more`}
        >
          +{rest}
        </span>
      )}
    </div>
  );
}
