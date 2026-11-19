"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type CheckoutPlan = {
  id: string;
  name: string;
  price: string;
  interval: string;
  badge?: string;
};

export type CheckoutPaymentMethod = { brand: string; last4: string };

export type CheckoutCardProps = {
  plans?: CheckoutPlan[];
  /** Shown after the user taps "Add payment method". */
  paymentMethod?: CheckoutPaymentMethod;
  /** Called when the user taps "Add payment method" (open your own payment sheet here). */
  onAddPaymentMethod?: () => void;
  /** Called on confirm. Return a promise to keep the button busy until it resolves. */
  onConfirm?: (plan: CheckoutPlan) => void | Promise<void>;
  /** Milliseconds to show the success state before resetting. 0 keeps it. */
  resetAfter?: number;
  className?: string;
};

const DEFAULT_PLANS: CheckoutPlan[] = [
  { id: "monthly", name: "Monthly", price: "14.99€", interval: "month", badge: "Popular" },
  { id: "yearly", name: "Yearly", price: "149.99€", interval: "year" },
];

function Socket({ on, solid }: { on: boolean; solid?: boolean }) {
  return (
    <span aria-hidden className="tactile-well grid size-[34px] flex-none place-items-center rounded-full">
      <span
        className={cn(
          "grid size-[22px] place-items-center rounded-full transition-transform duration-300 ease-tactile",
          "shadow-[0_0_8px_var(--tactile-accent-glow)]",
          solid ? "bg-brand text-brand-fg" : "bg-brand/40 text-brand",
          on ? "scale-100" : "scale-0",
        )}
      >
        <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={3}
          strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 12.5l4 4 8-9" />
        </svg>
      </span>
    </span>
  );
}

export function CheckoutCard({
  plans = DEFAULT_PLANS,
  paymentMethod = { brand: "Mastercard", last4: "8789" },
  onAddPaymentMethod,
  onConfirm,
  resetAfter = 2200,
  className,
}: CheckoutCardProps) {
  const [planId, setPlanId] = useState<string | null>(null);
  const [hasPayment, setHasPayment] = useState(false);
  const [terms, setTerms] = useState(false);
  const [status, setStatus] = useState<"idle" | "busy" | "done">("idle");

  const plan = plans.find((p) => p.id === planId) ?? null;
  const ready = !!plan && hasPayment && terms && status === "idle";
  const locked = status !== "idle";

  function reset() {
    setPlanId(null);
    setHasPayment(false);
    setTerms(false);
    setStatus("idle");
  }

  async function confirm() {
    if (!ready || !plan) return;
    setStatus("busy");
    try {
      await onConfirm?.(plan);
      setStatus("done");
      if (resetAfter > 0) setTimeout(reset, resetAfter);
    } catch {
      setStatus("idle");
    }
  }

  const key = "tactile-key flex w-full items-center gap-3 rounded-[14px] px-[18px] py-3.5 text-left";

  return (
    <div role="group" aria-label="Choose a plan and pay"
      className={cn("tactile-tray grid w-full max-w-[420px] gap-3 rounded-[26px] p-3.5", className)}>
      <div role="radiogroup" aria-label="Plan" className="grid gap-3">
        {plans.map((p) => {
          const on = p.id === planId;
          return (
            <button key={p.id} type="button" role="radio" aria-checked={on} disabled={locked}
              data-slot="plan" data-selected={on || undefined} data-sunk={(plan && !on) || undefined}
              onClick={() => setPlanId(on ? null : p.id)}
              className={cn(key, "min-h-16 disabled:opacity-100")}>
              <span className="min-w-0 flex-1">
                <span className="block text-[17px] font-semibold">{p.name}</span>
                <span className="mt-0.5 block text-sm italic text-subtle">{p.price} / {p.interval}</span>
              </span>
              {p.badge && (
                <span className="tactile-well rounded-full px-4 py-1.5 text-sm text-subtle">{p.badge}</span>
              )}
              <Socket on={on} />
            </button>
          );
        })}
      </div>

      <button type="button" aria-pressed={hasPayment} disabled={locked} data-slot="payment"
        onClick={() => {
          if (!hasPayment) onAddPaymentMethod?.();
          setHasPayment(!hasPayment);
        }}
        className={cn(key, "min-h-[54px] disabled:opacity-100")}>
        <span className="relative h-[22px] flex-1 overflow-hidden text-[15px] text-subtle">
          <span className={cn("absolute inset-0 flex items-center justify-between transition-all duration-500 ease-tactile",
            hasPayment && "-translate-y-full opacity-0")}>
            Add payment method <span aria-hidden>+</span>
          </span>
          <span className={cn("absolute inset-0 flex items-center justify-between transition-all duration-500 ease-tactile",
            !hasPayment && "translate-y-full opacity-0")}>
            {paymentMethod.brand}
            <span><span className="tracking-[2px]">••••</span> {paymentMethod.last4}</span>
          </span>
        </span>
      </button>

      <div className="grid grid-cols-[110px_1fr] gap-3">
        <button type="button" aria-label="Accept terms and conditions" disabled={locked} data-slot="terms"
          onClick={() => setTerms(!terms)}
          className={cn(key, "min-h-[72px] justify-center text-[15px] disabled:opacity-100")}>
          {terms ? <Socket on solid /> : <span className="text-subtle">T&amp;C</span>}
        </button>

        <button type="button" aria-disabled={!ready} data-slot="confirm" onClick={confirm}
          data-variant={ready || status === "busy" ? "accent" : undefined}
          className={cn(key, "min-h-[72px] justify-center text-base font-medium",
            !ready && status === "idle" && "cursor-not-allowed text-subtle",
            status === "done" && "text-success")}>
          <span aria-live="polite">
            {status === "done" ? "Paid ✓"
              : status === "busy" ? "Processing…"
              : plan ? `Confirm and pay ${plan.price}` : "Confirm"}
          </span>
        </button>
      </div>
    </div>
  );
}
