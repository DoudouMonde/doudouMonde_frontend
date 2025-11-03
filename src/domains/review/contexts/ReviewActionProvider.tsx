import { useReviewAction } from "../hooks/useReviewActions";
import { ReviewActionContext } from "./ReviewActionContext";
import { ReactNode } from "react";

export const ReviewActionProvider = ({ children }: { children: ReactNode }) => {
  const listState = useReviewAction();

  return <ReviewActionContext.Provider value={listState}>{children}</ReviewActionContext.Provider>;
};
