import { z } from "zod";

/**
 * Options for creating a currency validation schema
 */
interface CurrencySchemaOptions {
  required?: boolean;
  min?: number;
  max?: number;
  allowDecimals?: boolean;
  allowNegative?: boolean;
  errorMessages?: {
    required?: string;
    invalid?: string;
    min?: string;
    max?: string;
  };
}

/**
 * Creates a Zod schema for currency validation
 */
export const createCurrencySchema = ({
  required = true,
  min,
  max,
  allowDecimals = true,
  allowNegative = false,
  errorMessages = {},
}: CurrencySchemaOptions = {}) => {
  // Create regex pattern
  const pattern = allowDecimals
    ? new RegExp(`^${allowNegative ? "-?" : ""}\\d+(\\.\\d{1,2})?$`)
    : new RegExp(`^${allowNegative ? "-?" : ""}\\d+$`);

  return z.preprocess(
    (val) => {
      if (val === null || val === undefined) return null;
      const str = String(val).trim();
      if (!str) return null;
      return pattern.test(str) ? Number(str) : null;
    },
    z
      .number({
        invalid_type_error: errorMessages.invalid ?? "Invalid currency format",
      })
      .nullable()
      .refine(
        (val) => {
          if (!required && val === null) return true;
          return val !== null;
        },
        {
          message: errorMessages.required ?? "Required",
        }
      )
      .refine(
        (val) => {
          if (val === null) return true;
          if (min !== undefined && val < min) return false;
          if (max !== undefined && val > max) return false;
          return true;
        },
        {
          message:
            min !== undefined && max !== undefined
              ? `Value must be between ${min} and ${max}`
              : min !== undefined
              ? `Must be greater than or equal to ${min}`
              : max !== undefined
              ? `Must be less than or equal to ${max}`
              : "Invalid value",
        }
      )
  );
};
