// GridSelectCard.tsx
import React from "react";
import { FormCard } from "@/shared/components/FormCard";
import type { ReactNode } from "react";
import { RadioUI } from "@/shared/components/Radio/RadioUI";

type Scalar = string | number;

export type GridOption<T extends Scalar> = {
  value: T;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
};

type GridSelectCardProps<T extends Scalar> = {
  title?: string;
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
  className,
  gridClassName,
}: GridSelectCardProps<T>) {
  return (
    <FormCard title={title} subtitle={subtitle} className={className}>
      {/* 옵션 그리드 */}
      <div className={gridClassName ?? "grid grid-cols-3 gap-8"}>
        {options.map(({ value, icon, disabled }) => {
          const isSelected = selected === value;

          const handleSelect = () => {
            if (!disabled) onChange(value);
          };

          const handleKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (
            e
          ) => {
            if (disabled) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onChange(value);
            }
          };

          return (
            <button
              key={`${String(value)}`}
              type="button"
              onClick={handleSelect}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              className={[
                // 배경색 변화 제거, 살짝의 보더만
                "group flex flex-col items-center p-3 rounded-lg transition-colors focus:outline-none",
              ].join(" ")}
              role="radio"
              aria-checked={isSelected}
              aria-disabled={disabled || undefined}
            >
              {/* 아이콘 영역 */}
              <div className="flex justify-center items-center mb-2 w-20 h-20 rounded-full">
                {icon}
              </div>

              {/* 라디오 UI (카드 하단) */}
              <RadioUI checked={!!isSelected} disabled={!!disabled} />
            </button>
          );
        })}
      </div>
    </FormCard>
  );
}
