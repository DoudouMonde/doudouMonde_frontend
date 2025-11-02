// /shared/components/ConfirmModal.tsx
import Modal from "@/shared/components/Modal";
import React from "react";

export type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  cancelLabel?: string;
  confirmLabel?: string;
};

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  cancelLabel = "취소",
  confirmLabel = "확인",
}) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="mb-6 text-center">
        <div className="flex justify-center items-center mx-auto mb-4 w-12 h-12 bg-green-100 rounded-full" />
        <h2 className="mb-2 text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-secondary-100">{message}</p>
      </div>

      <div className="space-y-3">
        <button
          onClick={onClose}
          className="py-2 w-full font-semibold bg-gray-100 rounded-xl transition-colors text-secondary-100 hover:bg-gray-200"
        >
          {cancelLabel}
        </button>
        <button
          onClick={onConfirm}
          className="py-2 w-full font-semibold bg-gray-100 rounded-xl transition-colors text-secondary-100 hover:bg-gray-200"
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
};
