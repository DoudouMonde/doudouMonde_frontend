import { EmptyReviewsPage } from "@/pages/review/EmptyReviewsPage";
import { ReviewLandingPage } from "@/pages/review/ReviewLandingPage";
import { useReviewListContext } from "../contexts/ReviewListContext";
import { ReviewActionProvider } from "../contexts/ReviewActionProvider";

export const ReviewCountRouter = () => {
  const { reviewCount } = useReviewListContext();

  return <ReviewActionProvider>{reviewCount === 0 ? <EmptyReviewsPage /> : <ReviewLandingPage />}</ReviewActionProvider>;
};
