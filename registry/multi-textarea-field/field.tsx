import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Controller, useFormContext } from "react-hook-form";
import { MultiTextarea, TabDefinition } from "./component";
import { createMultiTextareaSchema } from "./schema";

interface MultiTextareaFieldProps {
  name: string;
  tabs: TabDefinition[];
  label?: string;
  disabled?: boolean;
  required?: boolean;
  errorMessages?: {
    required?: string;
    minLength?: string;
    maxLength?: string;
  };
}

export function MultiTextareaField({
  name,
  tabs,
  label,
  disabled,
  required,
  errorMessages,
}: MultiTextareaFieldProps) {
  const form = useFormContext();
  const schema = createMultiTextareaSchema({
    fields: tabs.map((tab) => tab.id),
    required,
    minLength: 1,
    maxLength: 1000,
    errorMessages,
  });
  return (
    <FormItem>
      {label && (
        <FormLabel className="!text-foreground">
          {label} {required && <span className="text-red-500">*</span>}
        </FormLabel>
      )}
      <Controller
        name={name}
        control={form.control}
        rules={{
          validate: (val) => {
            const result = schema.safeParse(val);
            return result.success || result.error.errors[0]?.message;
          },
        }}
        render={({ field }) => (
          <FormControl>
            <MultiTextarea
              value={field.value}
              onChange={field.onChange}
              tabs={tabs}
              errorMessages={errorMessages}
              disabled={disabled}
              required={required}
            />
          </FormControl>
        )}
      />
      <FormMessage />
    </FormItem>
  );
}
