import { CharacterEmotion, CharacterAccessory, CharacterAnimal } from '@doudoumonde/shared/schemas';

export type ReviewItem = {
  id: number;
  performanceId: number;
  watchDate: string;
  content: string;
  characterName: string;
  characterAnimal: CharacterAnimal;
  characterEmotion: CharacterEmotion;
  characterAccessory?: CharacterAccessory;
};
