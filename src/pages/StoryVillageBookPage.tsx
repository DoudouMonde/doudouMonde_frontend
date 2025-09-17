import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BackIcon from "@/assets/icons/Back";
import { StorytownBookCoverEx } from "@/assets/icons/playroom/storytown_book";
import { StorytownBookInsideEx } from "@/assets/icons/playroom/storytown_book";
import { StorytownBookLogo } from "@/assets/icons/playroom/storytown_book";
import { reviewApi } from "@/domains/review/apis/reviewApi";
import { ButtonChip, SwitchCase } from "@/shared/components";

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
    <div className="overflow-y-auto relative px-8 mx-auto w-full h-full">
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
      <div className="fixed top-0 right-0 left-0 z-20 px-4 sm:px-6 lg:px-8 pt-4 pb-2 h-[60px] bg-gray-200/70 shadow-sm">
        <div className="flex justify-between items-center">
          <button
            onClick={handleBackClick}
            className="flex items-center w-10 h-10"
            aria-label="이전으로 이동"
          >
            <BackIcon className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex flex-1 justify-center">
            <div className="text-black title-hak">이야기 마을북</div>
          </div>
          <div className="w-10"></div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-4 mt-24 pb-24 bg-gray-200/70 rounded-[20px] w-full min-h-screen">
        <div className="flex flex-col gap-2 justify-center items-center">
          {/* 헤더 섹션 */}
          <StorytownBookLogo className="w-72" />
          <p className="p-4 text-gray-600 body-hak-b">
            이야기마을을 오프라인 앨범으로 받아보세요
          </p>
          <div className="flex gap-4 items-center">
            <div className="flex flex-col gap-2">
              <p className="text-secondary-100 subtitle-b">가격</p>
              <p className="text-secondary-100 subtitle-b">구성</p>
              <p className="text-secondary-100 subtitle-b">사이즈</p>
              <p className="text-secondary-100 subtitle-b">재질</p>
              <p className="text-secondary-100 subtitle-b">배송기간</p>
              <p className="text-secondary-100 subtitle-b">주문방법</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-black subtitle-b">25,000원(배송비 포함)</p>
              <p className="text-black subtitle-b">
                공연 기록 9개 수록 + 상상 친구
              </p>
              <p className="text-black subtitle-b">양면 기준 A4 가로</p>
              <p className="text-black subtitle-b">소프트 커버 포토북</p>
              <p className="text-black subtitle-b">2주 내 배송</p>
              <p className="text-black subtitle-b">
                '주문하기'버튼 클릭 후 구글폼 작성
              </p>
            </div>
          </div>

          {/* 북 미리보기 카드 */}
          <div className="p-5">
            <p className="pt-3 text-center body-hak-r">상품 예시 이미지</p>
            <div>
              <div className="relative">
                <p className="absolute mt-7 subtitle-b">▼ 표지 예시</p>
                <StorytownBookCoverEx className="w-80 h-80" />
              </div>
            </div>
            <div>
              <p className="p-3 subtitle-b">▼ 내지 예시</p>
              <StorytownBookInsideEx />
            </div>
          </div>

          {/* 진행 상황 카드 */}
          <div className="p-6 w-full rounded-3xl bg-gray-200/90">
            <div className="flex gap-5 justify-center items-center mb-4">
              <div></div>
              <p className="mb-2 text-lg font-semibold text-gray-800">
                후기 작성 진행도
              </p>
              <div className="text-blue-600 subtitle-b">{reviewCount}/9</div>
            </div>

            <div className="mb-4 w-full h-4 bg-gray-100 rounded-full">
              <div
                className={`h-4 bg-gradient-to-r rounded-full transition-all duration-500 ${getProgressColor()}`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            <p className="text-sm text-center text-gray-600">
              {remainingCount > 0
                ? `${remainingCount}개 더 작성하면 이야기 마을 북을 받을 수 있어요!`
                : "축하해요! 이야기 마을북을 받을 수 있어요! 🎉"}
            </p>
          </div>
        </div>
      </div>
      {/* 하단 네비게이션 바 */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 w-full h-[80px] bg-gray-200 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
        <div className="flex justify-center items-center px-6 h-full">
          <div className="flex justify-center items-center w-full h-12 text-gray-200 bg-green-100 body-inter-b rounded-[20px]">
            주문하기
          </div>
        </div>
      </nav>
    </div>
  );
};
