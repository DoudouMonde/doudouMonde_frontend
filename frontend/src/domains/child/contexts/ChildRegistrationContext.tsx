//1. Context가 제공할 값의 타입 정의
import { createContext, useContext } from "react";
import { useChildRegistration } from "@/domains/child/hooks/useChildRegistration";

//1. Context가 제공할 값의 타입 정의
type ChildRegistrationContextType = ReturnType<typeof useChildRegistration>;
//2. Context 생성
export const ChildRegistrationContext =
  createContext<ChildRegistrationContextType | null>(null);

//4. Consumer 커스텀 훅 생성
export const useChildRegistrationContext = () => {
  const context = useContext(ChildRegistrationContext);
  if (!context) {
    throw new Error("Context는 Provider 안에서만 사용 가능합니다.");
  }
  return context;
};
