import { useMultiSelect } from "@/shared/components/MultiSelect";
import { HTMLAttributes, ReactNode } from "react";

interface MultiSelectItemProps extends HTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  disabled?: boolean;
  value: string | number;
}

export const MultiSelectItem = ({
  children,
  disabled,
  value,
  ...props
}: MultiSelectItemProps) => {
  const { toggleValue, getIsChecked } = useMultiSelect();

  return (
    <label {...props}>
      <input
        type="checkbox"
        disabled={disabled}
        checked={getIsChecked(value)}
        onChange={() => toggleValue({ value })}
        style={{
          position: "absolute",
          opacity: 0,
          width: 1,
          height: 1,
        }}
      />
      {children}
    </label>
  );
};
