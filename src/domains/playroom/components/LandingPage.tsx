import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LandingPageProps, ActionButtonProps } from "../types";
import { reviewApi } from "@/domains/review/apis/reviewApi";
import { useChildListQuery } from "@/domains/child/queries/useChildListQuery";
import { PATH } from "@/shared/constants/paths";
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

const LandingPage: React.FC<LandingPageProps> = ({
  onStart,
  onSkip,
  // className = "",
}) => {
  const [reviewCount, setReviewCount] = useState(0);
  const [showBookPopup, setShowBookPopup] = useState(false); // 테스트용으로 true로 설정
  const navigate = useNavigate();

  // 아이 목록 가져오기
  const { data: childListData } = useChildListQuery();

  // 모든 아이의 이름을 쉼표로 구분해서 가져오기 (기본값: "서아")
  const childNames =
    childListData?.contents?.map((child) => child.name).join(", ") || "서아";

  useEffect(() => {
    const fetchReviewCount = async () => {
      try {
        const reviews = await reviewApi.getMemberReviews();
        setReviewCount(reviews.length);

        // 리뷰가 9개일 때 팝업 표시
        if (reviews.length >= 9) {
          setShowBookPopup(true);
        }
      } catch (error) {
        console.error("리뷰 개수 조회 실패:", error);
        setReviewCount(0);
      }
    };

    fetchReviewCount();
  }, []);

  // 팝업 핸들러 함수들
  const handlePurchaseClick = () => {
    setShowBookPopup(false);
    navigate(PATH.STORY_VILLAGE_BOOK);
  };

  const handleCancelClick = () => {
    console.log("취소 버튼 클릭됨!");
    setShowBookPopup(false);
  };

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
      {/* 팝업 오버레이 */}
      {showBookPopup && (
        <div className="flex fixed inset-0 z-50 justify-center items-center backdrop-blur-sm bg-black/50">
          <div className="p-6 mx-4 w-full max-w-sm bg-gray-200 rounded-2xl shadow-2xl transition-all duration-300 transform scale-100">
            <div className="space-y-4 text-center">
              <div className="mb-2 text-4xl">🎉</div>
              <h3 className="text-lg font-bold text-gray-800 title-hak">
                축하해요!
              </h3>
              <p className="leading-relaxed text-gray-600 subtitle">
                이야기마을 후기를 9개 작성하셨네요!
                <br />
                우리 아이와 공연 추억을 담은
                <br />
                이야기마을 북을 구매할 수 있어요
              </p>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleCancelClick}
                  className="flex-1 px-4 py-3 font-medium text-gray-700 bg-gray-100 rounded-xl transition-colors duration-200 hover:bg-gray-300"
                >
                  취소
                </button>
                <button
                  onClick={handlePurchaseClick}
                  className="flex-1 px-4 py-3 font-medium text-gray-200 bg-green-200 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl transition-all duration-200 transform hover:shadow-lg hover:scale-105"
                >
                  구매하러 가기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
            <p className="text-center text-black text-base font-normal body-inter-r leading-[1.3] tracking-[-0.04em] ">
              안녕 {childNames}!
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
