"use client";

import { cloneElement, isValidElement, useId, type ReactElement, type ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type ControlProps = {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  required?: boolean;
};

export type FormFieldProps = {
  label: ReactNode;
  description?: ReactNode;
  /** When set, the field is marked invalid and the message is announced. */
  error?: ReactNode;
  required?: boolean;
  /** A single form control, e.g. <Input />. It receives id and aria attributes. */
  children: ReactElement<ControlProps>;
  className?: string;
};

export function FormField({ label, description, error, required, children, className }: FormFieldProps) {
  const id = useId();
  const controlId = (isValidElement(children) && children.props.id) || `${id}-control`;
  const descId = description ? `${id}-desc` : undefined;
  const errId = error ? `${id}-error` : undefined;

  return (
    <div data-slot="form-field" className={cn("grid gap-2", className)}>
      <Label htmlFor={controlId}>
        {label}
        {required && <span className="ml-0.5 text-brand" aria-hidden>*</span>}
      </Label>
      {cloneElement(children, {
        id: controlId,
        required,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": [descId, errId].filter(Boolean).join(" ") || undefined,
      })}
      {description && !error && (
        <p id={descId} className="text-[13px] text-subtle">{description}</p>
      )}
      {error && (
        <p id={errId} role="alert" className="flex items-center gap-1.5 text-[13px] text-brand">
          <span aria-hidden className="tactile-led size-1.5" data-on="" />
          {error}
        </p>
      )}
    </div>
  );
}
