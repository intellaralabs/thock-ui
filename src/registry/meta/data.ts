import type { RegistryItem } from "../types";
import AvatarDemo from "../examples/avatar-demo";
import CardDemo from "../examples/card-demo";
import KbdDemo from "../examples/kbd-demo";
import SeparatorDemo from "../examples/separator-demo";

export const data: RegistryItem[] = [
  {
    slug: "avatar",
    name: "Avatar",
    description: "Round keys holding a photo or initials, with a status LED. Groups collapse into +N.",
    category: "data",
    type: "ui",
    files: ["ui/avatar.tsx"],
    dependencies: ["radix-ui"],
    examples: [{ title: "Avatars & group", file: "examples/avatar-demo.tsx", Component: AvatarDemo }],
    usage: `import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/components/ui/avatar";

<Avatar status="online">
  <AvatarImage src="/me.jpg" alt="Me" />
  <AvatarFallback>ME</AvatarFallback>
</Avatar>
<AvatarGroup max={3}>{…}</AvatarGroup>`,
    props: [
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Diameter (Avatar, AvatarGroup)." },
      { name: "status", type: '"online" | "away" | "busy" | "offline"', description: "Corner LED." },
      { name: "max", type: "number", description: "Avatars shown before +N (AvatarGroup)." },
    ],
  },
  {
    slug: "card",
    name: "Card",
    description: "A panel with header, content and footer slots, as a dark tray or a raised sheet.",
    category: "data",
    type: "ui",
    files: ["ui/card.tsx"],
    examples: [{ title: "Form card", file: "examples/card-demo.tsx", Component: CardDemo }],
    usage: `import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

<Card>
  <CardHeader><CardTitle>Title</CardTitle><CardDescription>…</CardDescription></CardHeader>
  <CardContent>…</CardContent>
  <CardFooter>…</CardFooter>
</Card>`,
    props: [{ name: "variant", type: '"tray" | "surface"', default: '"tray"', description: "Recessed console or raised sheet." }],
  },
  {
    slug: "kbd",
    name: "Kbd",
    description: "Tiny keycaps for keyboard shortcuts.",
    category: "data",
    type: "ui",
    files: ["ui/kbd.tsx"],
    examples: [{ title: "Shortcuts", file: "examples/kbd-demo.tsx", Component: KbdDemo }],
    usage: `import { Kbd, KbdGroup } from "@/components/ui/kbd";

<KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>`,
  },
  {
    slug: "separator",
    name: "Separator",
    description: "An engraved groove (dark line plus highlight) with an optional centred label.",
    category: "data",
    type: "ui",
    files: ["ui/separator.tsx"],
    dependencies: ["radix-ui"],
    examples: [{ title: "Horizontal, vertical, labelled", file: "examples/separator-demo.tsx", Component: SeparatorDemo }],
    usage: `import { Separator } from "@/components/ui/separator";

<Separator />
<Separator orientation="vertical" />
<Separator label="or" />`,
    props: [
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direction." },
      { name: "label", type: "ReactNode", description: "Centred text (horizontal only)." },
      { name: "decorative", type: "boolean", default: "true", description: "Set false to expose it as role=separator." },
    ],
  },
];
