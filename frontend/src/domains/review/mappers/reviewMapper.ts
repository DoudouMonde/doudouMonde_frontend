import { NewReviewData } from "@/pages/review/ReviewFunnelPage";
import { ReviewAddRequest } from "../types";
import { accessories, animals, emotions } from "@/domains/playroom/constants/animals";


export const mapNewReviewDataToRequest = (newReviewData : NewReviewData) : ReviewAddRequest=> {

    //필수 필드 체크 및 타입 변환
    const seenPerformanceId =  newReviewData.performanceId;
    const performanceName = newReviewData.performanceName;
    const watchDate = newReviewData.watchDate;
    const content = newReviewData.reviewText;
    const characterName = newReviewData.charName;
    const characterType = animals.find(animal => animal.id === newReviewData.typeOption)?.characterType ?? animals[0].characterType;
    const characterEmotion = emotions.find(emotion => emotion.id === newReviewData.emotionOption)?.characterEmotion ?? emotions[0].characterEmotion;
    const characterAccessories = accessories.find(accessoriy => accessoriy.id === newReviewData.accOption)?.characterAccessories ?? accessories[0].characterAccessories;
    //audioUrl은 일단은 생략

    // 필수 필드가 누락되었는지 확인합니다.
  if ( seenPerformanceId === undefined || performanceName === undefined || characterName === undefined || content === undefined) {
    throw new Error('API 요청에 필요한 필수 필드(performanceId, performanceName, charName, reviewText)가 누락되었습니다.');
  }

  //매핑 및 반환
  return {
  seenPerformanceId: seenPerformanceId,
  performanceName: performanceName,
  watchDate: watchDate,
  content: content,
  characterName: characterName,
  characterType: characterType,
  characterEmotion: characterEmotion,
  characterAccessories: characterAccessories,
  }
}