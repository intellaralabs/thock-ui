import type { RegistryItem } from "../types";
import { controlled } from "./shared";
import SliderDemo from "../examples/slider-demo";
import SliderRange from "../examples/slider-range";

/** Value inputs (part of the Inputs category). */
export const values: RegistryItem[] = [
  {
    slug: "slider",
    name: "Slider",
    description: "A glowing range in a recessed track. Pass two values for a range slider.",
    category: "inputs",
    type: "ui",
    files: ["ui/slider.tsx"],
    dependencies: ["radix-ui"],
    examples: [
      { title: "Slider", file: "examples/slider-demo.tsx", Component: SliderDemo },
      { title: "Range", file: "examples/slider-range.tsx", Component: SliderRange },
    ],
    usage: `import { Slider } from "@/components/ui/slider";

<Slider value={volume} onValueChange={setVolume} aria-label="Volume" />
<Slider defaultValue={[20, 80]} />  {/* range */}`,
    props: [
      ...controlled("number[]"),
      { name: "min / max / step", type: "number", default: "0 / 100 / 1", description: "Range and increment." },
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direction." },
      { name: "minStepsBetweenThumbs", type: "number", description: "Minimum gap for range sliders." },
    ],
    keyboard: [
      { keys: "Arrow keys", description: "Change the value by one step." },
      { keys: "PageUp / PageDown", description: "Change the value by a larger step." },
      { keys: "Home / End", description: "Jump to min / max." },
    ],
  },
];
