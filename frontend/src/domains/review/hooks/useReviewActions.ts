import { useNavigate } from "react-router-dom";
import { PATH } from "@/shared/constants";

export const useReviewAction = () => {
  const navigate = useNavigate();

  const addReviewHandler = () => {
    //리뷰 작성 페이지로 이동하기
    navigate(PATH.REVEIW_START);
  };

  //   const { open, closePopup } = useBookPopup(reviewCount, 9);

  const handleStart = () => navigate(PATH.REVIEW_FUNNEL);
  const handleSkip = () => navigate("/playroom/reviews");
  const handlePurchase = () => {
    // closePopup();
    navigate(PATH.STORY_VILLAGE_BOOK);
  };

  return { addReviewHandler, handleStart, handleSkip, handlePurchase };
};
