import { useNavigate } from "react-router-dom";
import { PATH } from "@/shared/constants/paths";

import { LandingHero } from "@/domains/playroom/features/landing/LandingHero";
import { useReviewCount } from "@/domains/playroom/features/landing/useReviewCount";
import { useChildNames } from "@/domains/playroom/features/landing/useChildNames";
import { useBookPopup } from "@/domains/playroom/features/landing/useBookPopup";

export const PlayroomPage = () => {
  const { reviewCount } = useReviewContext(); //만들 것임요

  reviewCount == 0 ? <EmptyReviewsPage /> : <ReviewLandingPage />;
};

//기존 코드 LandingHero 페이지로 넘기는 과정
// export const PlayroomPage = () => {
//   const navigate = useNavigate();

//   const reviewCount = useReviewCount();
//   const childNames = useChildNames();
//   const { open, closePopup } = useBookPopup(reviewCount, 9);

//   const handleStart = () => navigate(PATH.SELECT_PERFORMANCE);
//   const handleSkip = () => navigate("/playroom/reviews");
//   const handlePurchase = () => {
//     closePopup();
//     navigate(PATH.STORY_VILLAGE_BOOK);
//   };

//   return (
//     <div className="w-full h-full mb-18">
//       <LandingHero
//         reviewCount={reviewCount}
//         childNames={childNames}
//         onStart={handleStart}
//         onSkip={handleSkip}
//         popup={open}
//         onPurchase={handlePurchase}
//         onClosePopup={closePopup}
//       />
//     </div>
//   );
// };

//PlayroomPage 페이지

//-playromm Lading page - 리뷰 0개일 때
