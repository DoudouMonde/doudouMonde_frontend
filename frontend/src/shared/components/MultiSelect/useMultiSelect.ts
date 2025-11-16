import { MultiSelectContext } from "@/shared/components/MultiSelect";
import { useContext } from "react";

export const useMultiSelect = () => {
  const context = useContext(MultiSelectContext);

  if (!context)
    return {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getIsChecked: (_: number | string) => false,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      toggleValue: (_: { value: number | string }) => {},
    };

  const { selectedValues, onChange } = context;

  const getIsChecked = (value: string | number) => {
    return (selectedValues as (string | number)[]).includes(value);
  };

  const toggleValue = ({ value }: { value: string | number }) => {
    if (
      selectedValues.every((v) => typeof v === "string") &&
      typeof value === "string"
    ) {
      const newValues = getIsChecked(value)
        ? (selectedValues as string[]).filter((v) => v !== value)
        : (selectedValues as string[]).concat(value);

      onChange(newValues); // string[]이므로 안전
      return;
    }

    // 숫자 배열일 경우
    if (
      selectedValues.every((v) => typeof v === "number") &&
      typeof value === "number"
    ) {
      const newValues = getIsChecked(value)
        ? (selectedValues as number[]).filter((v) => v !== value)
        : (selectedValues as number[]).concat(value);

      onChange(newValues); // number[]이므로 안전
      return;
    }
  };

  return { getIsChecked, toggleValue };
};
