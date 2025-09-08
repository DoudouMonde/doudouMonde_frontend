import { RadioUI } from "@/shared/components/Radio/RadioUI";
import {
  SingleSelectItem,
  useSingleSelect,
} from "@/shared/components/SingleSelect";

type Props = {
  label: string;
  value: string | number;
};
export const SingleRadio = ({ label, value }: Props) => {
  const { getIsActive } = useSingleSelect();

  return (
    <SingleSelectItem
      aria-label={label}
      value={value}
      className="flex gap-2 items-center"
    >
      <RadioUI checked={getIsActive(value)} />
      <p className="text-black body-inter">{label}</p>
    </SingleSelectItem>
  );
};
