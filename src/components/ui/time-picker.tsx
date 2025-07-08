"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
  className?: string;
}

export function TimePicker({ value, onChange, className }: TimePickerProps) {
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    if (onChange) {
      onChange(newTime);
    }
  };

  return (
    <Input
      type="time"
      value={value || ""}
      onChange={handleTimeChange}
      className={cn("w-full", className)}
    />
  );
}
