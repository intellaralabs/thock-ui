// Change the name/handle here and it updates across the whole site.
export const site = {
  name: "Thock UI",
  short: "Thock/UI",
  company: "Intellara Labs",
  tagline: "Tactile React components. Copy, paste, ship.",
  description:
    "Beautiful, animated React + Tailwind components with real depth. Copy them into your project or add them with the shadcn CLI.",
  /** Public URL of the deployed site; used for `npx shadcn add <url>/r/<name>.json`. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Where "Get Pro" links go. The public export rewrites this to the official site's /pro page. */
  proHref: "https://thock-ui.vercel.app/pro",
  /** The template gallery. The public export rewrites this to the official site's /templates page. */
  templatesHref: "https://thock-ui.vercel.app/templates",
  /** Prefix for the Terms / Privacy / Refunds / Licence pages. The public export points it at the official site. */
  policiesBase: "https://thock-ui.vercel.app",
};
