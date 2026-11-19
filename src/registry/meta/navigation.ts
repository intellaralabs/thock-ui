import type { RegistryItem } from "../types";
import TabsDemo from "../examples/tabs-demo";
import TabsVertical from "../examples/tabs-vertical";
import AccordionDemo from "../examples/accordion-demo";

export const navigation: RegistryItem[] = [
  {
    slug: "tabs",
    name: "Tabs",
    description: "Tab keys in a tray. The active tab rises and lights up, with optional LEDs.",
    category: "navigation",
    type: "ui",
    files: ["ui/tabs.tsx"],
    dependencies: ["radix-ui"],
    examples: [
      { title: "Tabs", file: "examples/tabs-demo.tsx", Component: TabsDemo },
      { title: "Vertical with LEDs", file: "examples/tabs-vertical.tsx", Component: TabsVertical },
    ],
    usage: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

<Tabs defaultValue="a">
  <TabsList>
    <TabsTrigger value="a">Account</TabsTrigger>
    <TabsTrigger value="b">Billing</TabsTrigger>
  </TabsList>
  <TabsContent value="a">…</TabsContent>
  <TabsContent value="b">…</TabsContent>
</Tabs>`,
    props: [
      { name: "value / defaultValue", type: "string", description: "Active tab (on Tabs)." },
      { name: "onValueChange", type: "(value: string) => void", description: "Called when the tab changes." },
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Layout and arrow-key direction." },
      { name: "activationMode", type: '"automatic" | "manual"', default: '"automatic"', description: "Whether focus alone switches tabs." },
      { name: "led", type: "boolean", default: "false", description: "Show an LED on the trigger (TabsTrigger)." },
    ],
    keyboard: [
      { keys: "← / → (↑ / ↓ vertical)", description: "Move between tabs." },
      { keys: "Home / End", description: "First / last tab." },
      { keys: "Tab", description: "Move into the panel." },
    ],
  },
  {
    slug: "accordion",
    name: "Accordion",
    description: "Stacked sections that expand smoothly. Each header has an LED and a chevron key.",
    category: "navigation",
    type: "ui",
    files: ["ui/accordion.tsx"],
    dependencies: ["radix-ui"],
    examples: [{ title: "FAQ", file: "examples/accordion-demo.tsx", Component: AccordionDemo }],
    usage: `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

<Accordion type="single" collapsible>
  <AccordionItem value="1">
    <AccordionTrigger>Is it free?</AccordionTrigger>
    <AccordionContent>Yes.</AccordionContent>
  </AccordionItem>
</Accordion>`,
    props: [
      { name: "type", type: '"single" | "multiple"', description: "One or many open sections." },
      { name: "collapsible", type: "boolean", description: "Allow closing the open section (single only)." },
      { name: "value / defaultValue", type: "string | string[]", description: "Open section(s), shaped by type." },
      { name: "onValueChange", type: "(value) => void", description: "Called on change." },
    ],
    keyboard: [
      { keys: "Space / Enter", description: "Toggle the focused section." },
      { keys: "↑ / ↓", description: "Move between headers." },
      { keys: "Home / End", description: "First / last header." },
    ],
  },
];
