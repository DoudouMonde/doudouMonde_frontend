import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reviewApi } from "@/domains/review/apis/reviewApi";
import { ReviewResponse } from "@/domains/review/types/ReviewResponse";
import { NavigationButtons } from "@/shared/components";
import { PATH } from "@/shared/constants";
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
import * as EmotionCharacters from "@/assets/icons/playroom/storytown/character/emotion";
import * as CrownCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/crown";
import * as CapCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/cap";
import * as FlowerCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/flower";
import * as GlassesCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/glasses";
import * as RibbonCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/ribbon";
import * as WizhatCharacters from "@/assets/icons/playroom/storytown/character/emotion+acc/wizhat";

export const ReviewListPage = () => {
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
            reviews.map((review) => {
              const selectedAnimal = getCharacterAnimal(review.characterType);
              const animal = getAnimalString(review.characterType);
              const emotion = getEmotionString(review.characterEmotion);
              const accessory = getAccessoryString(review.characterAccessories);

              return (
                <div
                  key={review.reviewId}
                  onClick={() => handleReviewClick(review.reviewId)}
                  className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm transition-shadow cursor-pointer hover:shadow-md"
                >
                  <div className="flex gap-4 items-start mb-3">
                    {/* 캐릭터 전신 모습 */}
                    <div className="flex-shrink-0">
                      {(() => {
                        // 액세사리가 적용된 최종 캐릭터 표시
                        const AccessoryCharacter = getAccessoryCharacter(
                          animal,
                          emotion,
                          accessory
                        );

                        if (AccessoryCharacter) {
                          return <AccessoryCharacter className="w-20 h-24" />;
                        }

                        // 액세사리 캐릭터를 찾을 수 없는 경우 감정 캐릭터 표시
                        const EmotionCharacter = getEmotionCharacter(
                          animal,
                          emotion
                        );

                        if (EmotionCharacter) {
                          return <EmotionCharacter className="w-20 h-24" />;
                        }

                        // 기본 동물 전신 모습 표시
                        if (selectedAnimal) {
                          const BodyIcon = selectedAnimal.bodyIcon;
                          return <BodyIcon className="w-20 h-24" />;
                        }

                        return null;
                      })()}
                    </div>

                    {/* 리뷰 정보 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {review.characterName || "캐릭터명 없음"}
                        </h3>
                        <span className="ml-2 text-sm text-gray-500">
                          {formatDate(review.watchDate)}
                        </span>
                      </div>

                      <div className="mb-2">
                        <span className="text-sm text-gray-600">공연:</span>
                        <span className="ml-1 text-sm font-medium">
                          공연명 없음
                        </span>
                      </div>

                      {review.content && (
                        <p className="mb-3 text-sm text-gray-700 line-clamp-2">
                          {review.content}
                        </p>
                      )}

                      <div className="flex gap-4 items-center text-xs text-gray-500">
                        {review.imageUrls && review.imageUrls.length > 0 && (
                          <span>📷 {review.imageUrls.length}장</span>
                        )}
                        {review.audioUrl && <span>🎵 음성</span>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
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
