import * as z from "zod";

export const generalNumberSchema = (
  min?: number,
  max?: number,
  required = false,
  errorMessages?: {
    required?: string;
    invalid?: string;
    min?: string;
    max?: string;
  }
) => {
  const schema = z
    .number({
      invalid_type_error: errorMessages?.invalid ?? "Invalid number",
      required_error: errorMessages?.required ?? "This field is required",
    })
    .superRefine((val, ctx) => {
      if (required && val === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: errorMessages?.required ?? "This field is required",
        });
      }
      if (typeof min === "number" && val < min) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Minimum ${min}`,
        });
      }
      if (typeof max === "number" && val > max) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Maximum ${max}`,
        });
      }
    });

  return schema;
};

export type GeneralNumberSchema = z.infer<
  ReturnType<typeof generalNumberSchema>
>;
