import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  disabled?: boolean;
}

const GenerateTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, disabled, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full text-foreground rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive",
          disabled && "cursor-not-allowed opacity-50 text-muted-foreground",
          className
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      />
    );
  }
);
GenerateTextarea.displayName = "GenerateTextarea";

export { GenerateTextarea };
