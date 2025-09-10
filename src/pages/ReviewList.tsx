import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reviewApi } from "@/domains/review/apis/reviewApi";
import { ReviewResponse } from "@/domains/review/types/ReviewResponse";
import { NavigationButtons } from "@/shared/components";
import { PATH } from "@/shared/constants";

const ReviewList: React.FC = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const reviewsData = await reviewApi.getMemberReviews();
        console.log("리뷰 목록 데이터:", reviewsData);
        setReviews(reviewsData);
      } catch (err) {
        console.error("리뷰 목록 조회 실패:", err);
        setError("리뷰를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handlePrevious = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleNext = () => {
    navigate(PATH.HOME); // 홈으로 이동
  };

  const handleReviewClick = (reviewId: number) => {
    console.log("reviewId", reviewId);
    navigate(`/playroom/reviews/${reviewId}`);
  };

  const formatDate = (dateArray: number[] | null) => {
    if (!dateArray || dateArray.length < 3) return "날짜 없음";
    const [year, month, day] = dateArray;
    return `${year}. ${month}. ${day}.`;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <div className="p-6 w-full bg-gray-200/70 rounded-[40px] mt-20 mb-24">
          <div className="flex flex-col justify-center items-center h-96">
            <div className="text-lg text-gray-600">리뷰를 불러오는 중...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen">
        <div className="p-6 w-full bg-gray-200/70 rounded-[40px] mt-20 mb-24">
          <div className="flex flex-col justify-center items-center h-96">
            <div className="mb-4 text-lg text-red-600">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="p-6 w-full bg-gray-200/70 rounded-[40px] mt-20 mb-24">
        {/* Header */}
        <div className="flex flex-col mb-6">
          <h1 className="mb-4 title-inter">내 리뷰 목록</h1>
          <p className="subtitle text-secondary-100">
            지금까지 작성한 공연 리뷰들을 확인해보세요
          </p>
        </div>
        <hr className="my-4 mb-6 border-secondary-100/30" />

        {/* 리뷰 목록 */}
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <div className="flex flex-col justify-center items-center py-12">
              <div className="mb-4 text-lg text-gray-600">
                아직 작성한 리뷰가 없습니다
              </div>
              <button
                onClick={() => navigate(PATH.HOME)}
                className="px-6 py-3 text-white bg-blue-500 rounded-lg transition-colors hover:bg-blue-600"
              >
                첫 리뷰 작성하기
              </button>
            </div>
          ) : (
            reviews.map((review) => (
              <div
                key={review.reviewId}
                onClick={() => handleReviewClick(review.reviewId)}
                className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm transition-shadow cursor-pointer hover:shadow-md"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {typeof review.seenPerformance === "string"
                      ? review.seenPerformance
                      : review.seenPerformance?.performanceTitle ||
                        "공연명 없음"}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(review.watchDate)}
                  </span>
                </div>

                <div className="flex gap-4 items-center mb-3">
                  <div className="flex gap-2 items-center">
                    <span className="text-sm text-gray-600">캐릭터:</span>
                    <span className="text-sm font-medium">
                      {review.characterName || "캐릭터명 없음"}
                    </span>
                  </div>
                </div>

                {review.reviewText && (
                  <p className="mb-3 text-sm text-gray-700 line-clamp-2">
                    {review.reviewText}
                  </p>
                )}

                <div className="flex gap-4 items-center text-xs text-gray-500">
                  {review.imageUrls && review.imageUrls.length > 0 && (
                    <span>📷 {review.imageUrls.length}장</span>
                  )}
                  {review.audioUrl && <span>🎵 음성</span>}
                </div>
              </div>
            ))
          )}
        </div>

        {/* 네비게이션 버튼 */}
        <div className="mt-8">
          <NavigationButtons
            onPrevious={handlePrevious}
            onNext={handleNext}
            isNextDisabled={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
