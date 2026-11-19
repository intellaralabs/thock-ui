import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SwitchDemo() {
  return (
    <div className="grid w-full max-w-xs gap-5">
      <div className="flex items-center justify-between gap-4">
        <Label htmlFor="wifi" className="grid gap-0.5">
          Wi-Fi <span className="text-[13px] font-normal text-subtle">Studio-5G</span>
        </Label>
        <Switch id="wifi" defaultChecked />
      </div>
      <div className="flex items-center justify-between gap-4">
        <Label htmlFor="dnd">Do not disturb</Label>
        <Switch id="dnd" />
      </div>
      <div className="flex items-center justify-between gap-4">
        <Label htmlFor="compact">Compact size</Label>
        <Switch id="compact" size="sm" defaultChecked />
      </div>
    </div>
  );
}
