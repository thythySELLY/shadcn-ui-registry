import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { EmailInput } from "./component";
import { createEmailSchema } from "./schema";

interface EmailFieldProps {
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

export const EmailField: React.FC<EmailFieldProps> = ({
  name,
  label,
  required = false,
  errorMessages,
  placeholder = "Enter email address",
  disabled = false,
  className = "",
}) => {
  const schema = createEmailSchema({
    errorMessages,
  });

  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      rules={{
        validate: (val) => {
          const result = schema.safeParse({ email: val });
          if (!result.success) {
            return result.error.errors[0]?.message;
          }
          return true;
        },
      }}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="!text-foreground">
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <EmailInput
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
