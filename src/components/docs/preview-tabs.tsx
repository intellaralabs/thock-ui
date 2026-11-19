"use client";

import { useState, type ReactNode } from "react";

export function Tabs({ tabs }: { tabs: { label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div role="tablist" className="mb-3 flex gap-1 border-b border-line">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`-mb-px border-b-2 px-3 py-2 text-sm transition-colors ${
              active === i ? "border-fg text-fg" : "border-transparent text-subtle hover:text-fg"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {/* keep panels mounted so demos keep their state while you peek at the code */}
      {tabs.map((t, i) => (
        <div key={t.label} role="tabpanel" hidden={active !== i}>
          {t.content}
        </div>
      ))}
    </div>
  );
}

export function Stage({ children, compact }: { children: ReactNode; compact?: boolean }) {
  return (
    <div
      className={`tactile-stage flex items-center justify-center overflow-hidden rounded-2xl border border-line px-4 ${
        compact ? "min-h-[280px] py-10" : "min-h-[440px] py-12"
      }`}
    >
      {children}
    </div>
  );
}
