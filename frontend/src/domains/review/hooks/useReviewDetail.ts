import { useEffect, useState } from "react";
import {
  CharacterAccessories,
  CharacterEmotion,
  CharacterType,
} from "../types";
import { ReviewDetailResponse } from "../types/reviewApiTypes";
import { reviewApi } from "../apis/reviewApi";

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

export const useReviewDetail = (reviewId: string | undefined) => {
  const numericReviewId = Number(reviewId);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [reviewData, setReviewData] = useState<ReviewDetailResponse | null>(
    mockData
  );

  //   useEffect(() => {
  //     const fetchReviewDetail = async () => {
  //       if (isNaN(numericReviewId) || numericReviewId === 0) {
  //         setError("유효하지 않은 리뷰 ID입니다.");
  //         setIsLoading(false);
  //         return;
  //       }

  //       try {
  //         setIsLoading(true);
  //         setError(null);

  //         const data = await reviewApi.getReviewDetail(numericReviewId);
  //         setReviewData(data);
  //       } catch (err) {
  //         console.log("리뷰 상세 정보를 가져오는 중 오류 발생:", err);
  //         // setError(
  //         //   "데이터를 불러오는 데 실패했습니다. Mock 데이터를 사용합니다."
  //         // );
  //         setReviewData(mockData);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };
  //     console.log(isLoading);
  //     fetchReviewDetail();
  //   }, [reviewId]);
  useEffect(() => {
    setIsLoading(false);
  }, [reviewId]);

  return { reviewData, isLoading, error };
};
