import { z } from "zod";

export const createEmailSchema = ({
  required = true,
  errorMessages = {},
}: {
  required?: boolean;
  errorMessages?: {
    required?: string;
    invalid?: string;
    max?: string;
  };
} = {}) => {
  const emailSchema = z
    .string({
      required_error: errorMessages.required ?? "This field is required",
      invalid_type_error: errorMessages.invalid ?? "Invalid email format",
    })
    .email(errorMessages.invalid ?? "Invalid email format")
    .max(255, errorMessages.max ?? "Email must be less than 255 characters")
    .refine((val) => {
      if (required && val === undefined)
        return errorMessages.required ?? "This field is required";
      return true;
    });

  return z.object({
    email: emailSchema,
  });
};

export type EmailSchema = z.infer<ReturnType<typeof createEmailSchema>>;
