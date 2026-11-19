import { readFile } from "node:fs/promises";
import path from "node:path";
import { cacheLife } from "next/cache";
import postcss, { type ChildNode, type Container } from "postcss";
import { registry, type RegistryItem } from "@/registry";
import { site } from "@/lib/site";

/*
 * Builds shadcn-compatible registry JSON (https://ui.shadcn.com/schema/registry-item.json)
 * straight from src/registry, so `npx shadcn add <site>/r/<name>.json` always matches the docs.
 */

type CssTree = { [key: string]: string | CssTree };
type CssVars = { theme: Record<string, string>; light: Record<string, string>; dark: Record<string, string> };

const ROOT = path.join(process.cwd(), "src/registry");
const read = (file: string) => readFile(path.join(ROOT, file), "utf8");

/** Turns a postcss container into the nested object shape the shadcn CLI writes back out. */
function toTree(node: Container): CssTree {
  const out: CssTree = {};
  node.each((child: ChildNode) => {
    if (child.type === "decl") out[child.prop] = child.value;
    else if (child.type === "rule") out[child.selector] = { ...((out[child.selector] as CssTree) ?? {}), ...toTree(child) };
    else if (child.type === "atrule") {
      const key = `@${child.name}${child.params ? " " + child.params : ""}`;
      out[key] = child.nodes ? toTree(child) : {};
    }
  });
  return out;
}

/** Splits tactile.css into cssVars (:root / .dark / @theme) and css (utilities, keyframes, media). */
async function tactileCss(): Promise<{ cssVars: CssVars; css: CssTree }> {
  const root = postcss.parse(await read("styles/tactile.css"));
  const cssVars: CssVars = { theme: {}, light: {}, dark: {} };
  const css: CssTree = {};
  const vars = (c: Container, into: Record<string, string>) =>
    c.each((d) => {
      if (d.type === "decl" && d.prop.startsWith("--")) into[d.prop.slice(2)] = d.value;
    });

  root.each((node) => {
    if (node.type === "rule" && node.selector === ":root") vars(node, cssVars.light);
    else if (node.type === "rule" && node.selector === ".dark") vars(node, cssVars.dark);
    else if (node.type === "atrule" && node.name === "theme") {
      vars(node, cssVars.theme);
      node.each((k) => {
        if (k.type === "atrule" && k.name === "keyframes") css[`@keyframes ${k.params}`] = toTree(k);
      });
    } else if (node.type === "atrule") {
      css[`@${node.name} ${node.params}`] = toTree(node);
    }
  });
  return { cssVars, css };
}

const url = (base: string, name: string) => `${base}/r/${name}.json`;

function fileEntry(file: string, content: string) {
  const rel = file.replace(/^pro\//, "");
  if (rel.startsWith("blocks/")) {
    return { path: `registry/${rel}`, type: "registry:component", target: `components/${rel}`, content };
  }
  return { path: `registry/${rel}`, type: "registry:ui", content };
}

const freeRegistry = registry.filter((i) => !i.pro);

/** True for Pro items, which the open registry refuses (they'll be served with a licence key). */
export const isProItem = (name: string) => registry.some((i) => i.slug === name && i.pro);

async function componentJson(item: RegistryItem, base: string) {
  const files = await Promise.all(item.files.map(async (f) => fileEntry(f, await read(f))));
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.slug,
    type: item.type === "block" ? "registry:block" : "registry:ui",
    title: item.name,
    description: item.description,
    dependencies: item.dependencies ?? [],
    // lib/utils.ts (cn) comes from `shadcn init`; /r/utils.json exists for manual installs.
    registryDependencies: [
      url(base, "tactile"),
      ...(item.registryDependencies ?? []).map((d) => url(base, d)),
    ],
    files,
  };
}

async function baseItemJson(name: "tactile" | "utils") {
  if (name === "utils") {
    return {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: "utils",
      type: "registry:lib",
      title: "cn() helper",
      description: "Merges class names and resolves Tailwind conflicts.",
      dependencies: ["clsx", "tailwind-merge"],
      files: [{ path: "registry/lib/utils.ts", type: "registry:lib", content: await read("lib/utils.ts") }],
    };
  }
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "tactile",
    type: "registry:style",
    title: "Tactile tokens",
    description: "Colour tokens (light + dark), the tactile-* utilities and animations every component uses.",
    extends: "none",
    ...(await tactileCss()),
  };
}

/** The JSON for one free item (`button`, `tactile`, `utils`, …) or the free index (`registry`). Null if unknown or Pro. */
export async function registryJson(name: string, base: string = site.url) {
  "use cache";
  cacheLife("max");
  if (name === "tactile" || name === "utils") return baseItemJson(name);
  if (name === "registry") {
    return {
      $schema: "https://ui.shadcn.com/schema/registry.json",
      name: "thock-ui",
      homepage: base,
      items: [
        { name: "tactile", type: "registry:style", title: "Tactile tokens" },
        { name: "utils", type: "registry:lib", title: "cn() helper" },
        ...freeRegistry.map((i) => ({
          name: i.slug,
          type: i.type === "block" ? "registry:block" : "registry:ui",
          title: i.name,
          description: i.description,
        })),
      ],
    };
  }
  const item = freeRegistry.find((i) => i.slug === name);
  return item ? componentJson(item, base) : null;
}

export const registryNames = ["registry", "tactile", "utils", ...freeRegistry.map((i) => i.slug)];
