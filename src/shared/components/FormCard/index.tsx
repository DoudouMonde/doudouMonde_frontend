type FormCardProps = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  legendClassName?: string;
  hideLegend?: boolean;
  dense?: boolean;
};

export const FormCard = ({
  title,
  subtitle,
  children,
  disabled,
  className,
  legendClassName,
  hideLegend = false,
  dense = false,
}: FormCardProps) => {
  const pad = dense ? "pt-4 pr-5 pb-5 pl-5 gap-4" : "pt-5 pr-7 pb-7 pl-7 gap-5";

  return (
    <fieldset
      disabled={disabled}
      className={[
        // flex 제거! (legend가 float을 먹도록)
        "w-full h-auto rounded-[20px] bg-gray-200/70",
        "relative", // 필요하면
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {!hideLegend && (title || subtitle) && (
        <legend
          className={[
            "float-left",
            "pt-7 pl-7",
            "bg-white",
            "text-base font-semibold",
            legendClassName,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <span className="inline-flex flex-col gap-2">
            {title && <span className="title-hak">{title}</span>}
            {subtitle && (
              <span className="subtitle-b text-secondary-100">{subtitle}</span>
            )}
          </span>
        </legend>
      )}

      <div className={`flex clear-both flex-col ${pad}`}>{children}</div>
    </fieldset>
  );
};
