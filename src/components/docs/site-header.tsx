import Link from "next/link";
import { site } from "@/lib/site";
import { groupedRegistry } from "@/registry";
import { Search } from "./search";
import { ThemeToggle } from "./theme";

export function SiteHeader() {
  const groups = groupedRegistry.map((g) => ({
    title: g.title,
    items: g.items.map(({ slug, name }) => ({ slug, name })),
  }));
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:gap-6">
        <Link href="/" className="font-semibold tracking-tight text-fg">
          {site.short}
        </Link>
        <nav className="hidden gap-5 text-sm text-subtle sm:flex">
          <Link href="/docs" className="hover:text-fg">Docs</Link>
          <Link href="/docs/components" className="hover:text-fg">Components</Link>
          <Link href={site.templatesHref} className="hover:text-fg">Templates</Link>
          <Link href={site.proHref} className="hover:text-fg">Pro</Link>
        </nav>
        <div className="ml-auto flex flex-1 items-center justify-end gap-3">
          <Search groups={groups} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
