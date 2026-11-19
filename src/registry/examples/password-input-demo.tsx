import { FormField } from "@/components/ui/form-field";
import { PasswordInput } from "@/components/ui/password-input";

export default function PasswordInputDemo() {
  return (
    <FormField label="Password" className="w-full max-w-sm">
      <PasswordInput placeholder="••••••••" defaultValue="tactile-ui" />
    </FormField>
  );
}
