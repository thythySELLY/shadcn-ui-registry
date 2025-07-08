import * as z from "zod";

export const createMultiTextareaSchema = <T extends string>({
  fields,
  required = false,
  minLength,
  maxLength,
  errorMessages,
}: {
  fields: T[];
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  errorMessages?: {
    required?: string;
    minLength?: string;
    maxLength?: string;
  };
}) => {
  const textSchema = z
    .string()
    .transform((val) => val || undefined)
    .pipe(
      z
        .string()
        .min(minLength ?? 0, errorMessages?.minLength ?? "Minimum length is 0")
        .max(
          maxLength ?? 1000,
          errorMessages?.maxLength ?? "Maximum length is 1000"
        )
        .optional()
    );

  return z.object(
    fields.reduce(
      (acc, field) => ({
        ...acc,
        [field]: required
          ? textSchema
          : textSchema.optional().refine((val) => {
              if (required && !val) {
                return errorMessages?.required;
              }
            }),
      }),
      {} as Record<T, z.ZodType>
    )
  );
};

export type MultiTextareaSchema<T extends string> = ReturnType<
  typeof createMultiTextareaSchema<T>
>;
