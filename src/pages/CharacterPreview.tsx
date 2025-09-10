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
import {
  ChickBody,
  CatBody,
  DinoBody,
  DogBody,
  RabbitBody,
} from "@/assets/icons/playroom/type_body";
import { Shadow } from "@/assets/icons/playroom";

interface CharacterData {
  animal: string;
  emotion: string;
  accessory: string;
}

const CharacterPreview: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedPerformance, setSelectedPerformance] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [characterName, setCharacterName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // CharacterCreation에서 전달받은 데이터
  const characterData = (location.state as CharacterData) || {
    animal: "chick",
    emotion: "happy",
    accessory: "crwon",
  };

  // localStorage에서 선택된 날짜, 아이들, 공연 정보 불러오기
  React.useEffect(() => {
    const savedDate = localStorage.getItem("selectedDate");
    if (savedDate) {
      const date = new Date(savedDate);
      setSelectedDate(date.toLocaleDateString("ko-KR"));
    }

    const savedPerformance = localStorage.getItem("selectedPerformance");
    if (savedPerformance) {
      setSelectedPerformance(JSON.parse(savedPerformance));
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

      // localStorage에서 후기 텍스트 가져오기
      const reviewText = localStorage.getItem("reviewText");
      if (reviewText) {
        reviewData.content = reviewText;
      }

      console.log("전송할 리뷰 데이터 (JSON):", reviewData);

      // 2. FormData 객체를 새로 생성합니다.
      const formData = new FormData();

      // 3. JSON 데이터를 'application/json' 타입의 Blob으로 변환하여 'request' 파트에 담습니다.
      const reviewBlob = new Blob([JSON.stringify(reviewData)], {
        type: "application/json",
      });
      formData.append("request", reviewBlob);

      // 4. localStorage에서 이미지 파일들을 가져와서 FormData에 추가
      const uploadedImagesData = localStorage.getItem("uploadedImages");
      if (uploadedImagesData) {
        try {
          const imageDataArray = JSON.parse(uploadedImagesData);
          imageDataArray.forEach(
            (
              imageData: {
                index: number;
                name: string;
                type: string;
                size: number;
                data: number[];
              },
              index: number
            ) => {
              // ArrayBuffer를 Uint8Array로 변환
              const uint8Array = new Uint8Array(imageData.data);
              const blob = new Blob([uint8Array], { type: imageData.type });
              formData.append(
                `imageFiles`,
                blob,
                `image_${index}_${imageData.name}`
              );
            }
          );
          console.log(
            `${imageDataArray.length}개의 이미지 파일이 FormData에 추가되었습니다.`
          );
        } catch (error) {
          console.error("이미지 파일 데이터 파싱 중 오류:", error);
        }
      }

      // 5. localStorage에서 오디오 파일을 가져와서 FormData에 추가
      const recordedAudioData = localStorage.getItem("recordedAudio");
      if (recordedAudioData) {
        try {
          const audioData = JSON.parse(recordedAudioData);
          const uint8Array = new Uint8Array(audioData.data);
          const audioBlob = new Blob([uint8Array], { type: audioData.type });
          formData.append("audioFile", audioBlob, audioData.name);
          console.log("오디오 파일이 FormData에 추가되었습니다.");
        } catch (error) {
          console.error("오디오 파일 데이터 파싱 중 오류:", error);
        }
      } else {
        // 오디오 파일이 없는 경우 빈 파일 추가
        const emptyAudioBlob = new Blob([], { type: "audio/wav" });
        formData.append("audioFile", emptyAudioBlob, "empty_audio.wav");
      }

      // 6. API를 호출할 때, 일반 객체(reviewData)가 아닌 'formData' 객체를 전달합니다.
      console.log("FormData 객체를 API로 전송합니다...");
      const reviewId = await reviewApi.addReview(formData);

      console.log("리뷰가 성공적으로 등록되었습니다. Review ID:", reviewId);

      // 리뷰 상세 페이지로 이동 (리뷰 ID를 state로 전달)
      navigate("/playroom/review-detail", {
        state: {
          reviewId: reviewId,
          characterName: characterName,
          characterData: characterData,
          selectedPerformance: selectedPerformance,
          selectedDate: selectedDate,
          reviewText: reviewText,
        },
      });
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
              {selectedAnimal && (
                <selectedAnimal.bodyIcon className="w-[147px] h-[224px] relative z-20" />
              )}
            </div>
            <Shadow className="w-[200px] h-[50px] mt-[-25px] relative z-10" />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex flex-col items-start">
            <div className="flex gap-1 items-center">
              <PlayingCardsIcon className="w-[13px] h-[13px]" />
              <p>
                {selectedPerformance ? selectedPerformance.title : "공연이름"}
              </p>
            </div>
            <div className="flex gap-1 items-center">
              <Calendar className="w-[13px] h-[13px] flex-shrink-0" />
              <p className="whitespace-nowrap">{selectedDate || "선택날짜"}</p>
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

export default CharacterPreview;
