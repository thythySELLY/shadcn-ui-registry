import { z } from "zod";

export interface Option {
  value: string;
  name: string;
  disabled?: boolean;
}

export const createMultiSelectSchema = ({
  required = false,
  min,
  max,
  errorMessages = {},
}: {
  required?: boolean;
  min?: number;
  max?: number;
  errorMessages?: {
    required?: string;
    min?: string;
    max?: string;
    invalid?: string;
  };
} = {}) => {
  const schema = z
    .array(
      z.object({
        value: z.string(),
        name: z.string(),
        disabled: z.boolean().optional(),
      })
    )
    .superRefine((val, ctx) => {
      if (required && val.length === 0)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: errorMessages.required ?? "This field is required",
        });
      if (min !== undefined && val.length < min)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            errorMessages.min ?? `Please select at least ${min} option(s)`,
        });
      if (max !== undefined && val.length > max)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            errorMessages.max ?? `Please select at most ${max} option(s)`,
        });
      if (errorMessages.invalid)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: errorMessages.invalid,
        });
    });

  return schema;
};

export type MultiSelectSchema = z.infer<
  ReturnType<typeof createMultiSelectSchema>
>;
