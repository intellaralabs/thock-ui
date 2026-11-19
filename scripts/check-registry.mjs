#!/usr/bin/env node
/**
 * Checks a running site's registry: every free item matches the shadcn schema and its
 * dependencies resolve; every Pro item is refused.
 *
 *   node scripts/check-registry.mjs http://localhost:3000
 */
import { registryItemSchema, registrySchema } from "@shadcn/registry/schema";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "") + "/r";
const fail = (msg) => {
  console.error("✗ " + msg);
  process.exitCode = 1;
};

const index = await (await fetch(`${base}/registry.json`)).json();
const parsed = registrySchema.safeParse(index);
if (!parsed.success) fail("registry.json: " + JSON.stringify(parsed.error.issues.slice(0, 3)));
const names = new Set(index.items.map((i) => i.name));

for (const { name } of index.items) {
  const res = await fetch(`${base}/${name}.json`);
  if (!res.ok) {
    fail(`${name}: HTTP ${res.status}`);
    continue;
  }
  const json = await res.json();
  const item = registryItemSchema.safeParse(json);
  if (!item.success) fail(`${name}: ${JSON.stringify(item.error.issues.slice(0, 2))}`);
  const missing = (json.registryDependencies ?? []).filter((u) => !names.has(u.split("/r/").pop().replace(/\.json$/, "")));
  if (missing.length) fail(`${name}: unknown dependencies ${missing.join(", ")}`);
}

// Pro items (if this build has any) must be refused.
const proSlugs = process.env.PRO_SLUGS?.split(",").filter(Boolean) ?? ["knob", "settings-panel"];
for (const slug of proSlugs) {
  const res = await fetch(`${base}/${slug}.json`);
  if (res.status !== 403 && res.status !== 404) fail(`${slug}: Pro item served with HTTP ${res.status}`);
  if (names.has(slug)) fail(`${slug}: Pro item listed in registry.json`);
}

console.log(`${process.exitCode ? "✗" : "✓"} ${index.items.length} registry items checked against ${base}`);
