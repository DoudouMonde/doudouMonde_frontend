import React, { useEffect, useRef } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  backdropClassName?: string;
  closeOnBackdrop?: boolean;
};

export default function Modal({
  open,
  onClose,
  children,
  className = "",
  backdropClassName = "",
  closeOnBackdrop = true,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // ESC 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // 열릴 때 내부로 포커스 이동
  useEffect(() => {
    if (open) {
      setTimeout(() => dialogRef.current?.focus(), 0);
    }
  }, [open]);

  // ✅ SSR/비브라우저 환경 가드
  if (
    !open ||
    typeof window === "undefined" ||
    typeof document === "undefined"
  ) {
    return null;
  }

  return (
    <div
      className={`flex fixed inset-0 z-50 justify-center items-center bg-black/50 ${backdropClassName}`}
      onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
        if (!closeOnBackdrop) return;
        // ✅ backdrop 클릭에서만 닫히도록 보호
        if (e.target !== e.currentTarget) return;
        onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={`p-6 mx-4 w-full max-w-sm bg-gray-200 rounded-2xl shadow-xl outline-none ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
