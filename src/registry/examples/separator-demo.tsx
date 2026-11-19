import { Separator } from "@/components/ui/separator";

export default function SeparatorDemo() {
  return (
    <div className="tactile-tray grid w-80 gap-4 rounded-3xl p-5 text-sm">
      <div>
        <p className="font-semibold text-fg">Thock UI</p>
        <p className="text-subtle">Tactile components for React.</p>
      </div>
      <Separator />
      <div className="flex h-5 items-center gap-4 text-subtle">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Blocks</span>
        <Separator orientation="vertical" />
        <span>GitHub</span>
      </div>
      <Separator label="or" />
    </div>
  );
}
