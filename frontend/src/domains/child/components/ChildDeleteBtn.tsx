import * as React from "react";
import { useChildListContext } from "@/domains/child/contexts/ChildListContext";

type ChildDeleteBtnProps = {
  childId: number;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

export const ChildDeleteBtn: React.FC<ChildDeleteBtnProps> = ({
  childId,
  children = "아이 삭제하기",
  className = "",
  disabled = false,
}) => {
  const { handleChildDelete } = useChildListContext();

  return (
    <button
      type="button"
      aria-label="아이 삭제하기"
      disabled={disabled}
      onClick={() => handleChildDelete(childId)}
      className={[
        "p-3 w-full text-center",
        "border-t-[0.2px] border-secondary-100",
        "text-red-100 body-inter-b",
        disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-80",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
};
