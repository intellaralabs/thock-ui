import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Dimensions</Button>
      </PopoverTrigger>
      <PopoverContent className="grid w-72 gap-3">
        <p className="text-sm font-semibold">Dimensions</p>
        {[["Width", "100%"], ["Height", "320px"], ["Radius", "24px"]].map(([l, v]) => (
          <div key={l} className="grid grid-cols-3 items-center gap-3">
            <Label htmlFor={`d-${l}`}>{l}</Label>
            <Input id={`d-${l}`} defaultValue={v} className="col-span-2 h-9" />
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
