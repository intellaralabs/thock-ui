import { Input } from "@/components/ui/input";

export default function InputDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <Input type="email" placeholder="you@example.com" aria-label="Email" />
      <Input placeholder="Disabled" disabled aria-label="Disabled input" />
      <Input type="file" aria-label="Upload file" />
    </div>
  );
}
