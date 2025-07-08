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
import { GeneralTextInput } from "./component";
import { createTextInputSchema } from "./schema";

export interface GeneralTextFieldProps<T extends FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "form" | "size"> {
  name: Path<T>;
  label: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  errorMessages?: {
    required?: string;
    minLength?: string;
    maxLength?: string;
    pattern?: string;
  };
  isLoading?: boolean;
}

export function GeneralTextField<T extends FieldValues>({
  label,
  name,
  required,
  minLength,
  maxLength,
  pattern,
  className,
  errorMessages,
  isLoading,
  ...props
}: GeneralTextFieldProps<T>) {
  const form = useFormContext<T>();

  const schema = createTextInputSchema({
    required,
    errorMessages,
    minLength,
    maxLength,
    pattern,
  });

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
          <FormLabel className="!text-foreground">
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <GeneralTextInput
              error={!!fieldState.error}
              {...field}
              {...props}
              disabled={isLoading}
              isLoading={isLoading}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
