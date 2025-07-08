import { z } from "zod";

export const createGeneralTextareaSchema = (
  minLength: number,
  maxLength: number,
  required: boolean
) => {
  const baseSchema = z
    .string()
    .min(minLength, `Minimum ${minLength} characters allowed`)
    .max(maxLength, `Maximum ${maxLength} characters allowed`);

  return z.object({
    value: required ? baseSchema : baseSchema.optional(),
  });
};

export type GeneralTextareaSchema = z.infer<
  ReturnType<typeof createGeneralTextareaSchema>
>;
