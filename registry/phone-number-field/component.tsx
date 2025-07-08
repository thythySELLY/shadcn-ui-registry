import {
  InputBase,
  InputBaseAdornment,
  InputBaseControl,
  InputBaseInput,
} from "@/components/ui/input-base";
import { useMemo } from "react";

interface PhoneNumberInputProps {
  value?: string;
  onChange: (val: string) => void;
  disabled?: boolean;
  prefix?: React.ReactNode;
  placeholder?: string;
  limitLength?: number;
}

export const PhoneNumberInput = ({
  value,
  onChange,
  disabled,
  prefix,
  placeholder,
  limitLength,
}: PhoneNumberInputProps) => {
  const displayValue = useMemo(() => {
    if (!value) return "";
    const cleaned = value.replace(/\D/g, "");

    // Handle local format (starting with 0)
    if (value.startsWith("0")) {
      const match = cleaned.match(/^(\d{4})(\d{3})(\d{3})$/);
      if (match) {
        return `${match[1]} ${match[2]} ${match[3]}`;
      }
    }

    // Handle international format
    const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
    }
    return value;
  }, [value]);

  return (
    <InputBase>
      {prefix && <InputBaseAdornment>{prefix}</InputBaseAdornment>}
      <InputBaseControl>
        <InputBaseInput
          inputMode="tel"
          type="tel"
          disabled={disabled}
          value={displayValue}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^\d+]/g, "");
            // Allow only valid patterns and limit length
            if (raw.startsWith("+")) {
              if (/^\+?\d*$/.test(raw) && raw.length <= 15) onChange(raw);
            } else if (raw.startsWith("0")) {
              if (/^0\d*$/.test(raw) && raw.length <= 10) onChange(raw);
            } else if (raw === "") {
              onChange(raw);
            }
          }}
          placeholder={placeholder}
          maxLength={limitLength}
        />
      </InputBaseControl>
    </InputBase>
  );
};
