import { EmptyReviewsPage } from "@/pages/review/EmptyReviewsPage";
import { ReviewLandingPage } from "@/pages/review/ReviewLandingPage";
import { useReviewList } from "../hooks/useReviewLIst";
import { ReviewActionProvider } from "../contexts/ReviewActionProvider";

export const ReviewCountRouter = () => {
  const { reviewCount } = useReviewList();

  return (
    <ReviewActionProvider>
      {reviewCount === 0 ? <EmptyReviewsPage /> : <ReviewLandingPage />}
    </ReviewActionProvider>
  );
};
