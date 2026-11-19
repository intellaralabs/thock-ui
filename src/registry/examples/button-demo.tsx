import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Button>Default</Button>
      <Button variant="accent">
        Get started <ArrowRight />
      </Button>
      <Button variant="ghost">Ghost</Button>
      <Button loading>Saving</Button>
      <Button disabled>Disabled</Button>
    </div>
  );
}
