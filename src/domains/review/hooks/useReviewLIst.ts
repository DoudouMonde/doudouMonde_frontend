//전체 리뷰 조회 reviewList
//리뷰 개수 reviewCount

import { useState } from "react";

export const useReviewList = () => {
  const [reviewList, setReviewList] = useState([]);
  const [reviewCount, setReviewCount] = useState();

  return { reviewList, reviewCount };
};
