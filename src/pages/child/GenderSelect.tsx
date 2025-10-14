import { SelectField } from "@/shared/components/Form/select";
import { Option } from "@/shared/components/Form/select";

type GenderSelectProps = {
  value: string;
  onChange: (v: string) => void;
  label?: string;
  options?: Option[]; // 기본 MALE/FEMALE, 필요 시 커스텀
  className?: string;
};

const DEFAULT_GENDER_OPTIONS: Option[] = [
  { value: "MALE", label: "남자" },
  { value: "FEMALE", label: "여자" },
];

export function GenderSelect({
  value,
  onChange,
  label = "성별",
  options = DEFAULT_GENDER_OPTIONS,
  className,
}: GenderSelectProps) {
  return (
    <div className={className}>
      <SelectField
        label={<span className="body-inter-b">{label}</span>}
        value={value}
        onChange={onChange}
        placeholder="성별을 선택해주세요"
        options={options}
      />
    </div>
  );
}
