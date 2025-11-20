import { ReviewAddIcon } from "@/assets/icons/playroom";
import { useReviewAction } from "@/domains/review/hooks/useReviewActions";

export const AddReviewBtn = () => {
  const { addReviewHandler } = useReviewAction();

  return (
    <ReviewAddIcon
      className="w-16 flex fixed right-4 bottom-20 z-30 "
      onClick={addReviewHandler}
    />
  );
};
