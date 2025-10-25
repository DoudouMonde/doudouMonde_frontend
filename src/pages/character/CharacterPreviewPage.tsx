import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavigationButtons } from "@/shared/components";
import { Calendar, PlayingCardsIcon } from "@/assets/icons";
import { reviewApi } from "@/domains/review/apis/reviewApi";
import {
  CharacterType,
  CharacterEmotion,
  CharacterAccessories,
} from "@/domains/review/types/ReviewAddRequest";
import { useReviewStore } from "@/stores/reviewStore";
import {
  ChickBody,
  CatBody,
  DinoBody,
  DogBody,
  RabbitBody,
} from "@/assets/icons/playroom/type_body";
import { Shadow } from "@/assets/icons/playroom";
import * as EmotionCharacters from "@/assets/icons/playroom/storytown/character/emotion";
import * as CrownCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/crown";
import * as CapCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/cap";
import * as FlowerCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/flower";
import * as GlassesCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/glasses";
import * as RibbonCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/ribbon";
import * as WizhatCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/wizhat";
import { ReviewContainer } from "@/shared/components/Layout/ReviewContainer";
import { Desc } from "@/domains/playroom/components/Desc";
import { REVIEW_FLOW } from "@/shared/routes/flow";
interface CharacterData {
  animal: string;
  emotion: string;
  accessory: string;
}

