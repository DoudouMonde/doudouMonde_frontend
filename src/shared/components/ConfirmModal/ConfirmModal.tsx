import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  message: string;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  showCancel?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  message,
  confirmText,
  cancelText = "취소",
  onConfirm,
  onCancel,
  showCancel = true,
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onClose();
  };

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center bg-opacity-50 bg-gray-300/40">
      <div className=" w-full max-w-sm bg-gray-200 rounded-[50px]">
        {/* 텍스트 영역 */}
        <div className="flex flex-col gap-2 items-center px-7 py-8">
          <h3 className="text-black title-hak">{title}</h3>
          <p>{subtitle}</p>
          <p className="body-inter-b text-secondary-100">{message}</p>
        </div>
        {/* 버튼 영역 */}

        <div>
          <div className="flex">
            {showCancel && (
              <button
                onClick={handleCancel}
                className="flex-1    py-4 border-r-[0.2px] border-t-[0.2px] border-secondary-100 body-inter-b text-secondary-100"
              >
                {cancelText}
              </button>
            )}
            <button
              onClick={handleConfirm}
              className="flex-1 text-red-100 border-secondary-100 body-inter-b border-t-[0.2px]"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
