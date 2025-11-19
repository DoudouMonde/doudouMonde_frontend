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
  id: number;
}

export interface ReviewDetailResponse extends CharacterInfo {
  id: number;
  watchDate: string;
  content: string;
  performanceName: string;
  imageUrls: string[];
}

export interface ReviewListRecord {
  id: number;
  watchDate: string;
  tree: string;
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
