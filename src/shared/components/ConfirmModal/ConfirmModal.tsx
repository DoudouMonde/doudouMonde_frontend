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
      <div className="p-6 mx-4 w-full max-w-sm bg-white rounded-2xl">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mb-6 text-gray-600">{message}</p>

        <div className="flex gap-3">
          {showCancel && (
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2 font-medium text-gray-600 bg-gray-100 rounded-lg transition-colors hover:bg-gray-200"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 font-medium text-white bg-blue-500 rounded-lg transition-colors hover:bg-blue-600"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
