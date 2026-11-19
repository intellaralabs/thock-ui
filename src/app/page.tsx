import Link from "next/link";
import { groupedRegistry, registry } from "@/registry";
import { site } from "@/lib/site";

export default function Home() {
  const featured = registry.filter((i) => i.isNew).slice(0, 6);
  const showcase = featured.length ? featured : registry.slice(0, 6);
  return (
    <main className="mx-auto max-w-7xl px-4">
      <section className="py-20 text-center sm:py-28">
        <p className="tactile-well mx-auto mb-5 w-fit rounded-full px-3 py-1 text-xs text-subtle">
          {registry.filter((i) => !i.pro).length} free components · {registry.filter((i) => i.pro).length} Pro · React + Tailwind
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight text-fg sm:text-6xl">{site.tagline}</h1>
        <p className="mx-auto mt-5 max-w-xl text-subtle">{site.description}</p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/docs/components" data-variant="accent" className="tactile-key rounded-xl px-5 py-2.5 text-sm font-medium">
            Browse components
          </Link>
          <Link href="/docs" className="tactile-key rounded-xl px-5 py-2.5 text-sm">
            Get started
          </Link>
        </div>
      </section>

      <section className="grid gap-6 pb-16 md:grid-cols-2 xl:grid-cols-3">
        {showcase.map(({ slug, name, description, examples }) => {
          const Demo = examples[0].Component;
          return (
            <div key={slug} className="overflow-hidden rounded-2xl border border-line">
              <div className="tactile-stage flex min-h-[380px] items-center justify-center px-4 py-10">
                <Demo />
              </div>
              <Link href={`/docs/components/${slug}`} className="block border-t border-line p-5 hover:bg-well/40">
                <h2 className="font-medium text-fg">{name} →</h2>
                <p className="mt-1 line-clamp-2 text-sm text-subtle">{description}</p>
              </Link>
            </div>
          );
        })}
      </section>

      <section className="pb-24">
        <h2 className="mb-6 text-xl font-semibold text-fg">Everything in the library</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {groupedRegistry.map((g) => (
            <div key={g.id}>
              <h3 className="mb-2 text-sm font-medium text-fg">{g.title}</h3>
              <ul className="space-y-1">
                {g.items.map((i) => (
                  <li key={i.slug}>
                    <Link href={`/docs/components/${i.slug}`} className="text-sm text-subtle hover:text-fg">{i.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
