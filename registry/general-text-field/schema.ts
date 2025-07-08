import * as z from "zod";

export const createTextInputSchema = ({
  required = false,
  minLength,
  maxLength,
  pattern,
  errorMessages,
}: {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  errorMessages?: {
    required?: string;
    minLength?: string;
    maxLength?: string;
    pattern?: string;
  };
} = {}) => {
  return z.string().superRefine((val, ctx) => {
    if (required && !val) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: errorMessages?.required ?? "This field is required",
      });
      return;
    }

    if (val) {
      if (typeof minLength === "number" && val.length < minLength) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            errorMessages?.minLength ?? `Minimum ${minLength} characters`,
        });
      }

      if (typeof maxLength === "number" && val.length > maxLength) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            errorMessages?.maxLength ?? `Maximum ${maxLength} characters`,
        });
      }

      if (pattern && !new RegExp(pattern).test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: errorMessages?.pattern ?? "Invalid format",
        });
      }
    }
  });
};
