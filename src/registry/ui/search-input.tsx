"use client";

import { useRef, useState, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type SearchInputProps = Omit<ComponentProps<"input">, "type" | "onChange"> & {
  onValueChange?: (value: string) => void;
  /** Shortcut hint shown on the right, e.g. "⌘K". */
  shortcut?: string;
};

export function SearchInput({
  className,
  value,
  defaultValue = "",
  onValueChange,
  shortcut,
  placeholder = "Search…",
  ...props
}: SearchInputProps) {
  const [inner, setInner] = useState(String(defaultValue));
  const current = value !== undefined ? String(value) : inner;
  const ref = useRef<HTMLInputElement>(null);

  const set = (v: string) => {
    if (value === undefined) setInner(v);
    onValueChange?.(v);
  };

  return (
    <div data-slot="search-input" className={cn("tactile-well flex h-11 w-full items-center gap-2.5 rounded-xl pl-3.5 pr-1.5", className)}>
      <svg viewBox="0 0 24 24" className="size-4 flex-none text-subtle" fill="none" stroke="currentColor" strokeWidth={2}
        strokeLinecap="round" aria-hidden>
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </svg>
      <input
        ref={ref}
        type="search"
        value={current}
        placeholder={placeholder}
        onChange={(e) => set(e.target.value)}
        onKeyDown={(e) => e.key === "Escape" && current && (e.preventDefault(), set(""))}
        className="min-w-0 flex-1 bg-transparent text-[15px] text-fg outline-none placeholder:text-subtle [&::-webkit-search-cancel-button]:hidden"
        {...props}
      />
      {current ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            set("");
            ref.current?.focus();
          }}
          className="tactile-key grid size-7 flex-none place-items-center rounded-lg text-xs"
        >
          ✕
        </button>
      ) : (
        shortcut && <kbd className="tactile-key pointer-events-none rounded-md px-2 py-0.5 font-sans text-xs">{shortcut}</kbd>
      )}
    </div>
  );
}
