import { z } from "zod";

interface PhoneNumberSchemaOptions {
  required?: boolean;
  errorMessages?: {
    required?: string;
    invalid?: string;
    length?: string;
  };
  limitLength?: number;
}

export const createPhoneNumberSchema = ({
  required = true,
  errorMessages = {},
  limitLength,
}: PhoneNumberSchemaOptions = {}) => {
  // Two patterns: international (+XX...) or local (0...)
  const internationalPattern = /^\+[1-9]\d{1,14}$/;
  const localPattern = /^0\d{9}$/;

  return z.preprocess(
    (val) => {
      if (val === null || val === undefined) return null;
      const str = String(val)
        .trim()
        .replace(/[-()\s]/g, "");
      if (!str) return null;
      return internationalPattern.test(str) || localPattern.test(str)
        ? str
        : null;
    },
    z
      .string({
        invalid_type_error:
          errorMessages.invalid ?? "Invalid phone number format",
      })
      .nullable()
      .refine(
        (val) => {
          if (!required && val === null) return true;
          if (val === null) return false;
          if (val.startsWith("+")) {
            return val.length <= (limitLength ?? 15);
          } else {
            return val.length === (limitLength ?? 10);
          }
        },
        {
          message: required
            ? errorMessages.required ?? "Phone number is required"
            : errorMessages.invalid ?? "Invalid phone number",
        }
      )
  );
};
