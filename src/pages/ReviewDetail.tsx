import React, { useState, useEffect } from "react";
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
import { Shadow } from "@/assets/icons/playroom";

interface ReviewDetailData {
  characterName: string;
  characterType: CharacterType;
  characterEmotion: CharacterEmotion;
  characterAccessories: CharacterAccessories;
  performanceTitle: string;
  watchDate: string;
  content: string;
  imageUrls: string[];
  audioUrl: string | null;
}

const ReviewDetail: React.FC = () => {
  const navigate = useNavigate();
  const { reviewId } = useParams<{ reviewId: string }>();
  const [reviewData, setReviewData] = useState<ReviewDetailData | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

        console.log("API 응답 데이터:", response);
        console.log("watchDate 원본 값:", response.watchDate);
        console.log("watchDate 타입:", typeof response.watchDate);
        console.log("imageUrls 원본 값:", response.imageUrls);
        console.log("imageUrls 타입:", typeof response.imageUrls);
        console.log("imageUrls 길이:", response.imageUrls?.length);

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
          performanceTitle: "공연명", // TODO: API에서 공연명도 받아오도록 수정 필요
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
    navigate("/");
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

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="p-6 w-full bg-gray-200/70 rounded-[40px] mt-20 mb-24">
        {/* Header */}
        <div className="flex flex-col mb-6">
          <h1 className="mb-4 title-inter">리뷰 상세</h1>
          <div className="w-auto min-w-20">
            <div className="flex gap-1 items-center">
              <PlayingCardsIcon className="w-[13px] h-[13px]" />
              <p>{reviewData.performanceTitle}</p>
            </div>
            <div className="flex gap-1 items-center">
              <Calendar className="w-[13px] h-[13px] flex-shrink-0" />
              <p className="whitespace-nowrap">
                {reviewData.watchDate || "날짜 정보 없음"}
              </p>
            </div>
          </div>
        </div>
        <hr className="my-4 mb-6 border-secondary-100/30" />

        {/* 캐릭터 표시 영역 */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex relative z-10 flex-col items-center">
            <div className="flex justify-center">
              {selectedAnimal && (
                <selectedAnimal.bodyIcon className="w-[147px] h-[224px] relative z-20" />
              )}
            </div>
            <Shadow className="w-[200px] h-[50px] mt-[-25px] relative z-10" />
          </div>
          <h2 className="mt-4 text-xl font-bold text-gray-800">
            {reviewData.characterName}
          </h2>
        </div>

        {/* 리뷰 내용 */}
        <div className="mb-8">
          <h3 className="mb-4 title-inter">후기 내용</h3>
          <div className="backdrop-blur-sm rounded-[16px] p-4 border border-secondary-100/30">
            <p className="text-gray-700 body-inter">{reviewData.content}</p>
          </div>
        </div>

        {/* 등록된 사진 갤러리 */}
        <div className="mb-8">
          <h3 className="mb-4 title-inter">등록된 사진</h3>
          {reviewData.imageUrls.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {reviewData.imageUrls.map((imageUrl, index) => (
                <div
                  key={index}
                  className="relative aspect-square bg-white/60 backdrop-blur-sm rounded-[16px] border border-secondary-100/30 overflow-hidden"
                >
                  <img
                    src={imageUrl}
                    alt={`리뷰 사진 ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 bg-white/60 backdrop-blur-sm rounded-[16px] border border-secondary-100/30">
              <div className="mb-2 text-gray-400">
                <svg
                  className="mx-auto w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 body-inter">등록된 사진이 없습니다</p>
            </div>
          )}
        </div>

        {/* 음성 파일 재생 */}
        <div className="mb-8">
          <h3 className="mb-4 title-inter">음성 후기</h3>
          {reviewData.audioUrl ? (
            <div className="bg-white/60 backdrop-blur-sm rounded-[16px] p-6 border border-secondary-100/30">
              <div className="flex flex-col items-center">
                <div className="flex justify-center items-center mb-4 w-16 h-16 bg-green-100 rounded-full">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
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
                  className={`px-6 py-3 rounded-lg transition-colors ${
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
                  className="mx-auto w-12 h-12"
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
              <p className="text-gray-500 body-inter">등록된 음성이 없습니다</p>
            </div>
          )}
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
  );
};

export default ReviewDetail;
