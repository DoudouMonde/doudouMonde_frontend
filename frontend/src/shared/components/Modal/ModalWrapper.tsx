// ModalWrapper.tsx
import { ChildDeleteBtn } from "@/domains/child/components/ChildDeleteBtn";
import React, { useEffect } from "react";

type ModalWrapperProps = {
  children: React.ReactNode;
  selectedChildId?: number;
  onClose: () => void;
  deleteBtn?: boolean;
};

export const ModalWrapper: React.FC<ModalWrapperProps> = ({
  children,
  onClose,
  selectedChildId,
  deleteBtn = false,
}) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="flex fixed inset-0 z-50 justify-center items-center bg-black/50"
      onClick={onClose} // 바깥 클릭 닫기
    >
      <div
        className="mx-4 w-full max-w-md bg-white rounded-[40px] shadow-2xl"
        onClick={(e) => e.stopPropagation()} // 내용 클릭은 전파 방지
      >
        <div className="p-6">{children}</div>
        {deleteBtn && <ChildDeleteBtn childId={selectedChildId} />}
      </div>
    </div>
  );
};
