import Link from "next/link";
import { groupedRegistry, registry } from "@/registry";
import { ProBadge } from "@/components/docs/pro-badge";

export const metadata = { title: "Components" };

export default function ComponentsIndex() {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-fg">Components</h1>
        <p className="mt-2 text-subtle">
          {registry.filter((i) => !i.pro).length} free and {registry.filter((i) => i.pro).length} Pro tactile components and
          blocks, all in light and dark.
        </p>
      </header>
      {groupedRegistry.map((g) => (
        <section key={g.id}>
          <h2 className="mb-4 text-lg font-semibold text-fg">{g.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {g.items.map((i) => (
              <Link key={i.slug} href={`/docs/components/${i.slug}`}
                className="group rounded-xl border border-line p-4 transition-colors hover:bg-well/40">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-fg">{i.name}</h3>
                  {i.pro && <ProBadge />}
                  {!i.pro && i.isNew && <span className="rounded bg-brand/15 px-1.5 text-[10px] font-medium uppercase text-brand">New</span>}
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-subtle">{i.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
