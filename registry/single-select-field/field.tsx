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
import { SingleSelect, type Option } from "./component";
import { createSingleSelectSchema } from "./schema";

export interface SingleSelectFieldProps<T extends FieldValues>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "form"> {
  name: Path<T>;
  label: string;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  clearable?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  required?: boolean;
  customTriggerRender?: (
    selectedOption: Option | null,
    placeholder?: string
  ) => React.ReactNode;
  customItemRender?: (option: Option, isSelected: boolean) => React.ReactNode;
  errorMessages?: {
    required?: string;
    invalid?: string;
  };
}

export function SingleSelectField<T extends FieldValues>({
  label,
  name,
  options,
  placeholder,
  disabled,
  className,
  triggerClassName,
  contentClassName,
  itemClassName,
  variant,
  size,
  clearable,
  loading,
  emptyMessage,
  required,
  customTriggerRender,
  customItemRender,
  errorMessages,
}: SingleSelectFieldProps<T>) {
  const schema = createSingleSelectSchema({
    required,
    errorMessages,
  });

  const form = useFormContext();

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
      render={({ field, formState: { errors } }) => (
        <FormItem className={className}>
          <FormLabel className="!text-foreground">
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <SingleSelect
              value={field.value || ""}
              onChange={(value) => field.onChange(value)}
              options={options}
              placeholder={placeholder}
              disabled={disabled}
              triggerClassName={triggerClassName}
              contentClassName={contentClassName}
              itemClassName={itemClassName}
              variant={variant}
              size={size}
              clearable={clearable}
              loading={loading}
              emptyMessage={emptyMessage}
              customTriggerRender={customTriggerRender}
              customItemRender={customItemRender}
            />
          </FormControl>
          <FormMessage>{errors[name]?.message as string}</FormMessage>
        </FormItem>
      )}
    />
  );
}
