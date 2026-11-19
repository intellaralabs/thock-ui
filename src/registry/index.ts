import { categories, type RegistryItem } from "./types";
import { actions } from "./meta/actions";
import { inputs } from "./meta/inputs";
import { values } from "./meta/values";
import { overlays } from "./meta/overlays";
import { navigation } from "./meta/navigation";
import { feedback } from "./meta/feedback";
import { data } from "./meta/data";
import { blocks } from "./meta/blocks";

export * from "./types";

export const registry: RegistryItem[] = [
  ...actions,
  ...inputs,
  ...values,
  ...overlays,
  ...navigation,
  ...feedback,
  ...data,
  ...blocks,
];

export const getItem = (slug: string) => registry.find((i) => i.slug === slug);

export const groupedRegistry = categories
  .map((c) => ({ ...c, items: registry.filter((i) => i.category === c.id) }))
  .filter((g) => g.items.length > 0);

/** Files every component needs, shown in the manual install steps. */
export const baseFiles = [
  { file: "styles/tactile.css", target: "app/globals.css (append below @import \"tailwindcss\")" },
  { file: "lib/utils.ts", target: "lib/utils.ts" },
];

/** Where a registry file lands in the developer's project. */
export function targetPath(file: string) {
  return file.replace(/^(pro\/)?ui\//, "components/ui/").replace(/^(pro\/)?blocks\//, "components/blocks/");
}
