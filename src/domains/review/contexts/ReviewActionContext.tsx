import { createContext, useContext } from "react";
import { useReviewAction } from "../hooks/useReviewActions";

export type ReviewActionContextType = ReturnType<typeof useReviewAction>;

export const ReviewActionContext = createContext<ReviewActionContextType | null>(null);

export const useReviewActionContext = () => {
  const ctx = useContext(ReviewActionContext);
  if (!ctx) throw new Error("ReviewActionContext는 Provider 안에서만 사용 가능합니다.");
  return ctx;
};
