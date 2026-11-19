"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";

export default function SliderDemo() {
  const [volume, setVolume] = useState([64]);
  return (
    <div className="grid w-full max-w-sm gap-3">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-fg">Volume</span>
        <span className="tabular-nums text-subtle">{volume[0]}%</span>
      </div>
      <Slider value={volume} onValueChange={setVolume} aria-label="Volume" />
    </div>
  );
}
