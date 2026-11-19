import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function ToggleGroupDemo() {
  return (
    <div className="flex flex-col items-center gap-8">
      <ToggleGroup type="single" defaultValue="left" aria-label="Text alignment">
        <ToggleGroupItem value="left" aria-label="Align left"><AlignLeft /></ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center"><AlignCenter /></ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right"><AlignRight /></ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="multiple" defaultValue={["wifi", "bt"]} aria-label="Radios">
        <ToggleGroupItem value="wifi" led>Wi-Fi</ToggleGroupItem>
        <ToggleGroupItem value="bt" led>Bluetooth</ToggleGroupItem>
        <ToggleGroupItem value="air" led>Airplane</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
