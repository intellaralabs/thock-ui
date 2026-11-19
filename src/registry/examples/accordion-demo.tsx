import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faq = [
  { q: "Is it free?", a: "Yes. Every component is MIT-licensed. Copy it, change it, ship it." },
  { q: "Does it work with shadcn?", a: "It uses the same file layout and a shadcn-compatible registry, so `npx shadcn add` works." },
  { q: "Light or dark?", a: "Both. All colors are CSS variables that switch with a `.dark` class." },
];

export default function AccordionDemo() {
  return (
    <Accordion type="single" collapsible defaultValue="item-0" className="w-full max-w-md">
      {faq.map((f, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger>{f.q}</AccordionTrigger>
          <AccordionContent>{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
