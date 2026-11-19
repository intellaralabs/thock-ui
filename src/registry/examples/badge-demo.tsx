import { Badge } from "@/components/ui/badge";

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Badge>Default</Badge>
      <Badge variant="accent">New</Badge>
      <Badge variant="well">v2.4.0</Badge>
      <Badge status="success">Live</Badge>
      <Badge status="warning">Degraded</Badge>
      <Badge status="error">Down</Badge>
      <Badge variant="well" status="neutral">Draft</Badge>
    </div>
  );
}
