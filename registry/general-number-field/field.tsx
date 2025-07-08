/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useFormContext } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { GeneralNumberInput, GeneralNumberInputProps } from "./component";
import { generalNumberSchema } from "./schema";

interface GeneralNumberFieldProps extends GeneralNumberInputProps {
  name: string;
  label?: string;
  errorMessage?: {
    required?: string;
    invalid?: string;
    min?: string;
    max?: string;
  };
  quickOptions?: {
    value: number;
    label: string;
  }[];
}

export function GeneralNumberField({
  name,
  label,
  errorMessage,
  required,
  quickOptions,
  ...props
}: GeneralNumberFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const schema = generalNumberSchema(
    props.min,
    props.max,
    required,
    errorMessage
  );

  function getErrorMessage(errors: any, name: string) {
    return name
      .split(".")
      .reduce((acc, key) => (acc ? acc[key] : undefined), errors)?.message;
  }

  return (
    <FormItem>
      {label && (
        <FormLabel className="!text-foreground">
          {label} {required && <span className="text-red-500">*</span>}
        </FormLabel>
      )}
      <FormControl>
        <Controller
          name={name}
          control={control}
          rules={{
            validate: (val) => {
              const result = schema.safeParse(val);
              if (!result.success) {
                return result.error.errors[0].message;
              }
              return true;
            },
          }}
          render={({ field }) => (
            <GeneralNumberInput
              {...field}
              {...props}
              onValueChange={(value) => field.onChange(value)}
              quickOptions={quickOptions}
            />
          )}
        />
      </FormControl>
      <FormMessage>{getErrorMessage(errors, name)}</FormMessage>
    </FormItem>
  );
}
