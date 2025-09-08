import { SingleSelectContext } from "@/shared/components/SingleSelect";
import { ReactNode } from "react";

interface SingleSelectGroupProps {
  legend?: string;
  children: ReactNode;
  selectedValue: string | number;
  onChange: (value: string | number) => void;
  className?: string;
}

export const SingleSelectGroup = ({
  legend,
  children,
  selectedValue,
  onChange,
  className,
}: SingleSelectGroupProps) => {
  return (
    <fieldset className={className}>
      <legend>{legend && legend}</legend>
      <SingleSelectContext.Provider value={{ selectedValue, onChange }}>
        {children}
      </SingleSelectContext.Provider>
    </fieldset>
  );
};
