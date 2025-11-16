import { useState } from "react";
import { ReviewItem } from "../types";

export const useReviewList = () => {
  const [reviewList, setReviewList] = useState<ReviewItem[]>([]);
  const [reviewCount, setReviewCount] = useState<number>(1);
  // const [reviewCount, setReviewCount] = useState<number>(0);
  //임시로 리뷰 개수 넣기

  return { reviewList, reviewCount };
};
