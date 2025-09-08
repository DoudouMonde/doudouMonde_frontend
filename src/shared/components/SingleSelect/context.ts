import { createContext } from "react";

export const SingleSelectContext = createContext<{
  selectedValue: string | number;
  onChange: (value: string | number) => void;
} | null>(null);
