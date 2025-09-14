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
    // <div className="fixed right-0 bottom-0 left-0 z-30 p-6">
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
    // </div>
  );
};
