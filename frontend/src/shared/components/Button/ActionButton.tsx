export interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  children,
  variant = "primary",
  className = "",
}) => {
  const baseClasses =
    "min-w-[120px] max-w-[142px] w-full h-[31px] rounded-[10px] font-['Hakgyoansim_Dunggeunmiso_OTF'] text-sm sm:text-base font-normal tracking-[-0.03em] transition-all duration-200 hover:scale-105 active:scale-95 px-2";

  const variantClasses =
    variant === "primary"
      ? "bg-[#FFF288] text-gray-900 shadow-lg"
      : "bg-[#FFF288] text-gray-900 shadow-lg";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
};
