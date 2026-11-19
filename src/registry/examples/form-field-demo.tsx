"use client";

import { useState } from "react";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";

export default function FormFieldDemo() {
  const [email, setEmail] = useState("sam@");
  const invalid = email.length > 0 && !/^\S+@\S+\.\S+$/.test(email);
  return (
    <div className="grid w-full max-w-sm gap-6">
      <FormField label="Username" description="This is your public display name.">
        <Input placeholder="samcarter" />
      </FormField>
      <FormField label="Email" required error={invalid ? "Enter a valid email address." : undefined}>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormField>
    </div>
  );
}
