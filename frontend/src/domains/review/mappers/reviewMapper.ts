import { NewReviewData } from "@/pages/review/ReviewFunnelPage";
import { PostReviewRequest } from "../types/reviewApiTypes";
import {
  accessories,
  animals,
  emotions,
} from "@/domains/playroom/constants/animals";

export const mapNewReviewDataToRequest = (
  newReviewData: NewReviewData
): PostReviewRequest => {
  //필수 필드 체크 및 타입 변환
  const seenPerformanceId = newReviewData.performanceId;
  const performanceName = newReviewData.performanceName;
  const imageUrls = ["123"];
  const watchDate = newReviewData.watchDate;
  const content = newReviewData.reviewText;
  const characterName = newReviewData.charName;
  const characterAnimal =
    animals.find((animal) => animal.id === newReviewData.typeOption)?.id ??
    animals[0].id;
  const characterEmotion =
    emotions.find((emotion) => emotion.id === newReviewData.emotionOption)
      ?.id ?? emotions[0].id;
  const characterAccessory =
    accessories.find((accessory) => accessory.id === newReviewData.accOption)
      ?.id ?? accessories[0].id;

  //audioUrl은 일단은 생략

  // 필수 필드가 누락되었는지 확인합니다.
  if (
    seenPerformanceId === undefined ||
    performanceName === undefined ||
    characterName === undefined ||
    content === undefined
  ) {
    throw new Error(
      "API 요청에 필요한 필수 필드(performanceId, performanceName, charName, reviewText)가 누락되었습니다."
    );
  }

  //매핑 및 반환
  return {
    performanceId: seenPerformanceId,
    performanceName: performanceName,
    imageUrls: imageUrls,
    watchDate: watchDate,
    content: content,
    characterName: characterName,
    characterAnimal: characterAnimal,
    characterEmotion: characterEmotion,
    characterAccessory: characterAccessory,
  };
};
