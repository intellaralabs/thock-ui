import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type ButtonGroupProps = ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical";
};

/** Seats a set of buttons in a shared recessed tray. */
export function ButtonGroup({ orientation = "horizontal", className, ...props }: ButtonGroupProps) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(
        "tactile-tray inline-flex gap-2 rounded-2xl p-2",
        orientation === "vertical" && "flex-col",
        className,
      )}
      {...props}
    />
  );
}
