import type { RegistryItem } from "../types";
import ButtonDemo from "../examples/button-demo";
import ButtonSizes from "../examples/button-sizes";
import ButtonGroupDemo from "../examples/button-group-demo";
import ToggleDemo from "../examples/toggle-demo";
import ToggleGroupDemo from "../examples/toggle-group-demo";

export const actions: RegistryItem[] = [
  {
    slug: "button",
    name: "Button",
    description: "A raised key that physically presses down. Default, accent and ghost variants, icon sizes and a loading state.",
    category: "actions",
    type: "ui",
    files: ["ui/button.tsx"],
    dependencies: ["radix-ui"],
    isNew: true,
    examples: [
      { title: "Variants", file: "examples/button-demo.tsx", Component: ButtonDemo },
      { title: "Sizes & icon buttons", file: "examples/button-sizes.tsx", Component: ButtonSizes },
    ],
    usage: `import { Button } from "@/components/ui/button";

<Button variant="accent" onClick={save}>Save</Button>
<Button size="icon" aria-label="Like"><Heart /></Button>
<Button asChild><a href="/pricing">Pricing</a></Button>`,
    props: [
      { name: "variant", type: '"default" | "accent" | "ghost"', default: '"default"', description: "Visual style." },
      { name: "size", type: '"sm" | "md" | "lg" | "icon" | "icon-sm" | "icon-lg"', default: '"md"', description: "Height and padding. Icon sizes are square; give them an aria-label." },
      { name: "loading", type: "boolean", default: "false", description: "Shows a spinner, sets aria-busy and disables the button." },
      { name: "asChild", type: "boolean", default: "false", description: "Render the child element (e.g. a link) with button styles." },
    ],
    keyboard: [{ keys: "Enter / Space", description: "Activates the button." }],
  },
  {
    slug: "button-group",
    name: "Button Group",
    description: "Seats a set of related buttons in one recessed tray, horizontally or vertically.",
    category: "actions",
    type: "ui",
    files: ["ui/button-group.tsx"],
    registryDependencies: ["button"],
    examples: [{ title: "Playback controls", file: "examples/button-group-demo.tsx", Component: ButtonGroupDemo }],
    usage: `import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

<ButtonGroup aria-label="Playback">
  <Button size="icon" aria-label="Previous"><SkipBack /></Button>
  <Button size="icon" variant="accent" aria-label="Pause"><Pause /></Button>
</ButtonGroup>`,
    props: [
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Layout direction." },
    ],
  },
  {
    slug: "toggle",
    name: "Toggle",
    description: "A two-state key that stays pressed in, with an optional indicator light.",
    category: "actions",
    type: "ui",
    files: ["ui/toggle.tsx"],
    dependencies: ["radix-ui"],
    examples: [{ title: "Toggle", file: "examples/toggle-demo.tsx", Component: ToggleDemo }],
    usage: `import { Toggle } from "@/components/ui/toggle";

<Toggle aria-label="Bold" pressed={bold} onPressedChange={setBold}><Bold /></Toggle>
<Toggle led>Mic live</Toggle>`,
    props: [
      { name: "pressed / defaultPressed", type: "boolean", description: "Controlled / uncontrolled state." },
      { name: "onPressedChange", type: "(pressed: boolean) => void", description: "Called when toggled." },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Height and padding." },
      { name: "led", type: "boolean", default: "false", description: "Adds an indicator light that glows while pressed." },
    ],
    keyboard: [{ keys: "Enter / Space", description: "Toggles the pressed state." }],
  },
  {
    slug: "toggle-group",
    name: "Toggle Group",
    description: "A tray of toggles where one (single) or many (multiple) can be pressed.",
    category: "actions",
    type: "ui",
    files: ["ui/toggle-group.tsx"],
    dependencies: ["radix-ui"],
    examples: [{ title: "Toggle Group", file: "examples/toggle-group-demo.tsx", Component: ToggleGroupDemo }],
    usage: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

<ToggleGroup type="single" value={align} onValueChange={setAlign} aria-label="Alignment">
  <ToggleGroupItem value="left" aria-label="Left"><AlignLeft /></ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Center"><AlignCenter /></ToggleGroupItem>
</ToggleGroup>`,
    props: [
      { name: "type", type: '"single" | "multiple"', description: "Whether one or many items can be pressed." },
      { name: "value / defaultValue", type: "string | string[]", description: "Pressed item(s)." },
      { name: "onValueChange", type: "(value) => void", description: "Called when the pressed items change." },
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Layout and arrow-key direction." },
      { name: "ToggleGroupItem led", type: "boolean", default: "false", description: "Adds an indicator light to an item." },
    ],
    keyboard: [
      { keys: "Tab", description: "Moves focus into and out of the group." },
      { keys: "Arrow keys", description: "Move focus between items." },
      { keys: "Enter / Space", description: "Toggles the focused item." },
    ],
  },
];
