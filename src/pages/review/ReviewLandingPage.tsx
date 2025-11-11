import { AddReviewBtn } from "@/domains/child/components/AddReviewBtn";
import { TitleWithClount } from "@/domains/review/components/TitleWithCount";
import { useReviewListContext } from "@/domains/review/contexts/ReviewListContext";

export const ReviewLandingPage = () => {
  const { reviewCount } = useReviewListContext();

  return (
    <>
      <TitleWithClount reviewCount={reviewCount} />
      {/* 리뷰 조회 */}
      <AddReviewBtn />
    </>
  );
};
