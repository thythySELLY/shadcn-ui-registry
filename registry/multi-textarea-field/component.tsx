import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export interface TabDefinition {
  id: string;
  label: string;
  icon?: string;
  placeholder?: string;
}

interface MultiTextareaProps<T extends string> {
  value: Partial<Record<T, string>>;
  onChange: (value: Partial<Record<T, string>>) => void;
  tabs: TabDefinition[];
  errorMessages?: {
    required?: string;
    minLength?: string;
    maxLength?: string;
  };
  disabled?: boolean;
  required?: boolean;
}

export function MultiTextarea<T extends string>({
  value,
  onChange,
  tabs,
  disabled,
  required,
}: MultiTextareaProps<T>) {
  const [activeTab, setActiveTab] = useState<T>(tabs[0].id as T);

  const handleChange = (tabId: T, text: string) => {
    onChange({ ...value, [tabId]: text });
  };

  return (
    <Tabs
      defaultValue={tabs[0].id}
      value={activeTab}
      onValueChange={(val: T) => setActiveTab(val)}
      className="w-full"
    >
      <TabsList className={`grid grid-cols-${tabs.length}`}>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="flex items-center gap-1"
            disabled={disabled}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
            {required && <span className="ml-1 text-red-500">*</span>}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id} className="mt-0">
          <Textarea
            value={value[tab.id as T] || ""}
            onChange={(e) => handleChange(tab.id as T, e.target.value)}
            placeholder={tab.placeholder || `Enter ${tab.label}`}
            className="!focus-visible:ring-[1px] !focus-visible:ring-primary !text-foreground"
            disabled={disabled}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
