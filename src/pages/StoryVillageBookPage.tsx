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
    <div className="overflow-y-auto relative mx-auto w-full max-w-md h-full">
      {/* 배경 이미지 */}
      <div
        className="fixed inset-0 w-full h-full -z-30"
        style={{
          backgroundImage:
            "url('/assets/images/background/background_afternoon.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.5,
        }}
      />

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
      <div className="relative z-10 px-6 py-4 pt-24">
        <div className="flex flex-col gap-6">
          {/* 헤더 섹션 */}
          <div className="text-center">
            <h1 className="mb-2 text-2xl font-bold text-gray-800 title-hak">
              이야기 마을 북
            </h1>
            <p className="text-gray-600 body-hak-r">
              이야기마을을 오프라인 앨범으로 받아보세요
            </p>
          </div>

          {/* 북 미리보기 카드 */}
          <div className="p-6 rounded-3xl shadow-lg backdrop-blur-sm bg-white/90">
            <div className="flex flex-col gap-4 items-center">
              <div className="relative">
                <StorytownBookCoverEx />
                <div className="absolute -top-2 -right-2 px-3 py-1 text-xs font-bold text-white bg-red-500 rounded-full shadow-md">
                  NEW
                </div>
              </div>
              <StorytownBookInsideEx />
            </div>
          </div>

          {/* 진행 상황 카드 */}
          <div className="p-6 rounded-3xl shadow-lg backdrop-blur-sm bg-white/90">
            <div className="mb-4 text-center">
              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                후기 작성 진행도
              </h3>
              <div className="mb-2 text-3xl font-bold text-blue-600">
                {reviewCount}/9
              </div>
            </div>

            <div className="mb-4 w-full h-4 bg-gray-200 rounded-full">
              <div
                className={`h-4 bg-gradient-to-r rounded-full transition-all duration-500 ${getProgressColor()}`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            <p className="text-sm text-center text-gray-600">
              {remainingCount > 0
                ? `${remainingCount}개 더 작성하면 북을 받을 수 있어요!`
                : "축하해요! 북을 받을 수 있어요! 🎉"}
            </p>
          </div>

          {/* 구매 정보 카드 */}
          <div className="p-6 rounded-3xl shadow-lg backdrop-blur-sm bg-white/90">
            <div className="space-y-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                📚 특별한 추억을 책으로
              </h3>
              <p className="text-sm text-gray-600">
                아이와 함께 한 공연 추억을
                <br />
                아름다운 책으로 간직할 수 있어요
              </p>

              <div className="flex gap-1 justify-center items-baseline">
                <span className="text-4xl font-bold text-purple-600">
                  25,000
                </span>
                <span className="text-lg text-gray-500">원</span>
              </div>

              <button
                className={`w-full py-4 px-6 rounded-2xl font-semibold text-white transition-all duration-300 ${
                  reviewCount >= 9
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={reviewCount < 9}
              >
                {reviewCount >= 9
                  ? "🛒 구매하기"
                  : "후기 9개 작성 후 구매 가능"}
              </button>

              {reviewCount < 9 && (
                <p className="text-xs text-gray-500">
                  * 후기 9개 작성 후 구매 가능
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
