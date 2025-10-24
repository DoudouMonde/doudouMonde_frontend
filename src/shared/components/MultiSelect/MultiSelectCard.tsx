// SelectionCard.tsx
import React from "react";
import { MultiSelectGroup } from "@/shared/components/MultiSelect/MultiSelectGroup";
import { FormCard } from "@/shared/components/FormCard";

interface MultiSelectCardProps<T extends string[]> {
  title: string;
  subtitle: string;
  selectedValues: T;
  onChange: (values: T) => void;
  children: React.ReactNode;
}

export function MultiSelectCard<T extends string[]>({
  title,
  subtitle,
  selectedValues,
  onChange,
  children,
}: MultiSelectCardProps<T>) {
  return (
    <FormCard title={title} subtitle={subtitle}>
      <div className="flex flex-col gap-2 w-full">
        {/* 선택형 UI 그룹 */}
        <MultiSelectGroup
          selectedValues={selectedValues as string[] | number[]}
          onChange={(vals) => onChange(vals as typeof selectedValues)}
        >
          {children}
        </MultiSelectGroup>
      </div>
    </FormCard>
  );
}
