import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface GeneralNumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "prefix" | "onChange"
  > {
  prefix?: string;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number | undefined) => void;
  quickOptions?: {
    value: number;
    label: string;
  }[];
  quickOptionsClassName?: string;
}

export const GeneralNumberInput = React.forwardRef<
  HTMLInputElement,
  GeneralNumberInputProps
>(
  (
    {
      prefix,
      className,
      min,
      max,
      step,
      onValueChange,
      quickOptions,
      quickOptionsClassName,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();

      if (value === "") {
        onValueChange?.(undefined);
        return;
      }

      const numValue = Number(value);
      if (isNaN(numValue)) return;

      const isValid =
        (min === undefined || numValue >= min) &&
        (max === undefined || numValue <= max);

      if (!isValid) return;

      onValueChange?.(numValue);
    };

    const handleQuickOptionClick = (value: string | number) => {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        onValueChange?.(numValue);
      }
    };

    return (
      <div className="space-y-2">
        <div className="relative flex items-center">
          {prefix && (
            <span
              className="absolute left-3 text-foreground"
              aria-hidden="true"
            >
              {prefix}
            </span>
          )}
          <Input
            type="number"
            className={cn(prefix && "pl-8", className)}
            onChange={handleChange}
            min={min}
            max={max}
            step={step}
            aria-label={props["aria-label"] || "Number input"}
            ref={ref}
            {...props}
          />
        </div>

        {quickOptions && quickOptions.length > 0 && (
          <div
            className={cn(
              "flex flex-wrap gap-2 cursor-pointer",
              quickOptionsClassName
            )}
          >
            {quickOptions.map((option, index) => (
              <Button
                key={index}
                size="sm"
                variant="outline"
                onClick={() => handleQuickOptionClick(option.value)}
                type="button"
                className="hover:bg-primary hover:text-primary-foreground cursor-pointer"
              >
                {option.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

GeneralNumberInput.displayName = "GeneralNumberInput";
