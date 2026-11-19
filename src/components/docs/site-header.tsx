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
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`${site.name} on GitHub`}
            title="GitHub"
            className="grid size-9 place-items-center rounded-lg text-subtle hover:text-fg"
          >
            <svg viewBox="0 0 16 16" aria-hidden="true" className="size-[18px] fill-current">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
