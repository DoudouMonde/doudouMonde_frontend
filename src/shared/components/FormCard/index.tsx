type FormCardProps = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  legendClassName?: string;
};

export const FormCard = ({
  title,
  subtitle,
  children,
  disabled,
  className,
  legendClassName,
}: FormCardProps) => {
  return (
    <fieldset
      disabled={disabled}
      className={[
        "flex flex-col justify-center gap-5 bg-gray-200/70 rounded-[20px] p-7 w-full h-auto",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {(title || subtitle) && (
        <legend
          className={[
            "flex items-center gap-2 px-2",
            "text-base font-semibold",
            legendClassName,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {title && <span className="title-hak">{title}</span>}
          {subtitle && (
            <p className="subtitle-b text-secondary-100">{subtitle}</p>
          )}
        </legend>
      )}
      {children}
    </fieldset>
  );
};
