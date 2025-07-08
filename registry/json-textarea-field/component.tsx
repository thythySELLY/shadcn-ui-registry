import React, { useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface JsonTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  acceptedKeys?: string[];
}

export const JsonTextarea = React.forwardRef<
  HTMLTextAreaElement,
  JsonTextareaProps
>(({ className, error, acceptedKeys, onChange, ...props }, ref) => {
  const formatJson = useCallback((value: string) => {
    try {
      const parsed = JSON.parse(value);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return value;
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const formatted = formatJson(e.target.value);
    e.target.value = formatted;
    if (onChange) {
      const event = {
        ...e,
        target: { ...e.target, value: formatted },
      } as React.ChangeEvent<HTMLTextAreaElement>;
      onChange(event);
    }
  };

  return (
    <div className="space-y-2">
      {acceptedKeys && acceptedKeys.length > 0 && (
        <div className="text-sm text-muted-foreground">
          Accepted keys: {acceptedKeys.join(", ")}
        </div>
      )}
      <Textarea
        ref={ref}
        className={cn("font-mono", error && "border-destructive", className)}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      />
      {error && <div className="text-sm text-destructive">{error}</div>}
    </div>
  );
});

JsonTextarea.displayName = "JsonTextarea";
