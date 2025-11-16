import { MultiSelectContext } from "@/shared/components/MultiSelect";
import { ReactNode } from "react";

// 전역에서 사용 가능하도록 Context 인스턴스를 만들고 export

interface MultiSelectGroupProps {
  children: ReactNode;
  selectedValues: string[] | number[];
  onChange: (value: string[] | number[]) => void;
  legend?: string;
  className?: string;
}

export const MultiSelectGroup = ({
  legend,
  children,
  selectedValues,
  onChange,
  className,
}: MultiSelectGroupProps) => {
  return (
    <fieldset className={className}>
      <legend>{legend}</legend>
      <MultiSelectContext.Provider value={{ selectedValues, onChange }}>
        {children}
      </MultiSelectContext.Provider>
    </fieldset>
  );
};
