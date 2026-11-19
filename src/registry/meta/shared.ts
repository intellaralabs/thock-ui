/** Prop and keyboard docs reused by several meta files (free and Pro). */

export const asChild = { name: "asChild", type: "boolean", description: "Render your own element (e.g. Next.js <Link>) instead of <a>." };

export const escape = { keys: "Esc", description: "Close and return focus to the trigger." };

export const menuKeys = [
  { keys: "Space / Enter", description: "Open the menu, or activate the focused item." },
  { keys: "↑ / ↓", description: "Move between items." },
  { keys: "→ / ←", description: "Open / close a submenu." },
  { keys: "Type a letter", description: "Jump to the matching item." },
  escape,
];

export const openProps = [
  { name: "open / defaultOpen", type: "boolean", description: "Controlled / uncontrolled open state (on the root)." },
  { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when it opens or closes." },
];

export const placement = [
  { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: "Preferred side (on Content)." },
  { name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "Alignment against the trigger." },
  { name: "sideOffset", type: "number", default: "8", description: "Gap from the trigger in px." },
];

export const controlled = (type: string) => [
  { name: "value / defaultValue", type, description: "Controlled / uncontrolled value." },
  { name: "onValueChange", type: `(value: ${type}) => void`, description: "Called on every change." },
];
