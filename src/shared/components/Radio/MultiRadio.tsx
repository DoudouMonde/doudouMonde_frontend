import { useMultiSelect } from "@/shared/components/MultiSelect";
import { RadioUI } from "@/shared/components/Radio/RadioUI";
import { SingleSelectItem } from "@/shared/components/SingleSelect";

type Props = {
  label: string;
  value: string | number;
};

export const MultiRadio = ({ label, value }: Props) => {
  const { getIsChecked } = useMultiSelect();

  return (
    <SingleSelectItem
      aria-label={label}
      value={value}
      className="flex gap-2 items-center"
    >
      <RadioUI checked={getIsChecked(value)} />
      <p className="text-black body-inter">{label}</p>
    </SingleSelectItem>
  );
};
