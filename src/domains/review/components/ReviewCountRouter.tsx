import { EmptyReviewsPage } from "@/pages/review/EmptyReviewsPage";
import { ReviewLandingPage } from "@/pages/review/ReviewLandingPage";
import { useReviewListContext } from "../contexts/ReviewListContext";

export const ReviewCountRouter = () => {
  const { reviewCount } = useReviewListContext();

  return reviewCount === 0 ? <EmptyReviewsPage /> : <ReviewLandingPage />;
};
