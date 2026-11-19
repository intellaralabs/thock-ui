import { Pause, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export default function ButtonGroupDemo() {
  return (
    <div className="flex flex-col items-center gap-8">
      <ButtonGroup aria-label="Playback">
        <Button size="icon" aria-label="Previous"><SkipBack /></Button>
        <Button size="icon" variant="accent" aria-label="Pause"><Pause /></Button>
        <Button size="icon" aria-label="Next"><SkipForward /></Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Actions">
        <Button size="sm">Archive</Button>
        <Button size="sm">Snooze</Button>
        <Button size="sm">Delete</Button>
      </ButtonGroup>
    </div>
  );
}
