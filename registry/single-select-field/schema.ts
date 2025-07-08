import { z } from "zod";

interface SingleSelectSchemaOptions {
  required?: boolean;
  errorMessages?: {
    required?: string;
    invalid?: string;
  };
}

export const createSingleSelectSchema = ({
  required = true,
  errorMessages = {},
}: SingleSelectSchemaOptions = {}) => {
  return z
    .string({
      invalid_type_error: errorMessages.invalid ?? "Invalid selection",
    })
    .nullable()
    .refine(
      (val) => {
        if (!required && val === null) return true;
        return val !== null && val.length > 0;
      },
      {
        message: errorMessages.required ?? "Please select an option",
      }
    );
};

export type SingleSelectSchema = z.infer<
  ReturnType<typeof createSingleSelectSchema>
>;
