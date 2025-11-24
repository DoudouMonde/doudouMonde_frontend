import {
  CharacterType,
  CharacterEmotion,
  CharacterAccessories,
} from "./characterTypes";

export interface CharacterInfo {
  characterName: string;
  characterAnimal: CharacterType;
  characterEmotion: CharacterEmotion;
  characterAccessory: CharacterAccessories;
}

export interface PostReviewRequest extends CharacterInfo {
  performanceId: number;
  performanceName: string;
  imageUrls: string[];
  watchDate: string;
  content: string;
}

export interface PostReviewResponse {
  id: string;
}

export interface ReviewDetailResponse extends CharacterInfo {
  id: string;
  watchDate: string;
  content: string;
  performanceName: string;
  imageUrls: string[];
}

export interface ReviewListRecord {
  id: string;
  watchDate: string;
  // tree: string;
  performance: {
    name: string;
    posterUrl: string;
  };
  character: {
    animal: CharacterType;
    emotion: CharacterEmotion;
    accessory: CharacterAccessories;
  };
}

export interface ReviewListResponse {
  items: ReviewListRecord[];
}
