import { Bold, Italic, Mic, Underline } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

export default function ToggleDemo() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex gap-3">
        <Toggle aria-label="Bold" defaultPressed><Bold /></Toggle>
        <Toggle aria-label="Italic"><Italic /></Toggle>
        <Toggle aria-label="Underline"><Underline /></Toggle>
      </div>
      <Toggle size="lg" led defaultPressed>
        <Mic /> Mic live
      </Toggle>
    </div>
  );
}
