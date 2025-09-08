import { createContext } from "react";

export interface CheckboxContextProps {
  selectedValues: string[] | number[];
  onChange: (value: string[] | number[]) => void;
}
export const MultiSelectContext = createContext<CheckboxContextProps | null>(
  null
);
