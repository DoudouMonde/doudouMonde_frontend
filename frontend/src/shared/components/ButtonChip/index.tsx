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
      className={` w-full h-[34px] text-gray-200 rounded-[20px] transition-colors body-inter-r items-center ${
        isActive ? "bg-green-100" : "bg-secondary-100"
      } cursor-pointer`}
    >
      {children}
    </button>
  );
};
