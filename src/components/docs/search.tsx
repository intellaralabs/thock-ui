"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Group = { title: string; items: { slug: string; name: string }[] };

export function Search({ groups }: { groups: Group[] }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="tactile-well flex h-8 w-full max-w-56 items-center gap-2 rounded-lg px-3 text-left text-sm text-subtle"
      >
        Search components…
        <kbd className="ml-auto hidden font-sans text-xs sm:inline">⌘K</kbd>
      </button>
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Search components"
        overlayClassName="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        contentClassName="tactile-surface fixed left-1/2 top-[18vh] z-50 w-[min(560px,calc(100vw-32px))] -translate-x-1/2 overflow-hidden rounded-2xl"
      >
        <Command.Input
          placeholder="Search components…"
          className="w-full border-b border-line bg-transparent px-4 py-3.5 text-[15px] text-fg outline-none placeholder:text-subtle"
        />
        <Command.List className="max-h-[50vh] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center text-sm text-subtle">No components found.</Command.Empty>
          {groups.map((g) => (
            <Command.Group
              key={g.title}
              heading={g.title}
              className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-subtle"
            >
              {g.items.map((i) => (
                <Command.Item
                  key={i.slug}
                  value={`${i.name} ${g.title}`}
                  onSelect={() => {
                    setOpen(false);
                    router.push(`/docs/components/${i.slug}`);
                  }}
                  className="cursor-pointer rounded-lg px-3 py-2 text-sm text-fg data-[selected=true]:bg-well"
                >
                  {i.name}
                </Command.Item>
              ))}
            </Command.Group>
          ))}
        </Command.List>
      </Command.Dialog>
    </>
  );
}
