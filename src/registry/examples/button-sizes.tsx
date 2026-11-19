import { Heart, Plus, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ButtonSizes() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <div className="flex items-center gap-4">
        <Button size="icon-sm" aria-label="Add"><Plus /></Button>
        <Button size="icon" aria-label="Like"><Heart /></Button>
        <Button size="icon-lg" variant="accent" aria-label="Share"><Share2 /></Button>
      </div>
    </div>
  );
}
