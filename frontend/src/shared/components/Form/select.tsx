import React from "react";

export type Option = { value: string; label: string };

type SelectFieldProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "onChange" | "value"
> & {
  label?: React.ReactNode;
  placeholder?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  containerClassName?: string;
};

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  placeholder,
  options,
  value,
  onChange,
  className,
  containerClassName,
  ...rest
}) => {
  const base =
    "w-full h-10 subtitle text-secondary-100 bg-transparent border border-secondary-100/30 outline-none rounded-[20px] focus:border-secondary-100/50 transition-colors";

  return (
    <div
      className={["flex flex-col gap-2", containerClassName]
        .filter(Boolean)
        .join(" ")}
    >
      {label && <p className="body-inter-b">{label}</p>}
      <select
        {...rest}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={[base, "p-2", className].filter(Boolean).join(" ")}
        style={{
          appearance: "none",
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: "right 8px center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "16px",
          paddingRight: "32px",
        }}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
