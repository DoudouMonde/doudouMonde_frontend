// ChildListContext.ts
import { createContext, useContext } from "react";
import { useChildList } from "@/domains/child/hooks/useChildList";

export type ChildListContextType = ReturnType<typeof useChildList>; // ✅ 항상 동기화

// Context 생성
export const ChildListContext = createContext<ChildListContextType | null>(
  null
);

// Consumer 커스텀 훅
export const useChildListContext = () => {
  const ctx = useContext(ChildListContext);
  if (!ctx)
    throw new Error("ChildListContext는 Provider 안에서만 사용 가능합니다.");
  return ctx;
};
