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
  // dense flase 상태는 아이 정보 수정 모달에서 했음
  const pad = dense ? "  gap-4" : "gap-5";

  return (
    <fieldset
      disabled={disabled}
      className={[
        "w-full h-auto rounded-[20px] bg-gray-200 p-5 ",
        "relative",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {!hideLegend && (title || subtitle) && (
        <legend
          className={[
            "float-left",
            " pb-5",

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
