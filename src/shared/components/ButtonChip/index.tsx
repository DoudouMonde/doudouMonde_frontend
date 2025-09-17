import { HTMLAttributes } from "react";

type Props = Omit<HTMLAttributes<HTMLButtonElement>, "onClick"> & {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
};

export const ButtonChip = ({ onClick, isActive, children, ...rest }: Props) => {
  return (
    <button
      {...rest}
      onClick={onClick}
      className={`py-2 w-full h-[34px] text-gray-200 rounded-[20px] transition-colors body-inter-r ${
        isActive
          ? "bg-green-100 cursor-pointer hover:bg-primary-200"
          : "cursor-pointer bg-secondary-100 hover:bg-gray-300"
      }`}
    >
      {children}
    </button>
  );
};
