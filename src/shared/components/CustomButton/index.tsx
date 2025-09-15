import { HTMLAttributes } from "react";

type Props = Omit<HTMLAttributes<HTMLButtonElement>, "onClick"> & {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
};

export const CustomButton = ({
  onClick,
  isActive,
  children,
  ...rest
}: Props) => {
  return (
    <button
      {...rest}
      onClick={onClick}
      disabled={!isActive}
      className={`py-4 w-full text-gray-200 rounded-[20px] transition-colors body-inter-r ${
        isActive
          ? "bg-green-100 cursor-pointer hover:bg-primary-200"
          : "cursor-not-allowed bg-secondary-100"
      }`}
    >
      {children}
    </button>
  );
};
