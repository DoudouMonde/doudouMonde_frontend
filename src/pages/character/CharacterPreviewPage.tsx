import React, { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { reviewApi } from "@/domains/review/apis/reviewApi";
import {
  CharacterType,
  CharacterEmotion,
  CharacterAccessories,
} from "@/domains/review/types/ReviewAddRequest";
import { useReviewStore } from "@/stores/reviewStore";
import { useCharaterFlowState } from "@/domains/playroom/hooks/useCharacterFlowState";
import { animals } from "@/domains/playroom/constants/animals";

export const CharacterPreviewPage: React.FC = () => {
  const navigate = useNavigate();
    const {
      selectedAnimal,
      selectedEmotion,
      selectedAcc
    } = useCharaterFlowState({
      stepName: "accessory",
      storageKey: "selectedAcc",
      initialValue: accessories[0].id,
    });

  

  const {
    reviewText,
    uploadedImages,
    recordedAudio,
    selectedDate,
    selectedPerformance,
    characterName,
    setCharacterName,
    clearReviewData,
  } = useReviewStore();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);


  // 캐릭터 데이터를 API 형식으로 변환
  const convertToApiFormat = () => {
    const animalToType: Record<string, CharacterType> = {
      chick: CharacterType.CHICK,
      cat: CharacterType.CAT,
      dino: CharacterType.DINO,
      dog: CharacterType.DOG,
      rabbit: CharacterType.RABBIT,
    };

    const emotionToApi: Record<string, CharacterEmotion> = {
      happy: CharacterEmotion.HAPPY,
      exited: CharacterEmotion.EXITED,
      surprise: CharacterEmotion.SURPRISE,
      sad: CharacterEmotion.SAD,
      bored: CharacterEmotion.BORED,
      curios: CharacterEmotion.CURIOUS,
    };

    const accessoryToApi: Record<string, CharacterAccessories> = {
      crwon: CharacterAccessories.CROWN,
      flower: CharacterAccessories.FLOWER,
      hat: CharacterAccessories.HAT,
      ribbon: CharacterAccessories.RIBBON,
      roundGlass: CharacterAccessories.ROUND_GLASS,
      wizardHat: CharacterAccessories.WIZARD_HAT,
    };

  };

    setIsSubmitting(true);

    try {
      // 1. 서버에 보낼 JSON 데이터 객체를 생성합니다.
      const reviewData = convertToApiFormat();

      console.log("📝 리뷰 등록 요청 데이터 상세:", {
        seenPerformanceId: reviewData.seenPerformanceId,
        performanceName: reviewData.performanceName,
        watchDate: reviewData.watchDate,
        content: reviewData.content,
        characterName: reviewData.characterName,
        characterType: reviewData.characterType,
        characterEmotion: reviewData.characterEmotion,
        characterAccessories: reviewData.characterAccessories,
        timestamp: new Date().toISOString(),
      });

      console.log("🎭 선택된 공연 정보:", {
        selectedPerformanceFromStorage,
        selectedPerformance,
        selectedPerformanceId:
          selectedPerformanceFromStorage?.id || selectedPerformance?.id,
        selectedPerformanceTitle:
          selectedPerformanceFromStorage?.title || selectedPerformance?.title,
      });

      // 2. FormData 객체를 새로 생성합니다.
      const formData = new FormData();

      // 3. JSON 데이터를 'application/json' 타입의 Blob으로 변환하여 'request' 파트에 담습니다.
      const reviewBlob = new Blob([JSON.stringify(reviewData)], {
        type: "application/json",
      });
      formData.append("request", reviewBlob);

      // 4. Zustand store에서 이미지 파일들을 가져와서 FormData에 추가
      console.log("📸 업로드된 이미지 정보:", {
        uploadedImagesFromStore: uploadedImages,
        uploadedImagesLength: uploadedImages?.length || 0,
        uploadedImagesType: typeof uploadedImages,
        isArray: Array.isArray(uploadedImages),
      });

      const validImages = uploadedImages.filter(
        (img) => img !== null
      ) as File[];

      console.log("📸 유효한 이미지 정보:", {
        validImages,
        validImagesLength: validImages.length,
        validImagesDetails: validImages.map((img, index) => ({
          index,
          name: img.name,
          size: img.size,
          type: img.type,
          lastModified: img.lastModified,
        })),
      });

      if (validImages.length > 0) {
        // localStorage 방식과 동일하게 Blob으로 변환해서 추가
        validImages.forEach(async (image, index) => {
          console.log(`📸 이미지 ${index} 처리 상세:`, {
            index,
            name: image.name,
            size: image.size,
            type: image.type,
            lastModified: image.lastModified,
            webkitRelativePath: image.webkitRelativePath,
            isFile: image instanceof File,
            isBlob: image instanceof Blob,
          });

          // File을 Blob으로 변환 (이미 File은 Blob을 상속받지만, 명시적으로 변환)
          const imageBlob = new Blob([image], { type: image.type });
          console.log(`📸 Blob 변환 결과 ${index}:`, {
            originalSize: image.size,
            blobSize: imageBlob.size,
            originalType: image.type,
            blobType: imageBlob.type,
            sizeMatch: image.size === imageBlob.size,
            typeMatch: image.type === imageBlob.type,
          });

          formData.append(`images`, imageBlob, `image_${index}_${image.name}`);
          console.log(`📸 FormData에 이미지 ${index} 추가 완료`);
        });

        console.log("📸 FormData 이미지 추가 완료:", {
          totalImages: validImages.length,
          formDataKeys: Array.from(formData.keys()),
          formDataEntries: Array.from(formData.entries()).map(
            ([key, value]) => ({
              key,
              valueType: typeof value,
              isFile: value instanceof File,
              isBlob: value instanceof Blob,
              size: value instanceof Blob ? value.size : "N/A",
              type: value instanceof Blob ? value.type : "N/A",
            })
          ),
        });
      } else {
        console.log("CharacterPreview - 추가할 이미지가 없습니다.");
      }

      // 5. Zustand store에서 오디오 파일을 가져와서 FormData에 추가
      if (recordedAudio) {
        console.log("CharacterPreview에서 받은 오디오:", recordedAudio);
        console.log("오디오 크기:", recordedAudio.size, "bytes");
        console.log("오디오 타입:", recordedAudio.type);

        formData.append("audioFile", recordedAudio, "voice-review.wav");
        console.log("오디오 파일이 FormData에 추가되었습니다.");
      } else {
        console.log("오디오 파일이 없습니다. 빈 파일을 추가합니다.");
        // 오디오 파일이 없는 경우 빈 파일 추가
        const emptyAudioBlob = new Blob([], { type: "audio/wav" });
        formData.append("audioFile", emptyAudioBlob, "empty_audio.wav");
      }

      // 6. FormData 내용 확인
      console.log("=== FormData 내용 확인 ===");
      console.log("FormData entries:");
      for (const [key, value] of formData.entries()) {
        if (
          value &&
          typeof value === "object" &&
          "name" in value &&
          "size" in value &&
          "type" in value
        ) {
          // File 객체인 경우
          console.log(
            `${key}: File(${(value as File).name}, ${
              (value as File).size
            } bytes, ${(value as File).type})`
          );
        } else if (
          value &&
          typeof value === "object" &&
          "size" in value &&
          "type" in value
        ) {
          // Blob 객체인 경우
          console.log(
            `${key}: Blob(${(value as Blob).size} bytes, ${
              (value as Blob).type
            })`
          );
        } else {
          console.log(`${key}: ${value}`);
        }
      }
      console.log("=== FormData 확인 완료 ===");

      // 7. API를 호출할 때, 일반 객체(reviewData)가 아닌 'formData' 객체를 전달합니다.
      console.log("FormData 객체를 API로 전송합니다...");
      const reviewId = await reviewApi.addReview(formData);

      console.log("리뷰가 성공적으로 등록되었습니다. Review ID:", reviewId);

      // 리뷰 데이터 초기화
      clearReviewData();

      // 리뷰 상세 페이지로 이동
      navigate(`/playroom/reviews/${reviewId}`);
    } catch (error) {
      console.error("리뷰 등록 중 오류가 발생했습니다:", error);
      //alert에 error 출력
      alert("리뷰 등록 중 오류가 발생했습니다.: " + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ReviewContainer title="상상친구 완성!" flow={REVIEW_FLOW}>
      {/* Header */}
      <Desc
        content={
          <>
            {" "}
            멋진 상상친구가 완성되었어요! // <br />
            // 함께 공연을 즐겨보세요.
          </>
        }
      />

      {/* 완성된 캐릭터 표시 */}
            <AnimalPreview
              step="accessory"
              isAnimating={isAnimating}
              selectedAnimal={selectedAnimal}
              selectedEmotion={selectedEmotion}
              selectedAcc= {selectedAcc}
            />

      <div className="flex justify-center">
        <div className="flex flex-col gap-2 w-auto">
          <div className="flex gap-1 items-center">
            <PlayingCardsIcon className="w-[13px] h-[13px]" />
            <p className="body-hak-r">
              {selectedPerformanceFromStorage?.title ||
                selectedPerformance?.title ||
                "공연이름"}
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <Calendar className="w-[13px] h-[13px] flex-shrink-0" />
            <p className="whitespace-nowrap body-hak-r">
              {selectedDate || "선택날짜"}
            </p>
          </div>
        </div>
      </div>

      <hr className="my-4 mb-6 border-secondary-100/30" />

      <p className="mb-4 Inter">상상친구 이름 지어주기</p>
      <p className="subtitle text-secondary-100">
        축하해요 😍 <br />
        공연 경험을 함께 추억해줄 상상친구가 완성되었어요! <br />
        이제 이 상상친구의 이름을 지어주세요.
      </p>

      <input
        type="text"
        placeholder="이름을 입력하세요..."
        value={characterName}
        onChange={(e) => setCharacterName(e.target.value)}
        className="p-4 mt-5 w-full h-10 subtitle text-gray-700 bg-transparent border border-secondary-100/30 outline-none body-inter rounded-[20px] focus:border-secondary-100/50 transition-colors duration-200"
      />

      {/* 네비게이션 버튼 */}
      <div className="mt-8">
        <NavigationButtons
          onPrevious={handlePrevious}
          onNext={handleNext}
          isNextDisabled={isSubmitting || !characterName.trim()}
          nextText={isSubmitting ? "등록 중..." : "완료"}
        />
      </div>
    </ReviewContainer>
  );
};
