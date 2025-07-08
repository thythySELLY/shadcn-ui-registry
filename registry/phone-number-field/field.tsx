import { useFormContext } from "react-hook-form";
import { PhoneNumberInput } from "./component";
import { createPhoneNumberSchema } from "./schema";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

interface PhoneNumberFieldProps {
  name: string;
  required?: boolean;
  errorMessages?: {
    required?: string;
    invalid?: string;
    length?: string;
  };
  prefix?: React.ReactNode;
  placeholder?: string;
  limitLength?: number;
  label?: string;
}

export const PhoneNumberField = ({
  name,
  required,
  errorMessages,
  prefix,
  placeholder,
  limitLength,
  label,
}: PhoneNumberFieldProps) => {
  const form = useFormContext();

  const schema = createPhoneNumberSchema({
    required,
    errorMessages,
    limitLength,
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
            <PhoneNumberInput
              {...field}
              prefix={prefix}
              placeholder={placeholder}
              limitLength={limitLength}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
