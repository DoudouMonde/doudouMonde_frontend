import { SelectField } from "@/shared/components/Form/select";
import { Option } from "@/shared/components/Form/select";

export type Birth = { year: string; month: string; day: string };

type BirthdateSelectProps = {
  value: Birth;
  onChange: (v: Birth) => void;
  label?: string; // "생년월일"
  startYear?: number; // 기본: 현재년도
  range?: number; // 몇 년치 노출할지 (기본 21)
  className?: string;
};

export function BirthdateSelect({
  value,
  onChange,
  label = "생년월일",
  startYear = new Date().getFullYear(),
  range = 21,
  className,
}: BirthdateSelectProps) {
  const { year, month, day } = value;

  const yearOptions: Option[] = Array.from({ length: range }, (_, i) => {
    const y = (startYear - i).toString();
    return { value: y, label: `${y}년` };
  });

  const monthOptions: Option[] = Array.from({ length: 12 }, (_, i) => {
    const m = (i + 1).toString();
    return { value: m, label: `${m}월` };
  });

  const daysInMonth = (() => {
    if (!year || !month) return 31;
    return new Date(parseInt(year), parseInt(month), 0).getDate();
  })();

  const dayOptions: Option[] = Array.from({ length: daysInMonth }, (_, i) => {
    const d = (i + 1).toString();
    return { value: d, label: `${d}일` };
  });

  const handleYear = (y: string) => {
    // 년도 바뀌면 일자 범위 보정
    const max = new Date(
      parseInt(y || "2000"),
      parseInt(month || "1"),
      0
    ).getDate();
    const fixedDay = day && parseInt(day) > max ? "" : day;
    onChange({ year: y, month, day: fixedDay });
  };
  const handleMonth = (m: string) => {
    // 월 바뀌면 일자 범위 보정
    const max = new Date(
      parseInt(year || "2000"),
      parseInt(m || "1"),
      0
    ).getDate();
    const fixedDay = day && parseInt(day) > max ? "" : day;
    onChange({ year, month: m, day: fixedDay });
  };
  const handleDay = (d: string) => onChange({ year, month, day: d });

  return (
    <div className={className}>
      <p className="mb-2 body-inter-b">{label}</p>
      <div className="flex gap-2">
        <SelectField
          value={year}
          onChange={handleYear}
          placeholder="년도"
          options={yearOptions}
          containerClassName="flex-1"
        />
        <SelectField
          value={month}
          onChange={handleMonth}
          placeholder="월"
          options={monthOptions}
          containerClassName="flex-1"
        />
        <SelectField
          value={day}
          onChange={handleDay}
          placeholder="일"
          options={dayOptions}
          containerClassName="flex-1"
        />
      </div>
    </div>
  );
}
