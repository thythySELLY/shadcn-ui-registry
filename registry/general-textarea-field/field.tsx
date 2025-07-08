"use client";

import * as React from "react";
import { type Path, type FieldValues, useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { GenerateTextarea } from "./component";
import { createGeneralTextareaSchema } from "./schema";

export interface GeneralTextareaFieldProps<T extends FieldValues>
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "form"> {
  name: Path<T>;
  label?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

export function GeneralTextareaField<T extends FieldValues>({
  name,
  label,
  placeholder,
  className,
  required = false,
  disabled = false,
  minLength = 1,
  maxLength = 1000,
  ...props
}: GeneralTextareaFieldProps<T>) {
  const form = useFormContext();

  const schema = createGeneralTextareaSchema(minLength, maxLength, required);
  return (
    <FormField
      control={form.control}
      name={name}
      rules={{
        validate: (val) => {
          const result = schema.safeParse(val);
          return result.success || result.error.errors[0]?.message;
        },
      }}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel className="!text-foreground">
              {label} {required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <GenerateTextarea
              {...field}
              {...props}
              placeholder={placeholder}
              disabled={disabled}
              error={!!fieldState.error}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
