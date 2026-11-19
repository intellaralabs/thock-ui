"use client";

import { useState, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function PasswordInput({ className, disabled, ...props }: Omit<ComponentProps<"input">, "type">) {
  const [visible, setVisible] = useState(false);
  return (
    <div
      data-slot="password-input"
      className={cn("tactile-well flex h-11 w-full items-center rounded-xl pl-4 pr-1.5", disabled && "opacity-50", className)}
    >
      <input
        type={visible ? "text" : "password"}
        disabled={disabled}
        autoComplete="current-password"
        className="min-w-0 flex-1 bg-transparent text-[15px] text-fg outline-none placeholder:text-subtle disabled:cursor-not-allowed"
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        disabled={disabled}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        className="tactile-key grid size-8 flex-none place-items-center rounded-lg"
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2}
          strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          {visible ? (
            <>
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
              <circle cx="12" cy="12" r="3" />
            </>
          ) : (
            <>
              <path d="M10.7 5.1A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-2.2 3.2M6.6 6.6A16.6 16.6 0 0 0 2 12s3.5 7 10 7a9.8 9.8 0 0 0 5.4-1.6" />
              <path d="M2 2l20 20M9.9 9.9a3 3 0 0 0 4.2 4.2" />
            </>
          )}
        </svg>
      </button>
    </div>
  );
}
