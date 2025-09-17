import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
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
    <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
      <div className="p-6 mx-4 w-full max-w-sm bg-gray-200 rounded-2xl">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mb-6 body-inter-r">{message}</p>

        <div className="flex gap-3">
          {showCancel && (
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2 bg-gray-100 rounded-lg transition-colors subtitle"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 text-gray-200 bg-green-200 rounded-lg transition-colors subtitle"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
