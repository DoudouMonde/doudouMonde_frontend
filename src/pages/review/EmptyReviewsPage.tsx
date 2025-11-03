import { AddReviewBtn } from "@/domains/child/components/AddReviewBtn";
import { TitleWithClount } from "@/domains/review/components/TitleWithCount";
import { ReviewActionProvider } from "@/domains/review/contexts/ReviewActionProvider";

export const EmptyReviewsPage = () => {
  return (
    //이야기마을 로고
    <>
      {" "}
      <TitleWithClount />
      <AddReviewBtn />
    </>
  );
};
