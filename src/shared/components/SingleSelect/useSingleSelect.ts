import { SingleSelectContext } from "@/shared/components/SingleSelect";
import { useContext } from "react";

export const useSingleSelect = () => {
  const group = useContext(SingleSelectContext);

  const getIsActive = (value: string | number) => {
    return group?.selectedValue !== undefined
      ? value === group?.selectedValue
      : false;
  };

  return { getIsActive, onChange: group?.onChange };
};
