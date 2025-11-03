import { EmptyReviewsPage } from "@/pages/review/EmptyReviewsPage";
import { ReviewLandingPage } from "@/pages/review/ReviewLandingPage";
import { useReviewListContext } from "../contexts/ReviewListContext";
import { TitleWithClount } from "./TitleWithCount";

export const ReviewCountRouter = () => {
  const { reviewCount } = useReviewListContext();

  return <TitleWithClount reviewCount={1} />;
  // return reviewCount === 0 ? <EmptyReviewsPage /> : <ReviewLandingPage />;
};
