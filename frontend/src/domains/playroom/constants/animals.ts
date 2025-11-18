import {
  ChickBody,
  CatBody,
  DinoBody,
  DogBody,
  RabbitBody,
} from "@/assets/icons/playroom/type_body";
import {
  ChickPre,
  CatPre,
  DinoPre,
  DogPre,
  RabbitPre,
} from "@/assets/icons/playroom/type_head";

import {
  EmojiBored,
  EmojiCurious,
  EmojiHappy,
  EmojiOnemore,
  EmojiSad,
  EmojiSurprised,
} from "@/assets/icons/playroom/emotion";
import {
  Crwon,
  Flower,
  Hat,
  Ribbon,
  RoundGlass,
  WizardHat,
} from "@/assets/icons/playroom/accessories";
import { CharacterAccessories, CharacterType, CharacterEmotion } from "@/domains/review/types";


export type AnimalId = "chick" | "cat" | "dino" | "dog" | "rabbit";
export type EmotionId =
  | "bored"
  | "curious"
  | "happy"
  | "onemore"
  | "sad"
  | "surprised";
export type AccessoryId =
  | "crown"
  | "flower"
  | "cap"
  | "ribbon"
  | "glasses"
  | "wizhat";

export const animals: Array<{
  id: AnimalId;
  name: string;
  headIcon: React.ComponentType<{ className?: string }>;
  bodyIcon: React.ComponentType<{ className?: string }>;
  characterType: CharacterType;
}> = [
  { id: "chick", name: "병아리", headIcon: ChickPre, bodyIcon: ChickBody, characterType: CharacterType.CHICK  },
  { id: "cat", name: "고양이", headIcon: CatPre, bodyIcon: CatBody, characterType: CharacterType.CAT },
  { id: "dino", name: "공룡", headIcon: DinoPre, bodyIcon: DinoBody, characterType: CharacterType.DINO },
  { id: "dog", name: "강아지", headIcon: DogPre, bodyIcon: DogBody, characterType: CharacterType.DOG },
  { id: "rabbit", name: "토끼", headIcon: RabbitPre, bodyIcon: RabbitBody, characterType:CharacterType.RABBIT },
];

export const emotions: Array<{
  id: EmotionId;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  characterEmotion : CharacterEmotion,
}> = [
  { id: "happy", name: "행복했어요", icon: EmojiHappy, characterEmotion: CharacterEmotion.HAPPY },
  { id: "onemore", name: "또보고싶어요", icon: EmojiOnemore, characterEmotion: CharacterEmotion.ONEMORE },
  { id: "surprised", name: "놀랐어요", icon: EmojiSurprised, characterEmotion: CharacterEmotion.SURPRISED },
  { id: "sad", name: "슬펐어요", icon: EmojiSad , characterEmotion: CharacterEmotion.SAD},
  { id: "bored", name: "지루했어요", icon: EmojiBored, characterEmotion: CharacterEmotion.BORED },
  { id: "curious", name: "궁금해요", icon: EmojiCurious, characterEmotion: CharacterEmotion.CURIOUS },
];
export const accessories: Array<{
  id: AccessoryId;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  characterAccessories: CharacterAccessories,
}> = [
  { id: "crown", name: "왕관", icon: Crwon, characterAccessories: CharacterAccessories.CROWN },
  { id: "flower", name: "꽃", icon: Flower, characterAccessories: CharacterAccessories.FLOWER },
  { id: "cap", name: "모자", icon: Hat , characterAccessories: CharacterAccessories.CAP},
  { id: "ribbon", name: "리본", icon: Ribbon, characterAccessories: CharacterAccessories.RIBBON },
  { id: "glasses", name: "둥근안경", icon: RoundGlass, characterAccessories: CharacterAccessories.GLASSES },
  { id: "wizhat", name: "마법사모자", icon: WizardHat, characterAccessories: CharacterAccessories.WIZHAT },
];
