import { Sidebar } from "@/components/docs/sidebar";
import { groupedRegistry } from "@/registry";
import { site } from "@/lib/site";

export default function DocsLayout({ children }: LayoutProps<"/docs">) {
  const groups = groupedRegistry.map((g) => ({
    title: g.title,
    items: g.items.map(({ slug, name, isNew, pro }) => ({ slug, name, isNew, pro })),
  }));
  return (
    <div className="mx-auto flex max-w-7xl gap-10 px-4 py-10">
      <aside className="sticky top-20 hidden max-h-[calc(100vh-6rem)] w-52 flex-none overflow-y-auto md:block">
        <Sidebar groups={groups} proHref={site.proHref} />
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
