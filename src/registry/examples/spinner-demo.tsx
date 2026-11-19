import { Spinner } from "@/components/ui/spinner";

export default function SpinnerDemo() {
  return (
    <div className="flex items-center gap-10">
      <Spinner variant="ring" size={28} />
      <Spinner variant="leds" size={32} />
      <Spinner variant="dots" size={32} />
    </div>
  );
}