export const CharacterPreviewPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  // CharacterCreation에서 전달받은 데이터
  const characterData = (location.state as CharacterData) || {
    animal: "chick",
    emotion: "happy",
    accessory: "crwon",
  };

  // localStorage에서 선택된 공연 정보 불러오기
  const [selectedPerformanceFromStorage, setSelectedPerformanceFromStorage] =
    React.useState<{
      id: number;
      title: string;
      posterUrl: string;
      location: string;
    } | null>(null);

  React.useEffect(() => {
    // localStorage에서 선택된 공연 정보 불러오기
    const storedPerformance = localStorage.getItem("selectedPerformance");
    if (storedPerformance) {
      try {
        const performanceData = JSON.parse(storedPerformance);
        setSelectedPerformanceFromStorage(performanceData);
        console.log(
          "CharacterPreview - localStorage에서 불러온 공연 정보:",
          performanceData
        );
      } catch (error) {
        console.error("공연 정보 파싱 오류:", error);
      }
    }
  }, []);

  // 동물 데이터
  const animals = [
    { id: "chick", name: "병아리", bodyIcon: ChickBody },
    { id: "cat", name: "고양이", bodyIcon: CatBody },
    { id: "dino", name: "공룡", bodyIcon: DinoBody },
    { id: "dog", name: "강아지", bodyIcon: DogBody },
    { id: "rabbit", name: "토끼", bodyIcon: RabbitBody },
  ];

  // 선택된 데이터 가져오기
  const selectedAnimal = animals.find(
    (animal) => animal.id === characterData.animal
  );

  // 동물과 감정을 조합해서 캐릭터 컴포넌트를 가져오는 함수
  const getEmotionCharacter = (animal: string, emotion: string) => {
    const animalName = animal.charAt(0).toUpperCase() + animal.slice(1);
    const emotionName = emotion.charAt(0).toUpperCase() + emotion.slice(1);
    const componentName = `${animalName}${emotionName}`;

    // 컴포넌트 이름 매핑 (oneMore -> Onemore)
    const mappedComponentName = componentName.replace("Onemore", "Onemore");

    return (
      EmotionCharacters as Record<
        string,
        React.ComponentType<{ className?: string }>
      >
    )[mappedComponentName];
  };

  // 동물, 감정, 액세사리를 조합해서 캐릭터 컴포넌트를 가져오는 함수
  const getAccessoryCharacter = (
    animal: string,
    emotion: string,
    accessory: string
  ) => {
    const animalName = animal.charAt(0).toUpperCase() + animal.slice(1);
    const emotionName = emotion.charAt(0).toUpperCase() + emotion.slice(1);
    const accessoryName =
      accessory.charAt(0).toUpperCase() + accessory.slice(1);
    const componentName = `${animalName}${emotionName}${accessoryName}`;

    // 액세사리별로 다른 모듈에서 가져오기
    let characterModule: Record<
      string,
      React.ComponentType<{ className?: string }>
    >;

    switch (accessory) {
      case "crown":
        characterModule = CrownCharacters as Record<
          string,
          React.ComponentType<{ className?: string }>
        >;
        break;
      case "cap":
        characterModule = CapCharacters as Record<
          string,
          React.ComponentType<{ className?: string }>
        >;
        break;
      case "flower":
        characterModule = FlowerCharacters as Record<
          string,
          React.ComponentType<{ className?: string }>
        >;
        break;
      case "glasses":
        characterModule = GlassesCharacters as Record<
          string,
          React.ComponentType<{ className?: string }>
        >;
        break;
      case "ribbon":
        characterModule = RibbonCharacters as Record<
          string,
          React.ComponentType<{ className?: string }>
        >;
        break;
      case "wizhat":
        characterModule = WizhatCharacters as Record<
          string,
          React.ComponentType<{ className?: string }>
        >;
        break;
      default:
        return null;
    }

    return characterModule[componentName];
  };

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

    return {
      seenPerformanceId:
        selectedPerformanceFromStorage?.id || selectedPerformance?.id || 1, // 공연 ID 전송
      performanceName:
        selectedPerformanceFromStorage?.title ||
        selectedPerformance?.title ||
        "공연이름", // 공연 이름 전송
      watchDate: (() => {
        console.log("📅 날짜 처리 시작:", {
          selectedDate,
          selectedDateType: typeof selectedDate,
          selectedDateValue: selectedDate,
        });

        if (!selectedDate) {
          console.log("📅 selectedDate가 없음, 현재 시간 사용");
          return new Date().toISOString().slice(0, 19);
        }

        // selectedDate가 이미 ISO 문자열인 경우 (ChildAndDateSelectionPage에서 저장된 경우)
        if (typeof selectedDate === "string" && selectedDate.includes("T")) {
          console.log("📅 ISO 문자열 형태의 날짜 처리:", selectedDate);
          const result = new Date(selectedDate).toISOString().slice(0, 19);
          console.log("📅 ISO 문자열 변환 결과:", result);
          return result;
        }

        // selectedDate가 한국어 날짜 문자열인 경우 (ReviewWritingPage에서 변환된 경우)
        if (typeof selectedDate === "string") {
          console.log(
            "📅 한국어 날짜 문자열 형태, localStorage에서 원본 가져오기"
          );
          // localStorage에서 원본 ISO 문자열을 가져와서 사용
          const savedDate = localStorage.getItem("selectedDate");
          console.log("📅 localStorage에서 가져온 원본 날짜:", savedDate);
          if (savedDate) {
            const result = new Date(savedDate).toISOString().slice(0, 19);
            console.log("📅 localStorage 날짜 변환 결과:", result);
            return result;
          }
        }

        // 기본값으로 현재 시간 사용
        console.log("📅 기본값으로 현재 시간 사용");
        return new Date().toISOString().slice(0, 19);
      })(),
      content:
        reviewText || `상상친구 ${characterName}와 함께한 공연 후기입니다.`,
      characterName: characterName,
      characterType: animalToType[characterData.animal] || CharacterType.CHICK,
      characterEmotion:
        emotionToApi[characterData.emotion] || CharacterEmotion.HAPPY,
      characterAccessories:
        accessoryToApi[characterData.accessory] || CharacterAccessories.CROWN,
    };
  };

  const handlePrevious = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  // CharacterPreview.tsx

  const handleNext = async () => {
    if (!characterName.trim()) {
      alert("캐릭터 이름을 입력해주세요.");
      return;
    }
    if (!selectedPerformanceFromStorage && !selectedPerformance) {
      alert("공연 정보가 없습니다.");
      return;
    }

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
      <div className="flex flex-col items-center mb-8">
        <div className="flex relative z-10 flex-col items-center">
          <div className="flex justify-center">
            {(() => {
              // 액세사리가 적용된 최종 캐릭터 표시
              const AccessoryCharacter = getAccessoryCharacter(
                characterData.animal,
                characterData.emotion,
                characterData.accessory
              );

              if (AccessoryCharacter) {
                return (
                  <AccessoryCharacter className="w-[350px] h-[250px] relative z-20" />
                );
              }

              // 액세사리 캐릭터를 찾을 수 없는 경우 감정 캐릭터 표시
              const EmotionCharacter = getEmotionCharacter(
                characterData.animal,
                characterData.emotion
              );

              if (EmotionCharacter) {
                return (
                  <EmotionCharacter className="w-[350px] h-[250px] relative z-20" />
                );
              }

              // 기본 동물 전신 모습 표시
              if (selectedAnimal) {
                const BodyIcon = selectedAnimal.bodyIcon;
                return (
                  <BodyIcon className="w-[350px] h-[250px] relative z-20" />
                );
              }

              return null;
            })()}
          </div>
          <Shadow className="w-[200px] h-[50px] mt-[-40px] relative z-10" />
        </div>
      </div>

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
