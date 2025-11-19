import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar, PlayingCardsIcon } from "@/assets/icons";
import {
  CharacterType,
  CharacterEmotion,
  CharacterAccessories,
} from "@/domains/review/types/characterTypes";

const mockData: ReviewDetailResponse = {
  id: "1",
  performanceName: "햄릿",
  watchDate: "2024-03-14",
  content:
    "배우들의 연기가 너무 훌륭했고, 몰입감 있는 무대 연출이 인상적이었습니다.",
  imageUrls: ["https://example.com/review1_img1.jpg"],
  characterName: "Hamlet",
  characterAnimal: CharacterType.CAT,
  characterEmotion: CharacterEmotion.HAPPY,
  characterAccessory: CharacterAccessories.CAP,
};

import { StorytownTree1 } from "@/assets/icons/playroom/storytown_tree";
import { PlayroomLayout } from "@/app/PlayroomLayout";
import { AnimalPreview } from "@/domains/playroom/components/AnimalPreview";
import { ReviewDetailResponse } from "@/domains/review/types/reviewApiTypes";
import { reviewApi } from "@/domains/review/apis/reviewApi";

export const ReviewDetailPage = () => {
  const navigate = useNavigate();
  //review id 가져오기
  const { reviewId } = useParams<{ reviewId: string }>();
  const numericReviewId = Number(reviewId);

  const [reviewData, setReviewData] = useState<ReviewDetailResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    console.log("실행되는지");
    const fetchReviewDetail = async () => {
      if (isNaN(numericReviewId) || numericReviewId === 0) {
        setError("유효하지 않은 리뷰 ID입니다.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const data = await reviewApi.getReviewDetail(numericReviewId);
        setReviewData(data);
      } catch (err) {
        console.log("리뷰 상세 정보를 가져오는 중 오류 발생:", err);
        // setError(
        //   "데이터를 불러오는 데 실패했습니다. Mock 데이터를 사용합니다."
        // );
        setReviewData(mockData);
      } finally {
        setIsLoading(false);
      }
    };
    console.log(isLoading);
    fetchReviewDetail();
  }, [reviewId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-gray-600">리뷰를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !reviewData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="mb-4 text-lg text-red-600">
            {error || "리뷰를 찾을 수 없습니다."}
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 text-white bg-blue-100 rounded-lg hover:bg-blue-200"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <PlayroomLayout>
      {/* 스크롤 가능한 콘텐츠 */}
      <StorytownTree1 />
      <div className="relative z-10 w-full">
        {/* 캐릭터 영역 - 투명 배경 */}
        <div className="flex flex-col items-center pt-36 pb-8">
          <div className="flex relative z-10 flex-col items-center">
            <div className="flex justify-center">
              <AnimalPreview
                step="accessory"
                isAnimating={false}
                selectedAnimal={reviewData.characterAnimal}
                selectedEmotion={reviewData.characterEmotion}
                selectedAcc={reviewData.characterAccessory}
              />
            </div>
          </div>
        </div>

        {/* 회색 배경 콘텐츠 영역 */}
        <div className="relative z-0 -mt-20 bg-gray-200/70 backdrop-blur-sm rounded-[40px] p-6 w-full">
          <div className="flex justify-center mt-5 mb-5">
            <div className="flex flex-col gap-2 w-auto min-w-20">
              <p className="flex justify-center title-hak">
                {reviewData.characterName}
              </p>
              <div className="flex flex-col gap-2 p-4">
                <div className="flex gap-1 items-center">
                  <PlayingCardsIcon className="w-[13px] h-[13px]" />
                  <p className="body-hak-r">{reviewData.performanceName}</p>
                </div>
                <div className="flex gap-1 items-center">
                  <Calendar className="w-[13px] h-[13px] flex-shrink-0" />
                  <p className="whitespace-nowrap body-hak-r">
                    {new Date(reviewData.watchDate)
                      .toISOString()
                      .split("T")[0] || "날짜 정보 없음"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <hr className="mb-6 border-secondary-100/30" />

          {/* 리뷰 내용 */}
          <div className="mb-4">
            <p className="title-inter body-hak-b">기록장</p>
          </div>
          <div>
            {/* 등록된 사진 갤러리 */}
            <div className="">
              {/* 더미 이미지 데이터 */}
              {(() => {
                const dummyImages = [
                  "/assets/images/playroom/backgroundImg.png",
                  "/assets/images/playroom/backgroundImg.png",
                  "/assets/images/playroom/backgroundImg.png",
                  "/assets/images/playroom/backgroundImg.png",
                ];

                const displayImages =
                  reviewData.imageUrls.length > 0
                    ? reviewData.imageUrls
                    : dummyImages;

                return (
                  <div className="overflow-x-auto no-scrollbar">
                    <div
                      className="flex gap-4 pb-2"
                      style={{ width: "max-content" }}
                    >
                      {displayImages.map((imageUrl, index) => (
                        <div
                          key={index}
                          className="relative w-32 h-32 bg-white/60 backdrop-blur-sm rounded-[16px] overflow-hidden flex-shrink-0"
                        >
                          <img
                            src={imageUrl}
                            alt={`리뷰 사진 ${index + 1}`}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* 텍스트 후기 */}
            <div className="p-4">
              <p className="text-gray-900-100 body-inter-r">
                {reviewData.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PlayroomLayout>
  );
};
