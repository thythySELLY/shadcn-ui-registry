"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

export interface Option {
  value: string;
  name: string;
  disabled?: boolean;
  description?: string;
  icon?: React.ReactNode;
}

export interface SingleSelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "value" | "onChange"> {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  clearable?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  customTriggerRender?: (
    selectedOption: Option | null,
    placeholder?: string
  ) => React.ReactNode;
  customItemRender?: (option: Option, isSelected: boolean) => React.ReactNode;
}

const sizeVariants = {
  sm: {
    trigger: "h-8 px-2 text-xs",
    content: "text-xs",
    item: "px-2 py-1 text-xs",
    icon: "h-3 w-3",
  },
  md: {
    trigger: "h-10 px-3 text-sm",
    content: "text-sm",
    item: "px-2 py-1.5 text-sm",
    icon: "h-4 w-4",
  },
  lg: {
    trigger: "h-12 px-4 text-base",
    content: "text-base",
    item: "px-3 py-2 text-base",
    icon: "h-5 w-5",
  },
};

const variantStyles = {
  default: {
    trigger:
      "border-input bg-background hover:bg-accent hover:text-accent-foreground",
  },
  outline: {
    trigger:
      "border-2 border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
  },
  ghost: {
    trigger:
      "border-0 bg-transparent hover:bg-accent hover:text-accent-foreground",
  },
};

export function SingleSelect({
  value,
  onChange,
  options,
  placeholder = "Select an option...",
  disabled = false,
  className,
  triggerClassName,
  contentClassName,
  itemClassName,
  variant = "default",
  size = "md",
  clearable = false,
  loading = false,
  emptyMessage = "No options available",
  customTriggerRender,
  customItemRender,
}: SingleSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const sizeClasses = sizeVariants[size];
  const variantClasses = variantStyles[variant];

  const selectedOption = React.useMemo(
    () => options.find((option) => option.value === value) || null,
    [options, value]
  );

  const handleClear = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onChange("");
    },
    [onChange]
  );

  const renderTriggerContent = React.useCallback(
    (selectedOption: Option | null) => {
      if (customTriggerRender) {
        return customTriggerRender(selectedOption, placeholder);
      }

      if (!selectedOption) {
        return <span className="text-muted-foreground">{placeholder}</span>;
      }

      return (
        <div className="flex items-center gap-2">
          {selectedOption.icon && (
            <span className="flex-shrink-0">{selectedOption.icon}</span>
          )}
          <span className="truncate">{selectedOption.name}</span>
        </div>
      );
    },
    [customTriggerRender, placeholder]
  );

  return (
    <div className={cn("relative", className)}>
      <Select
        open={isOpen}
        onOpenChange={setIsOpen}
        value={value}
        onValueChange={onChange}
        disabled={disabled || loading}
      >
        <SelectTrigger
          className={cn(
            "flex items-center justify-between",
            sizeClasses.trigger,
            variantClasses.trigger,
            triggerClassName
          )}
        >
          <div className="flex-1 text-left overflow-hidden text-foreground">
            {loading ? (
              <span className="text-muted-foreground">Loading...</span>
            ) : (
              renderTriggerContent(selectedOption)
            )}
          </div>
          <div className="flex items-center gap-1">
            {clearable && value && !loading && (
              <X
                className={cn(
                  "cursor-pointer hover:text-destructive",
                  sizeClasses.icon
                )}
                onClick={handleClear}
              />
            )}
          </div>
        </SelectTrigger>

        <SelectContent
          className={cn(
            "max-h-60 overflow-auto",
            sizeClasses.content,
            contentClassName
          )}
        >
          {loading ? (
            <div className="text-center py-4 text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                Loading options...
              </div>
            </div>
          ) : options.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              {emptyMessage}
            </div>
          ) : (
            options.map((option, index) => {
              const isSelected = value === option.value;

              if (customItemRender) {
                return (
                  <SelectItem
                    key={index}
                    value={option.value}
                    disabled={option.disabled}
                    className={cn(
                      "text-foreground",
                      sizeClasses.item,
                      itemClassName
                    )}
                  >
                    {customItemRender(option, isSelected)}
                  </SelectItem>
                );
              }

              return (
                <SelectItem
                  key={index}
                  value={option.value}
                  disabled={option.disabled}
                  className={cn(
                    "cursor-pointer focus:bg-accent focus:text-accent-foreground text-foreground",
                    sizeClasses.item,
                    option.disabled && "opacity-50 cursor-not-allowed",
                    itemClassName
                  )}
                >
                  <div className="flex items-center gap-2 w-full">
                    {option.icon && (
                      <span className="flex-shrink-0">{option.icon}</span>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="truncate font-medium">{option.name}</div>
                      {option.description && (
                        <div className="text-xs text-muted-foreground truncate mt-0.5">
                          {option.description}
                        </div>
                      )}
                    </div>
                  </div>
                </SelectItem>
              );
            })
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
