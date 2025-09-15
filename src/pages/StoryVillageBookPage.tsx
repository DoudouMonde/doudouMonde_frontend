import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BackIcon from "@/assets/icons/Back";
import { StorytownBookCoverEx } from "@/assets/icons/playroom/storytown_book";
import { StorytownBookInsideEx } from "@/assets/icons/playroom/storytown_book";
import { StorytownBookLogo } from "@/assets/icons/playroom/storytown_book";
import { reviewApi } from "@/domains/review/apis/reviewApi";

export const StoryVillageBookPage = () => {
  const navigate = useNavigate();
  const [reviewCount, setReviewCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // 리뷰 개수 가져오기
  useEffect(() => {
    const fetchReviewCount = async () => {
      try {
        const reviews = await reviewApi.getMemberReviews();
        setReviewCount(reviews.length);
      } catch (error) {
        console.error("리뷰 개수 조회 실패:", error);
        setReviewCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewCount();
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  // 진행도 계산
  const progressPercentage = (reviewCount / 9) * 100;
  const remainingCount = 9 - reviewCount;

  // 진행도에 따른 색상 결정
  const getProgressColor = () => {
    if (reviewCount === 0) return "from-gray-300 to-gray-400";
    if (reviewCount < 3) return "from-red-300 to-red-400";
    if (reviewCount < 6) return "from-yellow-300 to-yellow-400";
    if (reviewCount < 9) return "from-blue-300 to-blue-400";
    return "from-green-300 to-green-500"; // 9개 완료
  };

  return (
    <div className="overflow-y-auto mx-auto w-full max-w-md h-full">
      {/* 상단 바 */}
      <div className="fixed top-0 right-0 left-0 z-20 px-6 pt-4 pb-2 h-[60px] bg-gray-200/70 shadow-sm">
        <div className="flex justify-between items-center">
          <button
            onClick={handleBackClick}
            className="flex items-center w-10 h-10"
            aria-label="이전으로 이동"
          >
            <BackIcon className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex flex-1 justify-center">
            <div className="text-black title-hak">이야기 마을 북</div>
          </div>
          <div className="w-10"></div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="px-4 py-4 pt-24">
        <div className="flex flex-col gap-6 justify-center">
          {/* 이야기 마을 북 컨텐츠 */}
          <div className="flex flex-col justify-center gap-6 bg-gradient-to-br from-pink-50/80 to-purple-50/80 rounded-[20px] p-4 sm:p-6 w-full bg-gray-200/70 min-h-[600px] sm:min-h-[700px]">
            {/* 로고 섹션 */}
            <div className="flex flex-col gap-3 items-center">
              <StorytownBookLogo />
              <p className="leading-relaxed text-center text-gray-700 subtitle">
                이야기 마을에 후기를 9개 남기면
                <br />
                이야기 마을 북을 받아볼 수 있어요 ✨
              </p>
            </div>

            {/* 북 미리보기 섹션 */}
            <div className="flex flex-col gap-4 items-center">
              <StorytownBookCoverEx />
              <div className="relative">
                <div className="absolute -top-2 -right-2 px-2 py-1 text-xs font-bold text-yellow-900 bg-yellow-400 rounded-full shadow-md">
                  NEW
                </div>
              </div>
              <StorytownBookInsideEx />
            </div>

            {/* 설명 및 구매 섹션 */}
            <div className="p-6 rounded-2xl shadow-md bg-gray-100/5">
              <div className="space-y-4 text-center">
                <h3 className="text-lg text-gray-800 title-hak">
                  📚 특별한 추억을 책으로
                </h3>
                <p className="leading-relaxed text-gray-600 subtitle">
                  아이와 함께 한 공연 추억을
                  <br />
                  아름다운 책으로 간직할 수 있어요
                </p>

                {/* 가격 및 구매 버튼 */}
                <div className="flex flex-col gap-4 items-center pt-2">
                  <div className="flex gap-2 items-baseline">
                    <span className="text-3xl font-bold text-purple-600">
                      25,000
                    </span>
                    <span className="text-gray-500 subtitle">원</span>
                  </div>

                  <button className="flex gap-2 justify-center items-center px-8 py-4 w-full font-semibold text-gray-200 bg-green-200 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl shadow-lg transition-all duration-300 transform hover:shadow-xl hover:scale-105">
                    <span className="">🛒</span>
                    구매하기
                  </button>

                  <p className="text-xs text-gray-500">
                    * 후기 9개 작성 후 구매 가능
                  </p>
                </div>
              </div>
            </div>

            {/* 진행 상황 표시 */}
            <div className="p-4 rounded-xl bg-gray-200/80">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  후기 작성 진행도
                </span>
                <span className="text-sm font-bold">{reviewCount}/9</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full">
                <div
                  className={`h-3 bg-gradient-to-r rounded-full transition-all duration-500 ${getProgressColor()}`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="mt-2 text-xs text-center text-gray-600">
                {remainingCount > 0
                  ? `${remainingCount}개 더 작성하면 북을 받을 수 있어요! 💫`
                  : "축하해요! 북을 받을 수 있어요! 🎉"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
