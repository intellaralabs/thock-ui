import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const inputBase =
  "tactile-well h-11 w-full min-w-0 rounded-xl px-4 text-[15px] text-fg placeholder:text-subtle " +
  "disabled:cursor-not-allowed disabled:opacity-50 " +
  "file:mr-3 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-fg";

export function Input({ className, type = "text", ...props }: ComponentProps<"input">) {
  return <input type={type} data-slot="input" className={cn(inputBase, className)} {...props} />;
}
