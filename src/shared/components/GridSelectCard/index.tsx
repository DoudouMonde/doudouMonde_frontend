// GridSelectCard.tsx
import React from "react";
import { FormCard } from "@/shared/components/FormCard";

type Scalar = string | number;

export type GridOption<T extends Scalar> = {
  value: T;
  label: string;
  icon?: React.ReactNode; // 아이콘/이미지 JSX
  disabled?: boolean;
};

type GridSelectCardProps<T extends Scalar> = {
  title: string;
  subtitle?: string;
  options: GridOption<T>[];
  selected: T | null;
  onChange: (value: T) => void;
  className?: string; // 카드 래퍼 커스터마이즈
  gridClassName?: string; // 그리드 커스터마이즈 (열 개수 등)
};

export function GridSelectCard<T extends Scalar>({
  title,
  subtitle,
  options,
  selected,
  onChange,
  gridClassName,
}: GridSelectCardProps<T>) {
  return (
    <FormCard title={title} subtitle={subtitle}>
      {/* 옵션 그리드 */}
      <div className={gridClassName ?? "grid grid-cols-3 gap-4"}>
        {options.map(({ value, label, icon, disabled }) => {
          const isSelected = selected === value;
          return (
            <button
              key={`${String(value)}`}
              type="button"
              onClick={() => !disabled && onChange(value)}
              disabled={disabled}
              className={[
                "flex flex-col items-center p-3 rounded-lg cursor-pointer transition-colors focus:outline-none",
                isSelected
                  ? "bg-blue-100 border-2 border-blue-300"
                  : "bg-white hover:bg-gray-50 border border-transparent",
                disabled ? "opacity-50 cursor-not-allowed" : "",
              ].join(" ")}
              role="radio"
              aria-checked={isSelected}
            >
              <div className="flex justify-center items-center mb-2 w-16 h-16 bg-gray-200 rounded-full">
                {icon}
              </div>
              <span className="text-gray-700 body-hak-r">{label}</span>
            </button>
          );
        })}
      </div>
    </FormCard>
  );
}
