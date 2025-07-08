import React from "react";
import { Input } from "@/components/ui/input";

interface URLInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const URLInput = React.forwardRef<HTMLInputElement, URLInputProps>(
  ({ error, className = "", ...props }, ref) => {
    return (
      <Input
        type="url"
        className={`${className} ${error ? "border-red-500" : ""}`}
        ref={ref}
        {...props}
      />
    );
  }
);

URLInput.displayName = "URLInput";
