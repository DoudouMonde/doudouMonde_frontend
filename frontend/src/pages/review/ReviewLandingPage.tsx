import { AddReviewBtn } from "@/domains/child/components/AddReviewBtn";
import { TitleWithClount } from "@/domains/review/components/TitleWithCount";
import { useReviewList } from "@/domains/review/hooks/useReviewLIst";

export const ReviewLandingPage = () => {
  const { reviewCount } = useReviewList();

  return (
    <>
      <TitleWithClount reviewCount={reviewCount} />
      {/* 리뷰 조회 */}
      <AddReviewBtn />
    </>
  );
};
