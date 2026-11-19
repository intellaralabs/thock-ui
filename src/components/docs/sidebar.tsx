"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProBadge } from "./pro-badge";

type Group = { title: string; items: { slug: string; name: string; isNew?: boolean; pro?: boolean }[] };

export function Sidebar({ groups, proHref }: { groups: Group[]; proHref: string }) {
  const path = usePathname();
  const link = (href: string, label: string, badge?: "new" | "pro") => (
    <Link
      key={href}
      href={href}
      className={`flex items-center justify-between rounded-md px-2 py-1.5 text-sm ${
        path === href ? "bg-well font-medium text-fg" : "text-subtle hover:text-fg"
      }`}
    >
      {label}
      {badge === "pro" && <ProBadge />}
      {badge === "new" && <span className="rounded bg-brand/15 px-1.5 text-[10px] font-medium uppercase text-brand">New</span>}
    </Link>
  );
  return (
    <nav className="space-y-6 pb-10">
      <div>
        <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-subtle/80">Getting started</p>
        {link("/docs", "Introduction")}
        {link("/docs/components", "All components")}
        {link(proHref, "Pro")}
      </div>
      {groups.map((g) => (
        <div key={g.title}>
          <p className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-subtle/80">{g.title}</p>
          {g.items.map((i) => link(`/docs/components/${i.slug}`, i.name, i.pro ? "pro" : i.isNew ? "new" : undefined))}
        </div>
      ))}
    </nav>
  );
}
