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
}) => {
  return (
    <div className={"flex justify-center "}>
      <button
        type="button"
        onClick={onClick}
        className="px-8 py-3 w-full body-inter-r text-gray-200 bg-green-100/70 rounded-full 00 hover:bg-green-100"
        aria-disabled={disabled}
      >
        {/* {disabled ? "저장 중..." : text} */}
        {text}
      </button>
    </div>
  );
};
