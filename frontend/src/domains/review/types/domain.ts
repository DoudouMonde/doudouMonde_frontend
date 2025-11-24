import {
  CharacterType,
  CharacterEmotion,
  CharacterAccessories,
} from "./characterTypes";


export type ReviewItem = {
  id: number;
  performanceId: number;
  watchDate: string;
  content: string;
  characterName: string;
  characterAnimal: CharacterType;
  characterEmotion: CharacterEmotion;
  characterAccessory?: CharacterAccessories;
};
