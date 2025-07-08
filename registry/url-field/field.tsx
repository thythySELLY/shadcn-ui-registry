import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { URLInput } from "./component";
import { createURLSchema } from "./schema";

interface URLFieldProps {
  name: string;
  required?: boolean;
  errorMessages?: {
    required?: string;
    invalid?: string;
  };
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const URLField: React.FC<URLFieldProps> = ({
  name,
  label,
  required = false,
  errorMessages,
  placeholder = "Enter URL (e.g., https://example.com)",
  disabled = false,
  className = "",
}) => {
  const form = useFormContext();

  const schema = createURLSchema({
    required,
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
        <FormItem>
          <FormLabel className="!text-foreground">
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <URLInput
              {...field}
              placeholder={placeholder}
              disabled={disabled}
              className={className}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
