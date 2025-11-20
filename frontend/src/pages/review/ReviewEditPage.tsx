import { PlayroomLayout } from "@/app/PlayroomLayout";
import { EditPen } from "@/assets/icons";
import { AnimalPreview } from "@/domains/playroom/components/AnimalPreview";
import { ReviewMetaInfo } from "@/domains/review/components/ReviewMetaInfo";
import { useReviewDetail } from "@/domains/review/hooks/useReviewDetail";
import { NavigationButtons } from "@/shared/components";
import { ReviewContainer } from "@/shared/components/Layout/ReviewContainer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ReviewEditPage = () => {
  const { reviewId } = useParams<{ reviewId: string }>();
  const { reviewData, isLoading, error } = useReviewDetail(reviewId);
  const [characterName, setCharacterName] = useState("");

  useEffect(() => {
    if (reviewData?.characterName) {
      setCharacterName(reviewData.characterName);
    }
  }, [reviewData]);

  return (
    <PlayroomLayout>
      <ReviewContainer title="">
        {/* 캐릭터랑  리뷰 정보 */}
        <section className="flex items-center ">
          <div className="flex relative">
            <AnimalPreview
              step="accessory"
              size="middle"
              isAnimating={false}
              isShadow={false}
              selectedAnimal={reviewData.characterAnimal}
              selectedEmotion={reviewData.characterEmotion}
              selectedAcc={reviewData.characterAccessory}
            />
            <EditPen className="w-8 absolute right-5 bottom-2 z-10" />
          </div>
          <div>
            <input
              type="text"
              value={characterName}
              placeholder={reviewData.characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              className="border border-secondary-100/50 rounded-3xl px-3 py-2"
            />
            <ReviewMetaInfo reviewData={reviewData} charName={false} />
          </div>
        </section>
        <hr className="mb-6 border-secondary-100/30" />

        {/* 아래 섹션 */}
        <section className="px-6">
          <div className="flex justify-between  mb-4">
            <p className="title-inter body-hak-b">기록장</p>
          </div>
          {/* 아이변겅 */}
          <p>아이 수정</p>
          {/* 날짜 수정 */}
          <p>관람 날짜 수정</p>

          {/* 사진후기 */}
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

        <NavigationButtons />

        <button
          type="button"
          aria-label="아이 삭제하기"
          className={
            "p-3 w-full text-center border-t-[0.2px] border-secondary-100 text-red-100 body-inter-b"
          }
        >
          리뷰 삭제하기
        </button>

        {/* 기록장 */}
      </ReviewContainer>
    </PlayroomLayout>
  );
};
