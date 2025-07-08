import {
  InputBase,
  InputBaseAdornment,
  InputBaseControl,
  InputBaseInput,
} from "@/components/ui/input-base";
import { useMemo } from "react";

interface CurrencyInputProps {
  value?: string | number;
  onChange: (val: string) => void;
  prefix?: React.ReactNode;
  allowDecimals?: boolean;
  disabled?: boolean;
  maxLength?: number;
  className?: string;
}

export const CurrencyInput = ({
  value,
  onChange,
  prefix = "$",
  allowDecimals = true,
  disabled,
  maxLength,
  className,
}: CurrencyInputProps) => {
  const displayValue = useMemo(() => {
    if (value === undefined || value === null) return "";
    const val = typeof value === "number" ? value.toString() : value;
    return val.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }, [value]);

  return (
    <InputBase className={className}>
      {prefix && <InputBaseAdornment>{prefix}</InputBaseAdornment>}
      <InputBaseControl>
        <InputBaseInput
          inputMode="decimal"
          type="text"
          disabled={disabled}
          value={displayValue}
          onChange={(e) => {
            let raw = e.target.value.replace(/,/g, "");
            if (!allowDecimals) raw = raw.replace(/\./g, "");
            if (maxLength) raw = raw.slice(0, maxLength);
            if (/^\d*\.?\d*$/.test(raw)) onChange(raw);
          }}
        />
      </InputBaseControl>
    </InputBase>
  );
};
