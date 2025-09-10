import { ReactNode } from "react";

export type Props = {
  children: ReactNode;
  variant?: "filled" | "outlined";
  className?: string;
  onClick?: () => void;
};

export const Chip = ({
  children,
  variant = "filled",
  className = "",
  onClick,
}: Props) => {
  const baseClasses = [
    "inline-flex",
    "items-center",
    "px-2",
    "py-1",
    "rounded-[10px]",
    "font-hak",
    "text-base",
    "font-normal",
    "tracking-tight",
    "leading-[1.02]",
    "text-black-100",
    "whitespace-nowrap",
    onClick ? "cursor-pointer" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const variantClasses = {
    filled: "bg-yellow-200",
    outlined: "bg-gray-200 border-2 border-yellow-200",
  };

  const combinedClasses =
    `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  return (
    <div
      className={combinedClasses}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
};

export default Chip;
