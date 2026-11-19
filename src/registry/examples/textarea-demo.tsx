import { FormField } from "@/components/ui/form-field";
import { Textarea } from "@/components/ui/textarea";

export default function TextareaDemo() {
  return (
    <FormField label="Message" description="It grows with your text." className="w-full max-w-sm">
      <Textarea placeholder="Type your message here…" />
    </FormField>
  );
}
