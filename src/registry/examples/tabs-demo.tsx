import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const panels = [
  { value: "overview", label: "Overview", body: "Revenue is up 12% week over week. Three deploys shipped without incident." },
  { value: "analytics", label: "Analytics", body: "2,341 sessions today. Most traffic comes from Instagram and direct visits." },
  { value: "settings", label: "Settings", body: "Notifications are on. Weekly digest goes out every Monday at 9:00." },
];

export default function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList>
        {panels.map((p) => (
          <TabsTrigger key={p.value} value={p.value}>{p.label}</TabsTrigger>
        ))}
      </TabsList>
      {panels.map((p) => (
        <TabsContent key={p.value} value={p.value} className="tactile-surface rounded-2xl p-5 text-sm leading-relaxed text-subtle">
          {p.body}
        </TabsContent>
      ))}
    </Tabs>
  );
}
