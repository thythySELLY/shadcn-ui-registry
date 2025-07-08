import { z } from "zod";

interface URLSchemaOptions {
  required?: boolean;
  errorMessages?: {
    required?: string;
    invalid?: string;
  };
}

export const createURLSchema = ({
  required = true,
  errorMessages = {},
}: URLSchemaOptions = {}) => {
  const urlPattern = /^https?:\/\/.+\..+/;

  return z
    .string()
    .trim()
    .superRefine((val, ctx) => {
      if (required && !val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: errorMessages.required ?? "URL is required",
        });
      }
      if (val && !urlPattern.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: errorMessages.invalid ?? "Invalid URL",
        });
      }
    });
};

export type URLSchema = ReturnType<typeof createURLSchema>;
