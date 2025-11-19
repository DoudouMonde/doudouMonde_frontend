import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CharacterType,
  CharacterEmotion,
  CharacterAccessories,
} from "@/domains/review/types/characterTypes";
import { ReviewMetaInfo } from "@/domains/review/components/ReviewMetaInfo";
import { PlayroomLayout } from "@/app/PlayroomLayout";
import { AnimalPreview } from "@/domains/playroom/components/AnimalPreview";
import { ReviewDetailResponse } from "@/domains/review/types/reviewApiTypes";
import { ReviewTree } from "@/domains/playroom/components/ReviewTree";

const mockData: ReviewDetailResponse = {
  id: "1",
  performanceName: "햄릿",
  watchDate: "2024-03-14",
  content:
    "배우들의 연기가 너무 훌륭했고, 몰입감 있는 무대 연출이 인상적이었습니다.",
  imageUrls: [
    "https://picsum.photos/id/1015/600/400",
    "https://picsum.photos/id/1025/600/400",
    "https://picsum.photos/id/1035/600/400",
    "https://picsum.photos/id/1045/600/400",
  ],
  characterName: "Hamlet",
  characterAnimal: CharacterType.CAT,
  characterEmotion: CharacterEmotion.HAPPY,
  characterAccessory: CharacterAccessories.FLOWER,
};

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

  //실제 api
  // useEffect(() => {
  //   console.log("실행되는지");
  //   const fetchReviewDetail = async () => {
  //     if (isNaN(numericReviewId) || numericReviewId === 0) {
  //       setError("유효하지 않은 리뷰 ID입니다.");
  //       setIsLoading(false);
  //       return;
  //     }

  //     try {
  //       setIsLoading(true);
  //       setError(null);

  //       const data = await reviewApi.getReviewDetail(numericReviewId);
  //       setReviewData(data);
  //     } catch (err) {
  //       console.log("리뷰 상세 정보를 가져오는 중 오류 발생:", err);
  //       // setError(
  //       //   "데이터를 불러오는 데 실패했습니다. Mock 데이터를 사용합니다."
  //       // );
  //       setReviewData(mockData);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   console.log(isLoading);
  //   fetchReviewDetail();
  // }, [reviewId]);
  useEffect(() => {
    setReviewData(mockData);
    setIsLoading(false);
  }, []);

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
      <section className="flex relative z-10">
        <ReviewTree />
        <figure className="absolute inset-x-0 bottom-0 -mb-10 flex justify-center">
          <AnimalPreview
            step="accessory"
            isAnimating={false}
            isShadow={false}
            selectedAnimal={reviewData.characterAnimal}
            selectedEmotion={reviewData.characterEmotion}
            selectedAcc={reviewData.characterAccessory}
          />
        </figure>
      </section>

      {/* 회색 배경 콘텐츠 영역 */}
      <article className="relative -z-50  bg-gray-200 backdrop-blur-sm py-6 w-full ">
        <header>
          <ReviewMetaInfo reviewData={reviewData} />
          <hr className="mb-6 border-secondary-100/30" />
        </header>
        {/* 리뷰 내용 */}
        <section className="px-6">
          <div className="flex justify-between  mb-4">
            <p className="title-inter body-hak-b">기록장</p>
            <div className="flex text-gray-900 subtitle-b gap-2">
              <button className="bg-yellow-200 rounded-[10px] w-20 py-1">
                수정
              </button>
              <button className="bg-tertiary-100 rounded-[10px] w-20  py-1">
                삭제
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {reviewData.imageUrls.slice(0, 4).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`review-image-${idx}`}
                className="w-full aspect-square object-cover rounded-lg"
              />
            ))}
            {/* 텍스트 후기 */}
            <div className="py-4 ">
              <p className="text-black body-hak-r ">{reviewData.content}</p>
            </div>
          </div>
        </section>
      </article>
    </PlayroomLayout>
  );
};
