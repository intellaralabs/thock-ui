"use client";

import { Slider as SliderPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** A glowing range in a recessed track, with raised knob thumbs. Pass two values for a range slider. */
export function Slider({
  className,
  value,
  defaultValue,
  min = 0,
  max = 100,
  "aria-label": label,
  ...props
}: ComponentProps<typeof SliderPrimitive.Root>) {
  const thumbs = (value ?? defaultValue ?? [min]).length;
  // The thumbs are the focusable sliders, so they carry the accessible name.
  const thumbLabel = (i: number) =>
    thumbs > 1 ? (label ? `${label} ${i === 0 ? "minimum" : "maximum"}` : i === 0 ? "Minimum" : "Maximum") : label;
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      value={value}
      defaultValue={defaultValue}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-40 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track className="tactile-well relative h-2.5 w-full grow overflow-hidden rounded-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2.5">
        <SliderPrimitive.Range className="absolute rounded-full bg-brand shadow-[0_0_10px_var(--tactile-accent-glow)] data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full" />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbs }, (_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          aria-label={thumbLabel(i)}
          className="tactile-key block size-6 rounded-full outline-offset-2 data-[disabled]:cursor-not-allowed"
        />
      ))}
    </SliderPrimitive.Root>
  );
}
