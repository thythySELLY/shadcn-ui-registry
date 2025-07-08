import React from "react";
import { useFormContext } from "react-hook-form";
import { JsonTextarea } from "./component";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface JsonTextareaFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  acceptedKeys?: string[];
  className?: string;
}

export const JsonTextareaField: React.FC<JsonTextareaFieldProps> = ({
  name,
  label,
  placeholder,
  acceptedKeys,
  className,
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <JsonTextarea
            {...field}
            placeholder={placeholder}
            error={error?.message}
            acceptedKeys={acceptedKeys}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
