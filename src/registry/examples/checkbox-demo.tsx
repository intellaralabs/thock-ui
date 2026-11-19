"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const items = ["Email", "Push notifications", "SMS"];

export default function CheckboxDemo() {
  const [checked, setChecked] = useState<string[]>(["Email"]);
  const all = checked.length === items.length ? true : checked.length ? "indeterminate" : false;
  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-3">
        <Checkbox id="all" checked={all} onCheckedChange={(v) => setChecked(v === true ? items : [])} />
        <Label htmlFor="all">Notify me by</Label>
      </div>
      {items.map((i) => (
        <div key={i} className="ml-8 flex items-center gap-3">
          <Checkbox
            id={i}
            checked={checked.includes(i)}
            onCheckedChange={(v) => setChecked((c) => (v ? [...c, i] : c.filter((x) => x !== i)))}
          />
          <Label htmlFor={i} className="font-normal text-subtle">{i}</Label>
        </div>
      ))}
    </div>
  );
}
