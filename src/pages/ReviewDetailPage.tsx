import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavigationButtons } from "@/shared/components";
import { Calendar, PlayingCardsIcon } from "@/assets/icons";
import {
  CharacterType,
  CharacterEmotion,
  CharacterAccessories,
} from "@/domains/review/types/ReviewAddRequest";
import { ReviewResponse } from "@/domains/review/types/ReviewResponse";
import { reviewApi } from "@/domains/review/apis/reviewApi";
import {
  ChickBody,
  CatBody,
  DinoBody,
  DogBody,
  RabbitBody,
} from "@/assets/icons/playroom/type_body";

interface ReviewDetailData {
  characterName: string;
  characterType: CharacterType;
  characterEmotion: CharacterEmotion;
  characterAccessories: CharacterAccessories;
  performanceName: string;
  watchDate: string;
  content: string;
  imageUrls: string[];
  audioUrl: string | null;
}

import {
  StorytownTree0,
  StorytownTree1,
  StorytownTree2,
  StorytownTree3,
  StorytownTree4,
  StorytownTree5,
  StorytownTree6,
  StorytownTree7,
  StorytownTree8,
  StorytownTree9,
} from "@/assets/icons/playroom/storytown_tree";
import * as EmotionCharacters from "@/assets/icons/playroom/storytown/character/emotion";
import * as CrownCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/crown";
import * as CapCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/cap";
import * as FlowerCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/flower";
import * as GlassesCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/glasses";
import * as RibbonCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/ribbon";
import * as WizhatCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/wizhat";

