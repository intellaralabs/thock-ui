import Link from "next/link";
import { site } from "@/lib/site";
import { getSources, highlight } from "@/lib/code";
import { CodeBlock } from "@/components/docs/code-block";

export const metadata = { title: "Introduction" };

export default async function DocsIntro() {
  const [css, utils] = await getSources(["styles/tactile.css", "lib/utils.ts"]);
  const install = "npm install clsx tailwind-merge";
  const installHtml = await highlight(install, "bash");
  const cli = `npx shadcn@latest init\nnpx shadcn@latest add ${site.url}/r/button.json`;
  const cliHtml = await highlight(cli, "bash");
  const code = "rounded bg-well px-1.5 py-0.5 font-mono text-[13px] text-fg";
  return (
    <article className="max-w-3xl space-y-6 text-subtle">
      <h1 className="text-3xl font-semibold tracking-tight text-fg">Introduction</h1>
      <p>
        {site.name} is a library of tactile React components with real depth: raised keys, recessed wells and glowing
        indicator lights, in light and dark. It is not a package you depend on. You add the source of each component to
        your project, and it becomes yours to change.
      </p>

      <h2 id="cli" className="pt-4 text-xl font-semibold text-fg">Quick start with the CLI</h2>
      <p>
        In a React app with Tailwind CSS v4, set up shadcn once, then add any component by URL. The first component you
        add also brings in the tactile tokens and the components it builds on.
      </p>
      <CodeBlock html={cliHtml} code={cli} />
      <p>
        Everything is listed at <code className={code}>{site.url}/r/registry.json</code>. Prefer to copy files by hand?
        Follow the manual setup below.
      </p>

      <h2 id="setup" className="pt-4 text-xl font-semibold text-fg">1. Manual setup (one time)</h2>
      <p>You need React 18+ and Tailwind CSS v4. Then install the two helpers every component uses:</p>
      <CodeBlock html={installHtml} code={install} />
      <p>
        Add the design tokens to your global CSS, directly below <code className={code}>@import &quot;tailwindcss&quot;;</code>.
        Light values sit on <code className={code}>:root</code> and dark values on <code className={code}>.dark</code>.
      </p>
      <CodeBlock html={css.html} code={css.code} title="tactile.css" maxHeight={360} />
      <p>Add the class-name helper at <code className={code}>lib/utils.ts</code>:</p>
      <CodeBlock html={utils.html} code={utils.code} title="lib/utils.ts" />

      <h2 className="pt-4 text-xl font-semibold text-fg">2. Add components</h2>
      <p>
        Every component page has two install options. With the <strong className="text-fg">shadcn CLI</strong>, one
        command copies the file, its dependencies and the tokens into your project. With{" "}
        <strong className="text-fg">manual</strong> install, you copy the files yourself. Components import from{" "}
        <code className={code}>@/components/ui/*</code> and <code className={code}>@/lib/utils</code>, the standard shadcn
        aliases.
      </p>

      <h2 className="pt-4 text-xl font-semibold text-fg">3. Theming</h2>
      <p>
        Every color comes from a <code className={code}>--tactile-*</code> CSS variable, so you can retheme the whole
        library by editing the tokens. Dark mode follows a <code className={code}>.dark</code> class on{" "}
        <code className={code}>&lt;html&gt;</code>, which works out of the box with next-themes.
      </p>

      <p className="pt-4">
        <Link href="/docs/components" className="text-fg underline underline-offset-4">Browse all components →</Link>
      </p>
    </article>
  );
}
