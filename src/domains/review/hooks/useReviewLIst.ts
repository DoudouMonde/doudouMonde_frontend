import { useState } from "react";
import { ReviewItem } from "../types";

export const useReviewList = () => {
  const [reviewList, setReviewList] = useState<ReviewItem[]>([]);
  const [reviewCount, setReviewCount] = useState<number>(0);

  return { reviewList, reviewCount };
};
