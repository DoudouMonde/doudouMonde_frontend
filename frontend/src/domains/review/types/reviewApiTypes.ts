import {
  CharacterType,
  CharacterEmotion,
  CharacterAccessories,
} from "./characterTypes";

export interface CharacterInfo {
    characterName: string;
  characterType: CharacterType;
  characterEmotion: CharacterEmotion;
  characterAccessories: CharacterAccessories;
}

export interface PostReviewRequest extends CharacterInfo{
  seenPerformanceId: number;
  performanceName: string;
  watchDate?: string;
  content: string;
  // audioUrl?: string;
}

export interface PostReviewResponse {
    id : number;
}

export interface ReviewDetailResponse extends CharacterInfo{
  reviewId: number;
  performanceName: string;
  watchDate: string;
  content: string;
  imageUrls: string[];
  // audioUrl: string | null;
  //아이도 불러와야 함
}
//리스트 조회
//공연id, 공연제목, watchDate, 캐릭터 모양

export type ReviewRecord = ReviewDetailResponse;


export interface ReviewListRecord{
  seenPerformanceId: number;
  performanceName: string;
  watchDate: string;
  characterType: CharacterType;
  characterEmotion: CharacterEmotion;
  characterAccessories: CharacterAccessories;
}

export interface ReviewListResponse  {
   items: ReviewListRecord[];
}