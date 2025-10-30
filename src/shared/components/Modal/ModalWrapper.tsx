// ModalWrapper.tsx
import React, { useEffect } from "react";

type ModalWrapperProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export const ModalWrapper: React.FC<ModalWrapperProps> = ({
  children,
  onClose,
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
        className="p-6 w-full max-w-md bg-white rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()} // 내용 클릭은 전파 방지
      >
        {children}
      </div>
    </div>
  );
};
