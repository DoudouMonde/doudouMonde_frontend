import { ReactNode } from "react";

export type Props = {
  children: ReactNode;
  variant?: "filled" | "outlined";
  onClick?: () => void;
  className?: string;
};

export const Chip = ({
  children,
  variant = "filled",
  onClick,
  className = "",
}: Props) => {
  const variantClasses = {
    filled: "bg-yellow-200",
    outlined: "bg-gray-200 border-4 border-yellow-200",
  };

  return (
    <button
      className={`flex items-center px-4 py-1 whitespace-nowrap rounded-2xl w-fit ${variantClasses[variant]} font-hak text-black-100 ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      {children}
    </button>
  );
};
