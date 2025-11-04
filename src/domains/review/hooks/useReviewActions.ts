//addReviewHandler

import { useNavigate } from "react-router-dom";
import { PATH } from "@/shared/constants";

export const useReviewAction = () => {
  const navigate = useNavigate();

  const addReviewHandler = () => {
    //리뷰 작성 페이지로 이동하기
    console.log("페이지 이동 클릭");
    navigate("/playroom/review-create-page");
  };

  //   const { open, closePopup } = useBookPopup(reviewCount, 9);

  const handleStart = () => navigate(PATH.SELECT_PERFORMANCE);
  const handleSkip = () => navigate("/playroom/reviews");
  const handlePurchase = () => {
    // closePopup();
    navigate(PATH.STORY_VILLAGE_BOOK);
  };

  return { addReviewHandler, handleStart, handleSkip, handlePurchase };
};
