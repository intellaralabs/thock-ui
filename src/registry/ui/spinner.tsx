import { cn } from "@/lib/utils";

export type SpinnerProps = {
  variant?: "ring" | "leds" | "dots";
  size?: number;
  className?: string;
  /** Accessible label. */
  label?: string;
};

/** Loading indicators: a spinning ring, a chasing LED circle, or bouncing dots. */
export function Spinner({ variant = "ring", size = 24, className, label = "Loading" }: SpinnerProps) {
  return (
    <span role="status" aria-label={label} data-slot="spinner" className={cn("inline-grid place-items-center", className)} style={{ width: size, height: size }}>
      {variant === "ring" && (
        <span
          className="block size-full animate-spin rounded-full border-[3px] border-(--tactile-led-off) border-t-brand"
          style={{ filter: "drop-shadow(0 0 3px var(--tactile-accent-glow))" }}
        />
      )}
      {variant === "leds" && (
        <span className="relative block size-full">
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i / 8) * Math.PI * 2;
            const d = size * 0.18;
            return (
              <span
                key={i}
                className="tactile-led absolute animate-pulse"
                data-on
                style={{
                  width: d,
                  height: d,
                  left: `calc(50% + ${(Math.cos(a) * (size / 2 - d / 2)).toFixed(2)}px - ${d / 2}px)`,
                  top: `calc(50% + ${(Math.sin(a) * (size / 2 - d / 2)).toFixed(2)}px - ${d / 2}px)`,
                  animationDelay: `${(i * 0.125).toFixed(3)}s`,
                  animationDuration: "1s",
                }}
              />
            );
          })}
        </span>
      )}
      {variant === "dots" && (
        <span className="flex items-center gap-[15%]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="tactile-led animate-bounce"
              data-on
              style={{ width: size * 0.22, height: size * 0.22, animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </span>
      )}
    </span>
  );
}
