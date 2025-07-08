import * as React from "react";
import { useFormContext } from "react-hook-form";
import { MultiSelect } from "./component";
import { createMultiSelectSchema, Option } from "./schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export interface MultiSelectFieldProps {
  name: string;
  label?: string;
  options: Option[];
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "ghost";
  required?: boolean;
  min?: number;
  max?: number;
  maxSelectedDisplay?: number;
  searchable?: boolean;
  clearable?: boolean;
  selectAllOption?: boolean;
  errorMessages?: {
    required?: string;
    min?: string;
    max?: string;
    invalid?: string;
  };
}

export function MultiSelectField({
  name,
  label,
  options,
  placeholder,
  searchPlaceholder,
  disabled,
  className,
  size,
  variant,
  required,
  min,
  max,
  maxSelectedDisplay,
  searchable,
  clearable,
  selectAllOption,
  errorMessages,
}: MultiSelectFieldProps) {
  const form = useFormContext();

  const schema = createMultiSelectSchema({
    required,
    min,
    max,
    errorMessages,
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
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel className="!text-foreground">
              {label} {required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <MultiSelect
              options={options}
              value={field.value}
              onChange={field.onChange}
              placeholder={placeholder}
              searchPlaceholder={searchPlaceholder}
              disabled={disabled}
              size={size}
              variant={variant}
              maxSelectedDisplay={maxSelectedDisplay}
              searchable={searchable}
              clearable={clearable}
              selectAllOption={selectAllOption}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
