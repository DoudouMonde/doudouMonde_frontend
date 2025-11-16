export interface ReviewAddRequest {
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

export enum CharacterType {
  CHICK = "CHICK",
  CAT = "CAT",
  DINO = "DINO",
  DOG = "DOG",
  RABBIT = "RABBIT",
}

export enum CharacterEmotion {
  HAPPY = "HAPPY",
  EXITED = "EXITED",
  SURPRISE = "SURPRISE",
  SAD = "SAD",
  BORED = "BORED",
  CURIOUS = "CURIOUS",
}

export enum CharacterAccessories {
  CROWN = "CROWN",
  FLOWER = "FLOWER",
  HAT = "HAT",
  RIBBON = "RIBBON",
  ROUND_GLASS = "ROUND_GLASS",
  WIZARD_HAT = "WIZARD_HAT",
}
