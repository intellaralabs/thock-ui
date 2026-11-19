"use client";

import { useState } from "react";

export function CopyButton({ text, className = "" }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className={`tactile-key rounded-md px-2.5 py-1 text-xs ${className}`}
    >
      {copied ? "Copied ✓" : "Copy"}
    </button>
  );
}

/** `html` comes from Shiki on the server; `code` is the raw text for copying. */
export function CodeBlock({
  html,
  code,
  title,
  maxHeight,
}: {
  html: string;
  code: string;
  title?: string;
  maxHeight?: number;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      {title && (
        <div className="flex items-center justify-between border-b border-line px-4 py-2">
          <span className="font-mono text-xs text-subtle">{title}</span>
          <CopyButton text={code} />
        </div>
      )}
      <div className="relative">
        {!title && <CopyButton text={code} className="absolute right-3 top-3 z-10" />}
        <div
          className="overflow-auto p-4 font-mono text-[13px] leading-relaxed"
          style={maxHeight ? { maxHeight } : undefined}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
