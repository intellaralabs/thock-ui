# Thock UI

A library of tactile React + Tailwind v4 components (raised keys, recessed wells, LED accents) in light and dark. The free library has 30 components and 2 blocks, MIT-licensed. The docs site shows a live preview, the source, usage, props and keyboard support for each one, and it serves a **shadcn-compatible registry**, so each component installs with one command.

**Pro:** the signature pieces (knobs, faders, dock, gauges, pickers, data display), 10 more blocks and full dashboard templates are part of Thock UI Pro. They're listed on the docs site but their source isn't in this repo.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Install a component in another app (shadcn CLI)

In a Next.js / Vite app with Tailwind v4 and a `components.json` (`npx shadcn@latest init`):

```bash
npx shadcn@latest add https://<your-site>/r/button.json
```

The CLI copies the component and the components it builds on, installs npm dependencies, and adds the tactile tokens (`/r/tactile.json`) to your global CSS. The `cn()` helper comes from `shadcn init` (it is also served at `/r/utils.json` for manual setups). `https://<your-site>/r/registry.json` lists everything.

The registry is generated on request by `src/app/r/[name]/route.ts` from the same files the docs use, so it never drifts and there's no build step. Dependency URLs use the host that served the request, so localhost, preview and production deployments all work as they are.

## Project layout

```
src/registry/
  styles/tactile.css   design tokens + tactile-* utilities + animations (the only shared CSS)
  lib/utils.ts         cn()
  ui/                  components   → installs to components/ui/
  blocks/              blocks       → installs to components/blocks/
  examples/            demos rendered on the docs pages
  meta/<category>.ts   docs + registry metadata, one file per category
  index.ts             concatenates the meta files
```

Path aliases in `tsconfig.json` map `@/components/ui/*`, `@/components/blocks/*` and `@/lib/utils` to `src/registry/…`, so registry files use the same imports they'll have in a user's app.

## Add a component

1. Write `src/registry/ui/<slug>.tsx`. Import only from `@/components/ui/*`, `@/lib/utils` and npm packages.
2. Write one or more demos in `src/registry/examples/`. Add `"use client"` when a demo passes functions or holds state.
3. Add an entry to the right `src/registry/meta/<category>.ts`: `files`, `dependencies` (npm), `registryDependencies` (other slugs), usage, props and keyboard notes.

The sidebar, search, index, the `/docs/components/<slug>` page and `/r/<slug>.json` pick it up automatically.

## Styling rules

- Use the `tactile-*` utilities for depth. Express state with attributes (`data-selected`, `data-sunk`, `data-variant="accent"`, `aria-pressed`, Radix `data-state`) instead of stacking competing `shadow-[…]` classes.
- `tactile-led` lights up with `data-on`, or automatically inside a selected/checked/active/expanded parent.
- Give interactive parts a `data-slot="…"` so demos can script a cursor walkthrough (see `examples/checkout-card-demo.tsx`), which is handy for recording reels.

## License

The code in this repository is [MIT](LICENSE).

## Deploying (Vercel)

Import the repo and deploy. No env vars are required. Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://thock-ui.vercel.app`) so the install commands shown on the docs pages use your domain instead of `localhost:3000`.

Rename the site in `src/lib/site.ts`.
