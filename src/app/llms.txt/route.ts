import { categories, registry } from "@/registry";
import { site } from "@/lib/site";

/**
 * llms.txt (https://llmstxt.org): a plain-text map of the library for AI coding tools,
 * so they can find and install the right component.
 */
export function GET() {
  const free = registry.filter((i) => !i.pro);
  const pro = registry.filter((i) => i.pro);
  const line = (i: (typeof registry)[number]) =>
    `- [${i.name}](${site.url}/docs/components/${i.slug}): ${i.description}`;
  const byCategory = (items: typeof registry) =>
    categories
      .map((c) => ({ title: c.title, items: items.filter((i) => i.category === c.id) }))
      .filter((g) => g.items.length)
      .map((g) => `### ${g.title}\n\n${g.items.map(line).join("\n")}`)
      .join("\n\n");

  const body = `# ${site.name}

> ${site.description}

Components are added to a project as source code with the shadcn CLI (React 19, Tailwind CSS v4).
Run \`npx shadcn@latest init\` once, then add any free component:

\`\`\`bash
npx shadcn@latest add ${site.url}/r/<name>.json
\`\`\`

The CLI also installs the shared tactile design tokens and any components it depends on.
Files land in \`components/ui/\` (components) and \`components/blocks/\` (blocks).
The full list in machine-readable form: ${site.url}/r/registry.json

## Free components

${byCategory(free)}
${
  pro.length
    ? `
## Pro components

These need an ${site.name} Pro licence and cannot be installed from the open registry.

${byCategory(pro)}
`
    : ""
}`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
