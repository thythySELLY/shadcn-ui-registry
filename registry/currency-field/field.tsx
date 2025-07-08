import { CurrencyInput } from "./component";
import { createCurrencySchema } from "./schema";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

interface CurrencyFieldProps {
  name: string;
  required?: boolean;
  min?: number;
  max?: number;
  allowDecimals?: boolean;
  prefix?: React.ReactNode;
  errorMessages?: {
    required?: string;
    invalid?: string;
    min?: string;
    max?: string;
  };
  label?: string;
  className?: string;
}

export const CurrencyField = ({
  name,
  required,
  min,
  max,
  allowDecimals = true,
  prefix,
  errorMessages,
  label,
  className,
}: CurrencyFieldProps) => {
  const form = useFormContext();

  const schema = createCurrencySchema({
    required,
    min,
    max,
    allowDecimals,
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
            <CurrencyInput
              {...field}
              prefix={prefix}
              allowDecimals={allowDecimals}
              className={className}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
