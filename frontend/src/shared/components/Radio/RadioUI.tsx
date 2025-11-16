type Props = {
  checked: boolean;
  disabled?: boolean;
};

export const RadioUI = ({ checked = false, disabled = false }: Props) => {
  return (
    <div
      className={`
        inline-flex items-center relative w-[25px] h-[25px] rounded-full border-[3px] transition-colors
        ${checked ? "border-green-100" : "border-[#D9D9D9]"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {checked && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[12.21px] h-[12.21px] rounded-full bg-green-100" />
      )}
    </div>
  );
};
