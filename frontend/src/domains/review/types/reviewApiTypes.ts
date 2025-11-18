import {
  CharacterType,
  CharacterEmotion,
  CharacterAccessories,
} from "./characterTypes";

export interface PostReviewRequest {
  seenPerformanceId: number;
  performanceName: string;
  watchDate?: string; // ISO 8601 format
  content: string;
  audioUrl?: string;
  characterName: string;
  characterType: CharacterType;
  characterEmotion: CharacterEmotion;
  characterAccessories: CharacterAccessories;
}

export interface PostReviewResponse {
    id : number;
}

export interface ReviewDetailResponse {
  reviewId: number;
  watchDate: string; // ISO 8601 format
  content: string;
  imageUrls: string[];
  audioUrl: string | null;
  characterName: string;
  characterType: CharacterType;
  characterEmotion: CharacterEmotion;
  characterAccessories: CharacterAccessories;
  performanceName: string;
}
