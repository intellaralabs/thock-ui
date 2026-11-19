import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const items = [
  { label: "Bold", key: "B", side: "top" },
  { label: "Italic", key: "I", side: "bottom" },
  { label: "Underline", key: "U", side: "right" },
] as const;

export default function TooltipDemo() {
  return (
    <div className="flex gap-3">
      {items.map((i) => (
        <Tooltip key={i.label}>
          <TooltipTrigger asChild>
            <Button size="icon" aria-label={i.label} className="font-serif text-lg">{i.key}</Button>
          </TooltipTrigger>
          <TooltipContent side={i.side}>{i.label} ⌘{i.key}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
