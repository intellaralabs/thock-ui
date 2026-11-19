import { Slot } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const sizes = {
  sm: "h-9 gap-1.5 rounded-[10px] px-3.5 text-sm",
  md: "h-11 gap-2 rounded-xl px-5 text-[15px]",
  lg: "h-14 gap-2.5 rounded-[14px] px-7 text-base",
  icon: "size-11 rounded-xl",
  "icon-sm": "size-9 rounded-[10px]",
  "icon-lg": "size-14 rounded-[14px]",
};

export type ButtonProps = ComponentProps<"button"> & {
  variant?: "default" | "accent" | "ghost";
  size?: keyof typeof sizes;
  /** Shows a spinner and disables the button. */
  loading?: boolean;
  /** Render the child element (e.g. a Link) with button styles. */
  asChild?: boolean;
};

export function Button({
  variant = "default",
  size = "md",
  loading = false,
  asChild = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="button"
      data-variant={variant === "default" ? undefined : variant}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={cn(
        "tactile-key relative inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap",
        "[&_svg]:size-[1.1em] [&_svg]:shrink-0",
        sizes[size],
        className,
      )}
      {...(asChild ? {} : { type: "button" as const })}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {loading && <Spinner />}
          {children}
        </>
      )}
    </Comp>
  );
}

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="animate-spin" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity=".25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
