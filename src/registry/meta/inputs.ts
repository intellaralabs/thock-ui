import type { RegistryItem } from "../types";
import LabelDemo from "../examples/label-demo";
import FormFieldDemo from "../examples/form-field-demo";
import InputDemo from "../examples/input-demo";
import TextareaDemo from "../examples/textarea-demo";
import PasswordInputDemo from "../examples/password-input-demo";
import SearchInputDemo from "../examples/search-input-demo";
import CheckboxDemo from "../examples/checkbox-demo";
import RadioGroupDemo from "../examples/radio-group-demo";
import SwitchDemo from "../examples/switch-demo";

export const inputs: RegistryItem[] = [
  {
    slug: "input",
    name: "Input",
    description: "A text field sunk into the surface, with a focus ring and invalid state.",
    category: "inputs",
    type: "ui",
    files: ["ui/input.tsx"],
    examples: [{ title: "Input", file: "examples/input-demo.tsx", Component: InputDemo }],
    usage: `import { Input } from "@/components/ui/input";

<Input type="email" placeholder="you@example.com" />`,
    props: [{ name: "...props", type: "ComponentProps<\"input\">", description: "All native input props. Set aria-invalid for the error ring." }],
  },
  {
    slug: "textarea",
    name: "Textarea",
    description: "A multi-line well that grows with its content.",
    category: "inputs",
    type: "ui",
    files: ["ui/textarea.tsx"],
    registryDependencies: ["form-field"],
    examples: [{ title: "Textarea", file: "examples/textarea-demo.tsx", Component: TextareaDemo }],
    usage: `import { Textarea } from "@/components/ui/textarea";

<Textarea placeholder="Type your message here…" />`,
    props: [{ name: "...props", type: "ComponentProps<\"textarea\">", description: "All native textarea props." }],
  },
  {
    slug: "password-input",
    name: "Password Input",
    description: "A password field with a key to reveal or hide the value.",
    category: "inputs",
    type: "ui",
    files: ["ui/password-input.tsx"],
    examples: [{ title: "Password Input", file: "examples/password-input-demo.tsx", Component: PasswordInputDemo }],
    usage: `import { PasswordInput } from "@/components/ui/password-input";

<PasswordInput name="password" autoComplete="new-password" />`,
    props: [{ name: "...props", type: "ComponentProps<\"input\">", description: "All native input props except type." }],
    keyboard: [{ keys: "Tab", description: "Moves from the field to the show/hide key." }],
  },
  {
    slug: "search-input",
    name: "Search Input",
    description: "A search well with an icon, a clear key and an optional shortcut hint.",
    category: "inputs",
    type: "ui",
    files: ["ui/search-input.tsx"],
    examples: [{ title: "Search Input", file: "examples/search-input-demo.tsx", Component: SearchInputDemo }],
    usage: `import { SearchInput } from "@/components/ui/search-input";

<SearchInput value={query} onValueChange={setQuery} shortcut="⌘K" />`,
    props: [
      { name: "value / defaultValue", type: "string", description: "Controlled / uncontrolled value." },
      { name: "onValueChange", type: "(value: string) => void", description: "Called on every change." },
      { name: "shortcut", type: "string", description: "Hint shown on the right while empty." },
    ],
    keyboard: [{ keys: "Escape", description: "Clears the field." }],
  },
  {
    slug: "label",
    name: "Label",
    description: "An accessible label for any control.",
    category: "inputs",
    type: "ui",
    files: ["ui/label.tsx"],
    dependencies: ["radix-ui"],
    registryDependencies: ["checkbox"],
    examples: [{ title: "Label", file: "examples/label-demo.tsx", Component: LabelDemo }],
    usage: `import { Label } from "@/components/ui/label";

<Label htmlFor="email">Email</Label>`,
  },
  {
    slug: "form-field",
    name: "Form Field",
    description: "Wires a label, helper text and an error message to any control, with the right aria attributes.",
    category: "inputs",
    type: "ui",
    files: ["ui/form-field.tsx"],
    registryDependencies: ["label", "input"],
    examples: [{ title: "Form Field", file: "examples/form-field-demo.tsx", Component: FormFieldDemo }],
    usage: `import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";

<FormField label="Email" required error={errors.email}>
  <Input type="email" {...register("email")} />
</FormField>`,
    props: [
      { name: "label", type: "ReactNode", description: "Label text." },
      { name: "description", type: "ReactNode", description: "Helper text, linked via aria-describedby." },
      { name: "error", type: "ReactNode", description: "Error message; marks the control aria-invalid and announces it." },
      { name: "required", type: "boolean", description: "Adds a required marker and the required attribute." },
      { name: "children", type: "ReactElement", description: "A single control. It receives id and aria props." },
    ],
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    description: "A small key that latches with a red check. Supports the indeterminate state.",
    category: "inputs",
    type: "ui",
    files: ["ui/checkbox.tsx"],
    dependencies: ["radix-ui"],
    registryDependencies: ["label"],
    examples: [{ title: "Checkbox", file: "examples/checkbox-demo.tsx", Component: CheckboxDemo }],
    usage: `import { Checkbox } from "@/components/ui/checkbox";

<Checkbox id="terms" checked={agreed} onCheckedChange={setAgreed} />`,
    props: [
      { name: "checked / defaultChecked", type: 'boolean | "indeterminate"', description: "Controlled / uncontrolled state." },
      { name: "onCheckedChange", type: "(checked) => void", description: "Called when toggled." },
    ],
    keyboard: [{ keys: "Space", description: "Toggles the checkbox." }],
  },
  {
    slug: "radio-group",
    name: "Radio Group",
    description: "Recessed sockets that light up with a raised red pip when chosen.",
    category: "inputs",
    type: "ui",
    files: ["ui/radio-group.tsx"],
    dependencies: ["radix-ui"],
    registryDependencies: ["label"],
    examples: [{ title: "Radio Group", file: "examples/radio-group-demo.tsx", Component: RadioGroupDemo }],
    usage: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

<RadioGroup value={plan} onValueChange={setPlan}>
  <RadioGroupItem value="pro" id="pro" />
</RadioGroup>`,
    props: [
      { name: "value / defaultValue", type: "string", description: "Selected value." },
      { name: "onValueChange", type: "(value: string) => void", description: "Called when the selection changes." },
      { name: "orientation", type: '"horizontal" | "vertical"', description: "Arrow-key direction." },
    ],
    keyboard: [
      { keys: "Tab", description: "Moves focus to the selected item." },
      { keys: "Arrow keys", description: "Move and select the next/previous item." },
    ],
  },
  {
    slug: "switch",
    name: "Switch",
    description: "A raised knob sliding in a recessed well, with an indicator light when on.",
    category: "inputs",
    type: "ui",
    files: ["ui/switch.tsx"],
    dependencies: ["radix-ui"],
    registryDependencies: ["label"],
    isNew: true,
    examples: [{ title: "Switch", file: "examples/switch-demo.tsx", Component: SwitchDemo }],
    usage: `import { Switch } from "@/components/ui/switch";

<Switch checked={wifi} onCheckedChange={setWifi} aria-label="Wi-Fi" />`,
    props: [
      { name: "checked / defaultChecked", type: "boolean", description: "Controlled / uncontrolled state." },
      { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Called when toggled." },
      { name: "size", type: '"sm" | "md"', default: '"md"', description: "Switch size." },
    ],
    keyboard: [{ keys: "Space / Enter", description: "Toggles the switch." }],
  },
];
