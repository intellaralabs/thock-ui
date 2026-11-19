import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const options = [
  { value: "standard", label: "Standard", hint: "4–6 business days" },
  { value: "express", label: "Express", hint: "1–2 business days" },
  { value: "pickup", label: "Pick up", hint: "Ready today" },
];

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="express" aria-label="Shipping" className="gap-4">
      {options.map((o) => (
        <div key={o.value} className="flex items-center gap-3">
          <RadioGroupItem value={o.value} id={o.value} />
          <Label htmlFor={o.value} className="grid gap-0.5">
            {o.label}
            <span className="text-[13px] font-normal text-subtle">{o.hint}</span>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
