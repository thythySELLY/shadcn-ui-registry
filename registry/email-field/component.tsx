import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface EmailInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  className?: string;
}

export const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <Input
        type="email"
        className={cn(className, error ? "border-red-500" : "")}
        ref={ref}
        {...props}
      />
    );
  }
);

EmailInput.displayName = "EmailInput";
