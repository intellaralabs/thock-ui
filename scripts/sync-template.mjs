#!/usr/bin/env node
/**
 * Copies the library files a template uses into the template, the same way the shadcn CLI
 * would install them in a customer's app:
 *
 *   src/registry/{ui,pro/ui}/<name>.tsx          →  <template>/components/ui/<name>.tsx
 *   src/registry/{blocks,pro/blocks}/<name>.tsx  →  <template>/components/blocks/<name>.tsx
 *   src/registry/styles/tactile.css      →  <template>/styles/tactile.css
 *   src/registry/lib/utils.ts            →  <template>/lib/utils.ts
 *
 * It scans the template's own code for `@/components/{ui,blocks}/<name>` imports and follows the
 * imports inside copied components, so only what's used is copied. Re-run it after
 * changing a library component:
 *
 *   node scripts/sync-template.mjs templates/smart-home
 *   node scripts/sync-template.mjs templates/smart-home-lite --free   # fails if anything Pro is needed
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const reg = path.join(root, "src/registry");
const args = process.argv.slice(2);
const freeOnly = args.includes("--free");
const folder = args.find((a) => !a.startsWith("--"));
const dir = path.resolve(folder ?? "");
if (!folder || !fs.existsSync(path.join(dir, "package.json"))) {
  console.error("Usage: node scripts/sync-template.mjs <template-folder> [--free]");
  process.exit(1);
}

const IMPORT = /@\/components\/(ui|blocks)\/([a-z0-9-]+)/g;
const SKIP = new Set(["node_modules", ".next", "components"]);

/** Template-owned source files (everything except node_modules, build output and copied components/ui). */
function ownFiles(d, out = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) {
      if (SKIP.has(e.name) && d === dir) {
        if (e.name === "components") {
          for (const c of fs.readdirSync(p, { withFileTypes: true })) {
            if (c.isDirectory() && c.name !== "ui" && c.name !== "blocks") ownFiles(path.join(p, c.name), out);
          }
        }
        continue;
      }
      ownFiles(p, out);
    } else if (/\.(tsx?|mdx?)$/.test(e.name)) out.push(p);
  }
  return out;
}

// --free: a public template may only use the free (MIT) components.
const source = (kind, name) =>
  [path.join(reg, kind, `${name}.tsx`), ...(freeOnly ? [] : [path.join(reg, "pro", kind, `${name}.tsx`)])].find((p) => fs.existsSync(p));

/** "ui/button", "blocks/auth-form", … */
const needed = new Set();
const queue = [];
for (const f of ownFiles(dir)) for (const m of fs.readFileSync(f, "utf8").matchAll(IMPORT)) queue.push(`${m[1]}/${m[2]}`);
while (queue.length) {
  const key = queue.pop();
  if (needed.has(key)) continue;
  const [kind, name] = key.split("/");
  const src = source(kind, name);
  if (!src) {
    const pro = fs.existsSync(path.join(reg, "pro", kind, `${name}.tsx`));
    throw new Error(pro ? `"${name}" is a Pro ${kind === "ui" ? "component" : "block"}; --free templates can't use it` : `No library ${kind === "ui" ? "component" : "block"} "${name}"`);
  }
  needed.add(key);
  for (const m of fs.readFileSync(src, "utf8").matchAll(IMPORT)) queue.push(`${m[1]}/${m[2]}`);
}

for (const kind of ["ui", "blocks"]) {
  const out = path.join(dir, "components", kind);
  fs.rmSync(out, { recursive: true, force: true });
  const names = [...needed].filter((k) => k.startsWith(`${kind}/`)).map((k) => k.slice(kind.length + 1));
  if (!names.length) continue;
  fs.mkdirSync(out, { recursive: true });
  for (const name of names) fs.copyFileSync(source(kind, name), path.join(out, `${name}.tsx`));
}
fs.mkdirSync(path.join(dir, "styles"), { recursive: true });
fs.copyFileSync(path.join(reg, "styles/tactile.css"), path.join(dir, "styles/tactile.css"));
fs.mkdirSync(path.join(dir, "lib"), { recursive: true });
fs.copyFileSync(path.join(reg, "lib/utils.ts"), path.join(dir, "lib/utils.ts"));

console.log(`Synced ${needed.size} files into ${path.relative(root, path.join(dir, "components"))}: ${[...needed].sort().join(", ")}`);
