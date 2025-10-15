// SelectionCard.tsx
import React from "react";
import { MultiSelectGroup } from "@/shared/components/MultiSelect/MultiSelectGroup";

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
    <div className="flex flex-col justify-center gap-5 bg-gray-200/70 rounded-[20px] p-6 pb-8 w-full h-auto">
      <div className="flex flex-col gap-2">
        <p className="title-hak">{title}</p>
        <p className="subtitle-b text-secondary-100">{subtitle}</p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {/* 선택형 UI 그룹 */}
        <MultiSelectGroup
          selectedValues={selectedValues as string[] | number[]}
          onChange={(vals) => onChange(vals as typeof selectedValues)}
        >
          {children}
        </MultiSelectGroup>
      </div>
    </div>
  );
}
