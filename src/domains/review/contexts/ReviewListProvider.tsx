import { ReactNode } from "react";
import { useReviewList } from "../hooks/useReviewList";
import { ReviewListContext } from "./ReviewListContext";

export const ReviewListProvider = ({ children }: { children: ReactNode }) => {
  const listState = useReviewList();
  return <ReviewListContext.Provider value={listState}>{children}</ReviewListContext.Provider>;
};
