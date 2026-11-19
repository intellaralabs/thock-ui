import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsVertical() {
  return (
    <Tabs defaultValue="eq" orientation="vertical" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="eq" led className="justify-start">EQ</TabsTrigger>
        <TabsTrigger value="comp" led className="justify-start">Compressor</TabsTrigger>
        <TabsTrigger value="reverb" led className="justify-start">Reverb</TabsTrigger>
      </TabsList>
      <TabsContent value="eq" className="flex-1 text-sm text-subtle">Shape the tone with a 5-band EQ.</TabsContent>
      <TabsContent value="comp" className="flex-1 text-sm text-subtle">Even out dynamics. Ratio 4:1, attack 10 ms.</TabsContent>
      <TabsContent value="reverb" className="flex-1 text-sm text-subtle">Hall, 2.4 s decay, 18% wet.</TabsContent>
    </Tabs>
  );
}
