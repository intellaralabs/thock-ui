import { cn } from "@/lib/utils";

/** Marks paid items in the sidebar, index and page headers. */
export function ProBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "tactile-well rounded px-1.5 py-px text-[10px] font-semibold uppercase tracking-wide text-fg",
        className,
      )}
    >
      Pro
    </span>
  );
}
