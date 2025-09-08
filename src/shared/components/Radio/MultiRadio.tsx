import {
  useMultiSelect,
  MultiSelectItem,
} from "@/shared/components/MultiSelect";
import { RadioUI } from "@/shared/components/Radio/RadioUI";

type Props = {
  label: string;
  value: string | number;
};

export const MultiRadio = ({ label, value }: Props) => {
  const { getIsChecked } = useMultiSelect();

  return (
    <MultiSelectItem
      aria-label={label}
      value={value}
      className="flex gap-2 items-center"
    >
      <RadioUI checked={getIsChecked(value)} />
      <p className="text-black body-inter">{label}</p>
    </MultiSelectItem>
  );
};
