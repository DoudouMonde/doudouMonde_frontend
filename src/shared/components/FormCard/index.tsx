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
        // flex 제거! (legend가 float을 먹도록)
        "w-full h-auto rounded-[20px] bg-gray-200/70",
        "relative", // 필요하면
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {(title || subtitle) && (
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

      {/* float 해제(클리어) + 본문 패딩/레이아웃 */}
      <div className="flex clear-both flex-col gap-5 pt-5 pr-7 pb-7 pl-7">
        {children}
      </div>
    </fieldset>
  );
};
