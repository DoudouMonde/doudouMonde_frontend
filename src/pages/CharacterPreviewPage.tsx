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

  // localStorage에서 선택된 날짜, 아이들, 공연 정보 불러오기
  React.useEffect(() => {
    // 이제 Zustand store에서 데이터를 관리하므로 localStorage는 사용하지 않음
    // 필요시 여기서 store 초기화 로직을 추가할 수 있음
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
      seenPerformanceId: selectedPerformance?.id || 1, // 기본값 설정
      watchDate: selectedDate
        ? new Date(selectedDate).toISOString().slice(0, 19) // "2025-09-08T20:00:00" 형식
        : new Date().toISOString().slice(0, 19),
      content: `상상친구 ${characterName}와 함께한 공연 후기입니다.`,
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
    if (!selectedPerformance) {
      alert("공연 정보가 없습니다.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. 서버에 보낼 JSON 데이터 객체를 생성합니다.
      const reviewData = convertToApiFormat();
      reviewData.content = reviewText; // Zustand store에서 가져온 후기 텍스트 사용

      console.log("전송할 리뷰 데이터 (JSON):", reviewData);

      // 2. FormData 객체를 새로 생성합니다.
      const formData = new FormData();

      // 3. JSON 데이터를 'application/json' 타입의 Blob으로 변환하여 'request' 파트에 담습니다.
      const reviewBlob = new Blob([JSON.stringify(reviewData)], {
        type: "application/json",
      });
      formData.append("request", reviewBlob);

      // 4. Zustand store에서 이미지 파일들을 가져와서 FormData에 추가
      console.log(
        "CharacterPreview - uploadedImages from store:",
        uploadedImages
      ); //제대로 됨
      const validImages = uploadedImages.filter(
        (img) => img !== null
      ) as File[];
      console.log("CharacterPreview - validImages:", validImages);
      console.log("CharacterPreview - validImages.length:", validImages.length);

      if (validImages.length > 0) {
        // localStorage 방식과 동일하게 Blob으로 변환해서 추가
        validImages.forEach(async (image, index) => {
          console.log(
            `CharacterPreview - 이미지 ${index} 처리:`,
            image.name,
            image.size,
            "bytes",
            image.type
          );

          // File을 Blob으로 변환 (이미 File은 Blob을 상속받지만, 명시적으로 변환)
          const imageBlob = new Blob([image], { type: image.type });
          console.log(
            `CharacterPreview - Blob 변환 결과:`,
            imageBlob.size,
            "bytes",
            imageBlob.type
          );

          formData.append(`images`, imageBlob, `image_${index}_${image.name}`);
        });
        console.log(
          `${validImages.length}개의 이미지 파일이 FormData에 추가되었습니다.`
        );
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
      alert("리뷰 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="p-6 w-full bg-gray-200/70 rounded-[40px] mt-20 mb-24">
        {/* Header */}
        <div className="flex flex-col mb-6">
          <h1 className="mb-4 title-inter">상상친구 완성!</h1>
          <p className="subtitle text-secondary-100">
            멋진 상상친구가 완성되었어요!
            <br />
            함께 공연을 즐겨보세요.
          </p>
        </div>
        <hr className="my-4 mb-6 border-secondary-100/30" />

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
                {selectedPerformance ? selectedPerformance.title : "공연이름"}
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
      </div>
    </div>
  );
};
