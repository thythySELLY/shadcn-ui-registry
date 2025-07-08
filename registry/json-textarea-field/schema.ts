import { z } from "zod";

export const createJsonTextareaSchema = (acceptedKeys?: string[]) => {
  return z.object({
    value: z
      .string()
      .min(1, "JSON is required")
      .transform((str, ctx) => {
        try {
          const parsed = JSON.parse(str);
          if (typeof parsed !== "object" || parsed === null) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Invalid JSON object",
            });
            return z.NEVER;
          }

          if (acceptedKeys && acceptedKeys.length > 0) {
            const invalidKeys = Object.keys(parsed).filter(
              (key) => !acceptedKeys.includes(key)
            );
            if (invalidKeys.length > 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Invalid keys found: ${invalidKeys.join(
                  ", "
                )}. Accepted keys are: ${acceptedKeys.join(", ")}`,
              });
              return z.NEVER;
            }
          }

          return parsed;
        } catch {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid JSON syntax",
          });
          return z.NEVER;
        }
      }),
  });
};

export type JsonTextareaSchema = z.infer<
  ReturnType<typeof createJsonTextareaSchema>
>;
