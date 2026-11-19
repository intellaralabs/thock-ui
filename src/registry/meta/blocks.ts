import type { RegistryItem } from "../types";
import CheckoutCardDemo from "../examples/checkout-card-demo";
import ProfileCardDemo from "../examples/profile-card-demo";

export const blocks: RegistryItem[] = [
  {
    slug: "checkout-card",
    name: "Checkout Card",
    description:
      "A tactile subscription checkout with raised keys, a sinking plan selector and a payment row that slides in.",
    category: "blocks",
    type: "block",
    files: ["blocks/checkout-card.tsx"],
    examples: [{ title: "Checkout", file: "examples/checkout-card-demo.tsx", Component: CheckoutCardDemo }],
    usage: `import { CheckoutCard } from "@/components/blocks/checkout-card";

<CheckoutCard
  plans={[
    { id: "monthly", name: "Monthly", price: "$9", interval: "month", badge: "Popular" },
    { id: "yearly", name: "Yearly", price: "$90", interval: "year" },
  ]}
  paymentMethod={{ brand: "Visa", last4: "4242" }}
  onAddPaymentMethod={() => openPaymentSheet()}
  onConfirm={async (plan) => {
    await fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ plan: plan.id }) });
  }}
/>`,
    props: [
      { name: "plans", type: "CheckoutPlan[]", default: "Monthly / Yearly", description: "Plans to choose from: id, name, price, interval and an optional badge." },
      { name: "paymentMethod", type: "{ brand: string; last4: string }", default: "Mastercard •••• 8789", description: "Card shown after the user taps “Add payment method”." },
      { name: "onAddPaymentMethod", type: "() => void", description: "Called when the user taps “Add payment method”. Open your own payment sheet here." },
      { name: "onConfirm", type: "(plan) => void | Promise<void>", description: "Called on confirm. A returned promise shows “Processing…”; a rejection re-enables the button." },
      { name: "resetAfter", type: "number", default: "2200", description: "Milliseconds to show the success state before resetting. 0 keeps it." },
      { name: "className", type: "string", description: "Extra classes for the outer tray." },
    ],
    keyboard: [
      { keys: "Tab", description: "Moves between plans, payment, terms and confirm." },
      { keys: "Enter / Space", description: "Selects the focused plan or toggles the focused control." },
    ],
  },
  {
    slug: "profile-card",
    name: "Profile Card",
    description: "A creator card: avatar with status, bio, tag caps, stat wells and follow/message keys.",
    category: "blocks",
    type: "block",
    files: ["blocks/profile-card.tsx"],
    registryDependencies: ["avatar", "badge", "button"],
    examples: [{ title: "Profile", file: "examples/profile-card-demo.tsx", Component: ProfileCardDemo }],
    usage: `import { ProfileCard } from "@/components/blocks/profile-card";

<ProfileCard name="Ada" handle="@ada" stats={[{ label: "Followers", value: 1200 }]} onFollowChange={follow} />`,
    props: [
      { name: "name / handle / bio", type: "string", description: "Copy." },
      { name: "avatar / initials", type: "string", description: "Image URL and fallback." },
      { name: "status", type: '"online" | "away" | "busy" | "offline"', default: '"online"', description: "Avatar LED." },
      { name: "tags", type: "string[]", description: "Tag caps." },
      { name: "stats", type: "{ label; value }[]", description: "Numbers are shown compact (48.2K)." },
      { name: "onFollowChange / onMessage", type: "callbacks", description: "Key handlers." },
    ],
  },
];
