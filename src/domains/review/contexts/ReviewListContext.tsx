import { createContext, useContext } from "react";
import { useReviewList } from "../hooks/useReviewList";

export type ReviewListContextType = ReturnType<typeof useReviewList>;

export const ReviewListContext = createContext<ReviewListContextType | null>(null);

export const useReviewListContext = () => {
  const ctx = useContext(ReviewListContext);
  if (!ctx) throw new Error("ReviewLiseContext는 Provider 안에서만 사용 가능합니다. ");
  return ctx;
};
