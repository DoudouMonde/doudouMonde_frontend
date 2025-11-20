import { AddReviewBtn } from "@/domains/child/components/AddReviewBtn";
import { useReviewList } from "../hooks/useReviewLIst";
import { ReviewListRecord } from "../types/reviewApiTypes";
import { ReviewItem } from "./ReviewItem";

export const ReviewList = () => {
  const { reviewList } = useReviewList();

  return (
    <>
      {reviewList.items.map((reivew: ReviewListRecord) => (
        <ReviewItem key={reivew.id} review={reivew} />
      ))}

      <AddReviewBtn />
    </>
  );
};
