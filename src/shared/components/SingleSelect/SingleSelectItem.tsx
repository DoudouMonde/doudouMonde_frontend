import { useSingleSelect } from "@/shared/components/SingleSelect";
import { HTMLAttributes, ReactNode } from "react";

interface SingleSelectItemProps
  extends Omit<HTMLAttributes<HTMLLabelElement>, "onChange"> {
  children: ReactNode;
  value: string | number;
  disabled?: boolean;
}

export const SingleSelectItem = ({
  children,
  value,
  disabled,
  ...props
}: SingleSelectItemProps) => {
  const { getIsActive, onChange } = useSingleSelect();

  return (
    <label {...props}>
      <input
        type="radio"
        value={value}
        disabled={disabled}
        checked={getIsActive(value)}
        onChange={(e) => {
          if (onChange === undefined) return;
          const value = e.target.value;
          if (isNaN(Number(value))) {
            onChange(value);
            return;
          }
          onChange(Number(value));
        }}
        style={{
          position: "absolute",
          opacity: 0,
          width: 1,
          height: 1,
          pointerEvents: "none",
        }}
      />
      {children}
    </label>
  );
};
