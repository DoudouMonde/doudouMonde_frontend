import React from "react";

interface oneButtonModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  buttonText?: string;
  onConfirm: () => void;
}

export const OneButtonModal: React.FC<oneButtonModalProps> = ({
  isOpen,
  title,
  message = "저장되었습니다",
  buttonText = "확인",
  onConfirm,
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center bg-opacity-50 bg-gray-300/40">
      <div className=" w-full max-w-sm bg-gray-200 rounded-[50px]">
        {/* 텍스트 영역 */}
        <div className="flex flex-col gap-1 items-center px-7 py-6">
          <h3 className="text-black title-hak">{title}</h3>
          <p className="body-inter-b text-secondary-100">{message}</p>
        </div>
        {/* 버튼 영역 */}

        <div>
          <div className="flex">
            <button
              onClick={handleConfirm}
              className="flex-1    py-4 border-r-[0.2px] border-t-[0.2px] border-secondary-100 body-inter-b text-secondary-100"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
