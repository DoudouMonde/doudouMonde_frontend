import { EmptyReviewsPage } from "@/pages/review/EmptyReviewsPage";
import { ReviewLandingPage } from "@/pages/review/ReviewLandingPage";
import { useReviewList } from "../hooks/useReviewLIst";

export const ReviewCountRouter = () => {
  const { reviewCount } = useReviewList();

  return (
    <> {reviewCount === 0 ? <EmptyReviewsPage /> : <ReviewLandingPage />}</>
  );
};
