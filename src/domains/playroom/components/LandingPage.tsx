import React, { useEffect, useState } from "react";
import { LandingPageProps, ActionButtonProps } from "../types";
import { reviewApi } from "@/domains/review/apis/reviewApi";
import {
  StorytownTree0,
  StorytownTree1,
  StorytownTree2,
  StorytownTree3,
  StorytownTree4,
  StorytownTree5,
  StorytownTree6,
  StorytownTree7,
  StorytownTree8,
  StorytownTree9,
} from "@/assets/icons/playroom/storytown_tree";

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  children,
  variant = "primary",
  className = "",
}) => {
  const baseClasses =
    "w-[142px] h-[31px] rounded-[10px] font-['Hakgyoansim_Dunggeunmiso_OTF'] text-base font-normal tracking-[-0.03em] transition-all duration-200 hover:scale-105 active:scale-95";

  const variantClasses =
    variant === "primary"
      ? "bg-[#FFF288] text-black shadow-lg"
      : "bg-[#FFF288] text-black shadow-lg";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
};
/**API 호출하는 방법 */
// const [recommendedPerformanceList, setRecommendedPerformanceList] = useState<
//   PerformanceItem[]
// >([]);

// useEffect(
//   function initializeRecommendedPerformanceList() {

//     const fetchRecommendedPerformanceList = async () => {
//       // const { contents: recommendedPerformances } =
//       const recommendedPerformances =
//         await performanceApi.getRecommendedPerformanceList(selectedChild.id);
//       setRecommendedPerformanceList(recommendedPerformances);
//     };

//     fetchRecommendedPerformanceList();
//   },
// );
const LandingPage: React.FC<LandingPageProps> = ({
  onStart,
  onSkip,
  // className = "",
}) => {
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    const fetchReviewCount = async () => {
      try {
        const reviews = await reviewApi.getMemberReviews();
        setReviewCount(reviews.length);
      } catch (error) {
        console.error("리뷰 개수 조회 실패:", error);
        setReviewCount(0);
      }
    };

    fetchReviewCount();
  }, []);

  // 리뷰 개수에 맞는 나무 컴포넌트 결정 (최대 9개)
  const getTreeComponent = (count: number) => {
    const treeCount = Math.min(count, 9);
    const treeComponents = [
      StorytownTree0,
      StorytownTree1,
      StorytownTree2,
      StorytownTree3,
      StorytownTree4,
      StorytownTree5,
      StorytownTree6,
      StorytownTree7,
      StorytownTree8,
      StorytownTree9,
    ];
    return treeComponents[treeCount];
  };
  return (
    <div className={`overflow-hidden relative w-full h-screen`}>
      {/* Background Image */}
      {/* <PlayingCardsIcon className="w-10 h-10 text-green-100" /> */}
      {/* Main Content Area */}
      <div className="relative pt-[64px]">
        {/* 나무 이미지 */}
        <div className="flex z-20 justify-center items-start pt-8 w-full">
          {(() => {
            const TreeComponent = getTreeComponent(reviewCount);
            return (
              <TreeComponent className="w-full h-auto object-contain drop-shadow-[0px_0px_5px_rgba(0,0,0.5,0)]" />
            );
          })()}
        </div>

        <div className="flex absolute inset-x-0 top-0 z-20 flex-col gap-0 justify-center items-center mx-auto translate-y-full">
          {/* Speech Bubble */}
          <div className="bg-gray-200/70 backdrop-blur-sm rounded-[40px] w-[80%] p-6 shadow-[0px_0px_12px_0px_rgba(255,246,165,1)]">
            <p className="text-center text-black text-base font-normal leading-[1.21] tracking-[-0.04em] font-['Inter']">
              안녕 서아야!
              <br />
              이야기마을에 온 걸 환영해.
              <br />
              나와 함께 상상친구를 만들면서
              <br />
              우리가 본 공연을 한 번 추억해볼까?
            </p>
          </div>

          {/* Character - Doudou */}
          <div className="flex z-20 gap-0 justify-evenly items-center w-full">
            <img
              src="/assets/characters/doudou.png"
              alt="두두 캐릭터"
              className="w-[193px] h-[248px] object-contain drop-shadow-[0px_0px_10px_rgba(202, 255, 133, 0.1)]"
            />

            {/* Action Buttons */}
            <div className="flex flex-col gap-7 items-end pb-8">
              <ActionButton onClick={onStart || (() => {})}>좋아</ActionButton>
              <ActionButton onClick={onSkip || (() => {})}>
                다음에 할래
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
