import type { RegistryItem } from "../types";
import AlertDemo from "../examples/alert-demo";
import ProgressDemo from "../examples/progress-demo";
import SpinnerDemo from "../examples/spinner-demo";
import SkeletonDemo from "../examples/skeleton-demo";
import BadgeDemo from "../examples/badge-demo";

export const feedback: RegistryItem[] = [
  {
    slug: "alert",
    name: "Alert",
    description: "An inline message panel. A recessed LED shows the status.",
    category: "feedback",
    type: "ui",
    files: ["ui/alert.tsx"],
    examples: [{ title: "Variants", file: "examples/alert-demo.tsx", Component: AlertDemo }],
    usage: `import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

<Alert variant="warning">
  <AlertTitle>Trial ends soon</AlertTitle>
  <AlertDescription>Add a payment method.</AlertDescription>
</Alert>`,
    props: [
      { name: "variant", type: '"info" | "success" | "warning" | "error"', default: '"info"', description: "Status colour. warning and error use role=alert." },
      { name: "icon", type: "ReactNode", description: "Replace the LED with an icon (it inherits the status colour)." },
    ],
  },
  {
    slug: "progress",
    name: "Progress Bar",
    description: "A glowing bar in a recessed track. It can also be an LED segment meter or indeterminate.",
    category: "feedback",
    type: "ui",
    files: ["ui/progress.tsx"],
    dependencies: ["radix-ui"],
    examples: [{ title: "Bar, segments, indeterminate", file: "examples/progress-demo.tsx", Component: ProgressDemo }],
    usage: `import { Progress } from "@/components/ui/progress";

<Progress value={60} aria-label="Upload" />
<Progress value={60} segments={12} />
<Progress value={null} />  {/* indeterminate */}`,
    props: [
      { name: "value", type: "number | null", description: "Progress, or null for indeterminate." },
      { name: "max", type: "number", default: "100", description: "Upper bound." },
      { name: "segments", type: "number", description: "Render as N LED segments." },
    ],
  },
  {
    slug: "spinner",
    name: "Spinner",
    description: "Loading indicators: a ring, a chasing LED circle, or bouncing dots.",
    category: "feedback",
    type: "ui",
    files: ["ui/spinner.tsx"],
    examples: [{ title: "Variants", file: "examples/spinner-demo.tsx", Component: SpinnerDemo }],
    usage: `import { Spinner } from "@/components/ui/spinner";

<Spinner variant="leds" size={32} />`,
    props: [
      { name: "variant", type: '"ring" | "leds" | "dots"', default: '"ring"', description: "Style." },
      { name: "size", type: "number", default: "24", description: "Size (px)." },
      { name: "label", type: "string", default: '"Loading"', description: "Accessible label." },
    ],
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    description: "Pulsing recessed placeholders for content that's still loading.",
    category: "feedback",
    type: "ui",
    files: ["ui/skeleton.tsx"],
    examples: [{ title: "Post card", file: "examples/skeleton-demo.tsx", Component: SkeletonDemo }],
    usage: `import { Skeleton } from "@/components/ui/skeleton";

<Skeleton className="h-4 w-48" />`,
    props: [{ name: "className", type: "string", description: "Set the size and radius with utilities." }],
  },
  {
    slug: "badge",
    name: "Badge",
    description: "Small status caps: raised, lit or recessed, with an optional status LED.",
    category: "feedback",
    type: "ui",
    files: ["ui/badge.tsx"],
    examples: [{ title: "Variants", file: "examples/badge-demo.tsx", Component: BadgeDemo }],
    usage: `import { Badge } from "@/components/ui/badge";

<Badge status="success">Live</Badge>
<Badge variant="accent">New</Badge>`,
    props: [
      { name: "variant", type: '"key" | "accent" | "well"', default: '"key"', description: "Cap style." },
      { name: "status", type: '"success" | "warning" | "error" | "neutral"', description: "Adds a coloured LED." },
    ],
  },
];
