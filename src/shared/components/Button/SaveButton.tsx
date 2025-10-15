import React from "react";

type SaveButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean; // 지금은 주석 처리했지만 타입은 유지
  text?: React.ReactNode; // string | JSX
  className?: string; // 외부 스타일 확장용 (옵션)
};

export const SaveButton: React.FC<SaveButtonProps> = ({
  onClick,
  disabled = false,
  text = "저장",
  className,
}) => {
  return (
    <div className={["flex justify-center ", className ?? ""].join(" ")}>
      <button
        type="button"
        onClick={onClick}
        // disabled={disabled}
        className="px-8 py-3 w-full font-semibold bg-green-100 rounded-full shadow-md transition-colors text-gray-2 00 hover:bg-blue-600 disabled:opacity-50"
        aria-disabled={disabled}
      >
        {/* {disabled ? "저장 중..." : text} */}
        {text}
      </button>
    </div>
  );
};