export const ReviewDetailPage = () => {
  const navigate = useNavigate();
  const { reviewId } = useParams<{ reviewId: string }>();
  const [reviewData, setReviewData] = useState<ReviewDetailData | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewCount, setReviewCount] = useState(0);

  // API에서 리뷰 데이터 가져오기
  useEffect(() => {
    const fetchReviewData = async () => {
      if (!reviewId) {
        setError("리뷰 ID가 없습니다.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response: ReviewResponse = await reviewApi.getReview(
          parseInt(reviewId)
        );

        // watchDate 처리 - 배열 형태로 오는 경우를 처리
        let processedWatchDate = response.watchDate;
        if (Array.isArray(response.watchDate)) {
          // 배열 형태 [2025, 9, 10, 0, 0]를 문자열로 변환
          const [year, month, day] = response.watchDate;
          processedWatchDate = `${year}. ${month}. ${day}.`;
        } else if (
          response.watchDate &&
          typeof response.watchDate === "string"
        ) {
          // LocalDateTime 형식 (2025-09-10T00:00:00)을 Date가 인식할 수 있는 형식으로 변환
          if (
            response.watchDate.includes("T") &&
            !response.watchDate.includes("Z")
          ) {
            processedWatchDate = response.watchDate + "Z";
          }
        }

        const reviewData: ReviewDetailData = {
          characterName: response.characterName,
          characterType: response.characterType,
          characterEmotion: response.characterEmotion,
          characterAccessories: response.characterAccessories,
          performanceName: response.performanceName || "공연명 없음",
          watchDate: processedWatchDate,
          content: response.content,
          imageUrls: response.imageUrls || [],
          audioUrl: response.audioUrl,
        };
        console.log("reviewData", reviewData);
        setReviewData(reviewData);
      } catch (error) {
        console.error("리뷰 데이터를 불러오는 중 오류가 발생했습니다:", error);
        setError("리뷰를 불러올 수 없습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviewData();
  }, [reviewId]);

  useEffect(() => {
    const fetchReviewCount = async () => {
      try {
        const reviews = await reviewApi.getMemberReviews();
        setReviewCount(reviews.length);
      } catch (error) {
        console.error("리뷰 개수 조회 실패:", error);
        setReviewCount(0);
      }
    };

    fetchReviewCount();
  }, []);

  // 동물 데이터
  const animals = [
    { id: "chick", name: "병아리", bodyIcon: ChickBody },
    { id: "cat", name: "고양이", bodyIcon: CatBody },
    { id: "dino", name: "공룡", bodyIcon: DinoBody },
    { id: "dog", name: "강아지", bodyIcon: DogBody },
    { id: "rabbit", name: "토끼", bodyIcon: RabbitBody },
  ];

  // 캐릭터 타입에 따른 동물 정보 가져오기
  const getCharacterAnimal = (characterType: CharacterType) => {
    const typeToId: Record<CharacterType, string> = {
      [CharacterType.CHICK]: "chick",
      [CharacterType.CAT]: "cat",
      [CharacterType.DINO]: "dino",
      [CharacterType.DOG]: "dog",
      [CharacterType.RABBIT]: "rabbit",
    };
    return animals.find((animal) => animal.id === typeToId[characterType]);
  };

  // API 타입을 문자열로 변환하는 함수들
  const getAnimalString = (characterType: CharacterType): string => {
    const typeToString: Record<CharacterType, string> = {
      [CharacterType.CHICK]: "chick",
      [CharacterType.CAT]: "cat",
      [CharacterType.DINO]: "dino",
      [CharacterType.DOG]: "dog",
      [CharacterType.RABBIT]: "rabbit",
    };
    return typeToString[characterType];
  };

  const getEmotionString = (characterEmotion: CharacterEmotion): string => {
    const emotionToString: Record<CharacterEmotion, string> = {
      [CharacterEmotion.HAPPY]: "happy",
      [CharacterEmotion.EXITED]: "exited",
      [CharacterEmotion.SURPRISE]: "surprise",
      [CharacterEmotion.SAD]: "sad",
      [CharacterEmotion.BORED]: "bored",
      [CharacterEmotion.CURIOUS]: "curious",
    };
    return emotionToString[characterEmotion];
  };

  const getAccessoryString = (
    characterAccessories: CharacterAccessories
  ): string => {
    const accessoryToString: Record<CharacterAccessories, string> = {
      [CharacterAccessories.CROWN]: "crown",
      [CharacterAccessories.FLOWER]: "flower",
      [CharacterAccessories.HAT]: "cap",
      [CharacterAccessories.RIBBON]: "ribbon",
      [CharacterAccessories.ROUND_GLASS]: "glasses",
      [CharacterAccessories.WIZARD_HAT]: "wizhat",
    };
    return accessoryToString[characterAccessories];
  };

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

  // 음성 재생/정지
  const handlePlayAudio = () => {
    if (reviewData?.audioUrl) {
      const audio = new Audio(reviewData.audioUrl);
      audio.play();
      setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/playroom");
  };

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

  const selectedAnimal = getCharacterAnimal(reviewData.characterType);

  // 리뷰 개수에 맞는 나무 컴포넌트 결정 (최대 9개)
  const getTreeComponent = (count: number) => {
    const treeCount = Math.min(count, 9);
    const treeComponents = [
      StorytownTree0,
      StorytownTree1,
      StorytownTree2,
      StorytownTree3,
      StorytownTree4,
      StorytownTree5,
      StorytownTree6,
      StorytownTree7,
      StorytownTree8,
      StorytownTree9,
    ];
    return treeComponents[treeCount];
  };

  return (
    <div className="overflow-hidden relative w-full min-h-screen">
      {/* 고정 배경 - 나무 이미지 */}
      <div className="flex fixed inset-0 z-0 justify-center items-start pt-8 w-full">
        {(() => {
          const TreeComponent = getTreeComponent(reviewCount);
          return (
            <TreeComponent className="w-full h-auto object-contain drop-shadow-[0px_0px_5px_rgba(0,0,0.5,0)]" />
          );
        })()}
      </div>

      {/* 스크롤 가능한 콘텐츠 */}
      <div className="relative z-10 w-full">
        {/* 캐릭터 영역 - 투명 배경 */}
        <div className="flex flex-col items-center pt-36 pb-8">
          <div className="flex relative z-10 flex-col items-center">
            <div className="flex justify-center">
              {(() => {
                if (!reviewData) return null;

                const animal = getAnimalString(reviewData.characterType);
                const emotion = getEmotionString(reviewData.characterEmotion);
                const accessory = getAccessoryString(
                  reviewData.characterAccessories
                );

                // 액세사리가 적용된 최종 캐릭터 표시
                const AccessoryCharacter = getAccessoryCharacter(
                  animal,
                  emotion,
                  accessory
                );

                if (AccessoryCharacter) {
                  return (
                    <AccessoryCharacter className="w-[350px] h-[250px] relative z-20" />
                  );
                }

                // 액세사리 캐릭터를 찾을 수 없는 경우 감정 캐릭터 표시
                const EmotionCharacter = getEmotionCharacter(animal, emotion);

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
              <p className="text-black-100 body-inter">{reviewData.content}</p>
            </div>

            {/* 음성 파일 재생 */}
            <div className="mb-8">
              {reviewData.audioUrl ? (
                <div className="bg-white/60 backdrop-blur-sm rounded-[16px] p-6 border border-secondary-100/30">
                  <div className="flex flex-col items-center">
                    <div className="flex justify-center items-center mb-4 w-12 h-12 bg-green-100 rounded-full">
                      <svg
                        className="w-8 h-8 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="mb-4 text-gray-600 body-inter">
                      음성 후기를 재생해보세요
                    </p>
                    <button
                      onClick={handlePlayAudio}
                      disabled={isPlaying}
                      className={`px-3 py-3 rounded-lg transition-colors ${
                        isPlaying
                          ? "text-white bg-gray-400 cursor-not-allowed"
                          : "text-white bg-green-100 hover:bg-green-200"
                      }`}
                    >
                      {isPlaying ? "재생 중..." : "재생하기"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 bg-white/60 backdrop-blur-sm rounded-[16px] border border-secondary-100/30">
                  <div className="mb-2 text-gray-400">
                    <svg
                      className="mx-auto w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 subtitle">
                    등록된 음성이 없습니다
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 네비게이션 버튼 */}
          <div className="mt-8">
            <NavigationButtons
              onPrevious={handleGoBack}
              onNext={handleGoHome}
              nextText="홈으로"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
