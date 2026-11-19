"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";

export default function SliderRange() {
  const [range, setRange] = useState([120, 480]);
  return (
    <div className="grid w-full max-w-sm gap-3">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-fg">Price</span>
        <span className="tabular-nums text-subtle">${range[0]} – ${range[1]}</span>
      </div>
      <Slider value={range} onValueChange={setRange} min={0} max={600} step={10} minStepsBetweenThumbs={5} />
    </div>
  );
}
