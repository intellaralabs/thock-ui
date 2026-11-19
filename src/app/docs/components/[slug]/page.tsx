import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getItem, registry, targetPath } from "@/registry";
import { getSources, highlight } from "@/lib/code";
import { site } from "@/lib/site";
import { CodeBlock } from "@/components/docs/code-block";
import { Stage, Tabs } from "@/components/docs/preview-tabs";
import { ProBadge } from "@/components/docs/pro-badge";

export function generateStaticParams() {
  return registry.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/docs/components/[slug]">) {
  const item = getItem((await params).slug);
  return item ? { title: item.name, description: item.description } : {};
}

const h2 = "text-xl font-semibold text-fg";

export default async function ComponentPage({ params }: PageProps<"/docs/components/[slug]">) {
  const item = getItem((await params).slug);
  if (!item) notFound();

  // Pro source never reaches the page: no Code tabs, no manual install, no CLI command.
  const pro = !!item.pro;
  const sources = pro ? [] : await getSources([...item.files, ...item.examples.map((e) => e.file)]);
  const fileSources = sources.slice(0, item.files.length);
  const exampleSources = sources.slice(item.files.length);

  const cli = pro ? "" : `npx shadcn@latest add ${site.url}/r/${item.slug}.json`;
  const npm = item.dependencies?.length ? `npm install ${item.dependencies.join(" ")}` : null;
  const [cliHtml, npmHtml, usageHtml] = await Promise.all([
    cli ? highlight(cli, "bash") : Promise.resolve(""),
    npm ? highlight(npm, "bash") : Promise.resolve(""),
    highlight(item.usage),
  ]);
  const deps = (item.registryDependencies ?? []).map((s) => getItem(s)).filter((d) => !!d);
  const category = categories.find((c) => c.id === item.category)?.title;

  const example = (i: number) => {
    const ex = item.examples[i];
    const src = exampleSources[i];
    const preview = { label: "Preview", content: <Stage compact={i > 0}><ex.Component /></Stage> };
    return (
      <Tabs
        tabs={
          src
            ? [preview, { label: "Code", content: <CodeBlock html={src.html} code={src.code} maxHeight={520} /> }]
            : [preview]
        }
      />
    );
  };

  return (
    <article className="space-y-12">
      <header>
        <p className="mb-2 text-sm text-subtle">{category}</p>
        <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight text-fg">
          {item.name}
          {pro && <ProBadge className="text-xs" />}
        </h1>
        <p className="mt-2 max-w-2xl text-subtle">{item.description}</p>
      </header>

      {example(0)}

      {pro ? (
        <section className="space-y-4">
          <h2 className={h2}>Installation</h2>
          <div className="tactile-tray flex flex-col items-start gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium text-fg">{item.name} is part of {site.name} Pro.</p>
              <p className="mt-1 text-sm text-subtle">
                Pro includes the source, CLI install with a licence key, and every Pro component, block and template.
              </p>
            </div>
            <Link
              href={site.proHref}
              data-variant="accent"
              className="tactile-key shrink-0 rounded-xl px-4 py-2 text-sm font-medium"
            >
              Get Pro
            </Link>
          </div>
        </section>
      ) : (
      <section className="space-y-4">
        <h2 className={h2}>Installation</h2>
        <Tabs
          tabs={[
            { label: "CLI", content: <CodeBlock html={cliHtml} code={cli} /> },
            {
              label: "Manual",
              content: (
                <ol className="space-y-5 text-sm text-subtle">
                  <li>
                    1. Complete the <Link href="/docs#setup" className="text-fg underline underline-offset-4">one-time setup</Link>{" "}
                    (tokens + <code className="text-fg">cn</code> helper), if you haven&apos;t already.
                  </li>
                  {npm && (
                    <li className="space-y-2">
                      <p>2. Install the dependencies:</p>
                      <CodeBlock html={npmHtml} code={npm} />
                    </li>
                  )}
                  {deps.length > 0 && (
                    <li>
                      {npm ? "3" : "2"}. Add the components this one uses:{" "}
                      {deps.map((d, i) => (
                        <span key={d.slug}>
                          {i > 0 && ", "}
                          <Link href={`/docs/components/${d.slug}`} className="text-fg underline underline-offset-4">{d.name}</Link>
                        </span>
                      ))}
                    </li>
                  )}
                  <li className="space-y-2">
                    <p>Copy the source into your project:</p>
                    {fileSources.map((s) => (
                      <CodeBlock key={s.file} html={s.html} code={s.code} title={targetPath(s.file)} maxHeight={420} />
                    ))}
                  </li>
                </ol>
              ),
            },
          ]}
        />
      </section>
      )}

      <section className="space-y-4">
        <h2 className={h2}>Usage</h2>
        <CodeBlock html={usageHtml} code={item.usage} />
      </section>

      {item.examples.length > 1 && (
        <section className="space-y-8">
          <h2 className={h2}>Examples</h2>
          {item.examples.slice(1).map((ex, i) => (
            <div key={ex.file} className="space-y-3">
              <h3 className="font-medium text-fg">{ex.title}</h3>
              {example(i + 1)}
            </div>
          ))}
        </section>
      )}

      {item.props && item.props.length > 0 && (
        <section className="space-y-4">
          <h2 className={h2}>Props</h2>
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full text-left text-sm">
              <thead className="bg-well/50 text-subtle">
                <tr>
                  <th className="px-4 py-2.5 font-medium">Prop</th>
                  <th className="px-4 py-2.5 font-medium">Type</th>
                  <th className="px-4 py-2.5 font-medium">Default</th>
                  <th className="px-4 py-2.5 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {item.props.map((p) => (
                  <tr key={p.name} className="align-top">
                    <td className="px-4 py-3 font-mono text-[13px] text-fg">{p.name}</td>
                    <td className="px-4 py-3 font-mono text-[13px] text-sky-600 dark:text-sky-300">{p.type}</td>
                    <td className="px-4 py-3 text-subtle">{p.default ?? "—"}</td>
                    <td className="px-4 py-3 text-subtle">{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {item.keyboard && item.keyboard.length > 0 && (
        <section className="space-y-4">
          <h2 className={h2}>Keyboard</h2>
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-line">
                {item.keyboard.map((k) => (
                  <tr key={k.keys}>
                    <td className="w-48 px-4 py-3"><kbd className="tactile-key rounded-md px-2 py-0.5 font-sans text-xs">{k.keys}</kbd></td>
                    <td className="px-4 py-3 text-subtle">{k.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </article>
  );
}
