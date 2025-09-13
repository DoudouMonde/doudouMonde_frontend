import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "삭제",
  cancelText = "취소",
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* 모달 컨텐츠 */}
      <div className="relative p-6 mx-4 w-full max-w-sm bg-gray-200 rounded-lg">
        <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mb-6 text-gray-600">{message}</p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 rounded-lg border border-gray-300 transition-colors hover:bg-gray-50"
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-gray-200 bg-green-200 rounded-lg transition-colors hover:bg-red-600 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "처리 중..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
