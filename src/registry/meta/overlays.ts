import type { RegistryItem } from "../types";
import { escape, menuKeys, openProps, placement } from "./shared";
import DialogDemo from "../examples/dialog-demo";
import PopoverDemo from "../examples/popover-demo";
import TooltipDemo from "../examples/tooltip-demo";
import DropdownMenuDemo from "../examples/dropdown-menu-demo";
import SelectDemo from "../examples/select-demo";

export const overlays: RegistryItem[] = [
  {
    slug: "dialog",
    name: "Dialog",
    description: "A modal tray over a dimmed backdrop. Focus is trapped until it closes.",
    category: "overlays",
    type: "ui",
    files: ["ui/dialog.tsx"],
    dependencies: ["radix-ui"],
    examples: [{ title: "Edit profile", file: "examples/dialog-demo.tsx", Component: DialogDemo }],
    usage: `import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader><DialogTitle>Title</DialogTitle></DialogHeader>
    …
  </DialogContent>
</Dialog>`,
    props: [
      ...openProps,
      { name: "showClose", type: "boolean", default: "true", description: "Show the close key in the corner (DialogContent)." },
    ],
    keyboard: [{ keys: "Tab", description: "Cycle focus inside the dialog." }, escape],
  },
  {
    slug: "popover",
    name: "Popover",
    description: "A floating tray anchored to a trigger, for small forms and extra controls.",
    category: "overlays",
    type: "ui",
    files: ["ui/popover.tsx"],
    dependencies: ["radix-ui"],
    examples: [{ title: "Dimensions", file: "examples/popover-demo.tsx", Component: PopoverDemo }],
    usage: `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

<Popover>
  <PopoverTrigger asChild><Button>Open</Button></PopoverTrigger>
  <PopoverContent>…</PopoverContent>
</Popover>`,
    props: [...openProps, ...placement],
    keyboard: [{ keys: "Space / Enter", description: "Toggle from the trigger." }, escape],
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    description: "An inverted label bubble with an arrow, on hover or keyboard focus.",
    category: "overlays",
    type: "ui",
    files: ["ui/tooltip.tsx"],
    dependencies: ["radix-ui"],
    examples: [{ title: "Toolbar", file: "examples/tooltip-demo.tsx", Component: TooltipDemo }],
    usage: `import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

<Tooltip>
  <TooltipTrigger asChild><Button size="icon" aria-label="Bold">B</Button></TooltipTrigger>
  <TooltipContent>Bold ⌘B</TooltipContent>
</Tooltip>`,
    props: [
      ...openProps,
      { name: "delayDuration", type: "number", default: "200", description: "Hover delay in ms (on Tooltip / TooltipProvider)." },
      placement[0],
    ],
    keyboard: [{ keys: "Tab", description: "Focusing the trigger shows the tooltip." }, escape],
  },
  {
    slug: "dropdown-menu",
    name: "Dropdown Menu",
    description: "An action menu with shortcuts, submenus, and LED checkbox and radio items.",
    category: "overlays",
    type: "ui",
    files: ["ui/dropdown-menu.tsx"],
    dependencies: ["radix-ui"],
    examples: [{ title: "Options", file: "examples/dropdown-menu-demo.tsx", Component: DropdownMenuDemo }],
    usage: `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

<DropdownMenu>
  <DropdownMenuTrigger asChild><Button>Options</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onSelect={duplicate}>Duplicate</DropdownMenuItem>
    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    props: [
      ...openProps,
      { name: "variant", type: '"default" | "destructive"', default: '"default"', description: "Item tone (DropdownMenuItem)." },
      { name: "checked / onCheckedChange", type: "boolean", description: "State of a DropdownMenuCheckboxItem." },
      ...placement,
    ],
    keyboard: menuKeys,
  },
  {
    slug: "select",
    name: "Select",
    description: "A key that opens a list of options. Native-feeling, with groups and an LED on the chosen item.",
    category: "overlays",
    type: "ui",
    files: ["ui/select.tsx"],
    dependencies: ["radix-ui"],
    examples: [{ title: "Theme", file: "examples/select-demo.tsx", Component: SelectDemo }],
    usage: `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

<Select value={theme} onValueChange={setTheme}>
  <SelectTrigger><SelectValue placeholder="Theme" /></SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
  </SelectContent>
</Select>`,
    props: [
      { name: "value / defaultValue", type: "string", description: "Controlled / uncontrolled value." },
      { name: "onValueChange", type: "(value: string) => void", description: "Called when an item is chosen." },
      { name: "disabled", type: "boolean", description: "On the root or on single items." },
      { name: "name", type: "string", description: "Submits with a native form." },
    ],
    keyboard: [
      { keys: "Space / Enter / ↓", description: "Open the list." },
      { keys: "↑ / ↓", description: "Move between options." },
      { keys: "Type a letter", description: "Jump to the matching option." },
      escape,
    ],
  },
];
