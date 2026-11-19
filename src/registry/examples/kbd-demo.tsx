import { Kbd, KbdGroup } from "@/components/ui/kbd";

export default function KbdDemo() {
  return (
    <div className="grid gap-4 text-sm text-subtle">
      <p className="flex items-center gap-2">Search <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup></p>
      <p className="flex items-center gap-2">Save <KbdGroup><Kbd>Ctrl</Kbd>+<Kbd>S</Kbd></KbdGroup></p>
      <p className="flex items-center gap-2">Close <Kbd>Esc</Kbd></p>
    </div>
  );
}
