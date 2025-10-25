import { useEffect, useState } from "react";
import { reviewApi } from "@/domains/review/apis/reviewApi";

export const useReviewCount = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const reviews = await reviewApi.getMemberReviews();
        setCount(reviews.length);
      } catch {
        setCount(0);
      }
    })();
  }, []);

  return count;
};
