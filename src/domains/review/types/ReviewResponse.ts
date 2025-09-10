import {
  CharacterType,
  CharacterEmotion,
  CharacterAccessories,
} from "./ReviewAddRequest";

export interface ReviewResponse {
  reviewId: number;
  watchDate: string; // ISO 8601 format
  content: string;
  imageUrls: string[];
  audioUrl: string | null;
  characterName: string;
  characterType: CharacterType;
  characterEmotion: CharacterEmotion;
  characterAccessories: CharacterAccessories;
}
