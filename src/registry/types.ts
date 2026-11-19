import type { ComponentType } from "react";

export const categories = [
  { id: "actions", title: "Actions" },
  { id: "inputs", title: "Inputs" },
  { id: "overlays", title: "Overlays & Menus" },
  { id: "navigation", title: "Navigation" },
  { id: "feedback", title: "Feedback" },
  { id: "data", title: "Data Display" },
  { id: "blocks", title: "Blocks" },
] as const;

export type Category = (typeof categories)[number]["id"];

export type PropDoc = { name: string; type: string; default?: string; description: string };

export type KeyDoc = { keys: string; description: string };

export type Example = {
  title: string;
  /** Path relative to src/registry, shown in the example's Code tab. */
  file: string;
  Component: ComponentType;
};

export type RegistryItem = {
  slug: string;
  name: string;
  description: string;
  category: Category;
  type: "ui" | "block";
  /** Source files relative to src/registry. The first is the main file. */
  files: string[];
  /** npm packages the files import. */
  dependencies?: string[];
  /** Other registry items this one imports (tactile + utils are always included). */
  registryDependencies?: string[];
  /** The first example is the hero preview. */
  examples: Example[];
  usage: string;
  props?: PropDoc[];
  keyboard?: KeyDoc[];
  isNew?: boolean;
  /** Paid item: preview-only on the docs site, refused by the open /r/ registry. */
  pro?: boolean;
};
