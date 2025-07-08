import * as React from "react";
import { X, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { Option } from "./schema";

const sizeVariants = {
  sm: "h-8 text-xs",
  md: "h-10 text-sm",
  lg: "h-12 text-base",
};

const variantStyles = {
  default:
    "border-input bg-background hover:bg-accent hover:text-accent-foreground",
  outline:
    "border-2 border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
  ghost: "border-0 bg-transparent hover:bg-accent hover:text-accent-foreground",
};

export interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  className?: string;
  size?: keyof typeof sizeVariants;
  variant?: keyof typeof variantStyles;
  maxSelectedDisplay?: number;
  searchable?: boolean;
  clearable?: boolean;
  selectAllOption?: boolean;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select options...",
  searchPlaceholder = "Search options...",
  disabled = false,
  className,
  size = "md",
  variant = "default",
  maxSelectedDisplay = 3,
  searchable = false,
  selectAllOption = false,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredOptions = React.useMemo(() => {
    if (!searchable || !searchTerm) return options;
    return options.filter((option) =>
      option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm, searchable]);

  const handleSelect = (selectedValue: string) => {
    const option = options.find((opt) => opt.value === selectedValue);
    if (!option || option.disabled) return;

    const isSelected = value.some((item) => item === selectedValue);
    if (isSelected) {
      onChange(value.filter((item) => item !== selectedValue));
    } else {
      onChange([...value, selectedValue]);
    }
  };

  const handleSelectAll = () => {
    const selectableOptions = options.filter((opt) => !opt.disabled);
    const allSelected = selectableOptions.every((opt) =>
      value.some((v) => v === opt.value)
    );

    if (allSelected) {
      onChange([]);
    } else {
      onChange(selectableOptions.map((opt) => opt.value));
    }
  };

  const handleRemove = (valueToRemove: string) => {
    onChange(value.filter((item) => item !== valueToRemove));
  };

  return (
    <div className="flex flex-col gap-2">
      <Select
        open={isOpen}
        onOpenChange={setIsOpen}
        value={value[value.length - 1]}
        onValueChange={handleSelect}
      >
        <SelectTrigger
          className={cn(
            sizeVariants[size],
            variantStyles[variant],
            "w-full",
            className
          )}
          disabled={disabled}
        >
          <SelectValue>
            {value.length === 0 ? (
              <span className="text-muted-foreground">{placeholder}</span>
            ) : (
              <span>{value.length} items selected</span>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {searchable && (
            <div className="p-2 border-b">
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          <SelectGroup>
            {selectAllOption && (
              <SelectItem value="__select_all__" onClick={handleSelectAll}>
                <div className="flex items-center">
                  <div className="mr-2 h-4 w-4 border rounded flex items-center justify-center">
                    {options.length === value.length && (
                      <Check className="h-3 w-3" />
                    )}
                  </div>
                  Select All
                </div>
              </SelectItem>
            )}
            {filteredOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                <div className="flex items-center">
                  <div className="mr-2 h-4 w-4 border rounded flex items-center justify-center">
                    {value.some((item) => item === option.value) && (
                      <Check className="h-3 w-3" />
                    )}
                  </div>
                  {option.name}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {value.length > 0 && (
        <div className="flex gap-1 flex-wrap">
          {value.length > maxSelectedDisplay ? (
            <>
              <span className="mr-1">{value.length} selected:</span>
              {value.slice(0, maxSelectedDisplay).map((item, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="mr-1 mb-1"
                  onClick={() => handleRemove(item)}
                  onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
                >
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
              <span className="text-muted-foreground">...</span>
            </>
          ) : (
            value.map((item) => (
              <Badge
                key={item}
                variant="secondary"
                className="mr-1 mb-1"
                onClick={() => handleRemove(item)}
                onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
              >
                {item}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            ))
          )}
        </div>
      )}
    </div>
  );
}
