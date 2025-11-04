import { ReviewAddIcon } from "@/assets/icons/playroom";
import { useReviewActionContext } from "@/domains/review/contexts/ReviewActionContext";

export const AddReviewBtn = () => {
  const { addReviewHandler } = useReviewActionContext();

  return <ReviewAddIcon className="w-16" onClick={addReviewHandler} />;
};
