"use client";

import { useRef, useState } from "react";
import { CheckoutCard } from "@/components/blocks/checkout-card";

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** Live demo with a scripted cursor walkthrough (handy for screen-recording reels). */
export default function CheckoutCardDemo() {
  const stage = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [cardKey, setCardKey] = useState(0);

  async function play() {
    if (playing || !stage.current || !cursor.current) return;
    setPlaying(true);
    setCardKey((k) => k + 1); // fresh card
    await wait(50);
    const root = stage.current;
    const c = cursor.current;
    const box = root.getBoundingClientRect();
    const steps: [string, number, number][] = [
      ['[data-slot="plan"]', 0.9, 0.5],
      ['[data-slot="payment"]', 0.85, 0.55],
      ['[data-slot="terms"]', 0.5, 0.5],
      ['[data-slot="confirm"]', 0.8, 0.6],
    ];
    c.style.transition = "none";
    c.style.transform = `translate(${box.width * 0.85}px, ${box.height * 0.95}px)`;
    c.getBoundingClientRect();
    c.style.transition = "";
    c.style.opacity = "1";
    for (const [sel, dx, dy] of steps) {
      const el = root.querySelector<HTMLElement>(sel);
      if (!el) break;
      const r = el.getBoundingClientRect();
      c.style.transform = `translate(${r.left - box.left + r.width * dx}px, ${r.top - box.top + r.height * dy}px)`;
      await wait(750);
      el.setAttribute("data-pressed", "");
      c.style.scale = "0.85";
      await wait(140);
      el.removeAttribute("data-pressed");
      c.style.scale = "1";
      el.click();
      await wait(500);
    }
    await wait(1800);
    c.style.opacity = "0";
    setPlaying(false);
  }

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div ref={stage} className="relative flex w-full justify-center">
        <CheckoutCard key={cardKey} onConfirm={() => wait(600)} />
        <div ref={cursor} aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-10 opacity-0 drop-shadow-[0_6px_6px_rgba(0,0,0,.6)] transition-[transform,opacity,scale] duration-700 ease-[cubic-bezier(.2,.8,.2,1)]">
          <svg viewBox="0 0 24 24" width="34" height="34">
            <path d="M3 2l18 8-8 2.5L10 21z" fill="#1b1b1e" stroke="#555" strokeWidth="1" />
          </svg>
        </div>
      </div>
      {(
        <button type="button" onClick={play} disabled={playing}
          className="tactile-key rounded-lg px-3.5 py-1.5 text-sm">
          {playing ? "Playing…" : "▶ Play demo"}
        </button>
      )}
    </div>
  );
}
