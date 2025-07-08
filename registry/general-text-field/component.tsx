"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface GeneralTextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  isLoading?: boolean;
}

export const GeneralTextInput = React.forwardRef<
  HTMLInputElement,
  GeneralTextInputProps
>(({ className, error, type = "text", isLoading, ...props }, ref) => {
  return (
    <div className="relative">
      <Input
        type={type}
        className={cn(
          "w-full text-foreground",
          error && "border-destructive",
          className
        )}
        ref={ref}
        {...props}
      />
      {isLoading && (
        <Loader2 className="w-4 h-4 animate-spin absolute right-2 top-1/2 -translate-y-1/2" />
      )}
    </div>
  );
});

GeneralTextInput.displayName = "GeneralTextInput";
