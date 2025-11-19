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
import {
  CharacterAccessories,
  CharacterType,
  CharacterEmotion,
} from "@/domains/review/types";

export type AnimalId =
  | CharacterType.CAT
  | CharacterType.CHICK
  | CharacterType.DINO
  | CharacterType.DOG
  | CharacterType.RABBIT;
export type EmotionId =
  | CharacterEmotion.BORED
  | CharacterEmotion.CURIOUS
  | CharacterEmotion.HAPPY
  | CharacterEmotion.ONEMORE
  | CharacterEmotion.SAD
  | CharacterEmotion.SURPRISED;
export type AccessoryId =
  | CharacterAccessories.CAP
  | CharacterAccessories.CROWN
  | CharacterAccessories.FLOWER
  | CharacterAccessories.GLASSES
  | CharacterAccessories.RIBBON
  | CharacterAccessories.WIZHAT;

export const animals: Array<{
  id: AnimalId;
  name: string;
  headIcon: React.ComponentType<{ className?: string }>;
  bodyIcon: React.ComponentType<{ className?: string }>;
}> = [
  {
    id: CharacterType.CHICK,
    name: "병아리",
    headIcon: ChickPre,
    bodyIcon: ChickBody,
  },
  {
    id: CharacterType.CAT,
    name: "고양이",
    headIcon: CatPre,
    bodyIcon: CatBody,
  },
  {
    id: CharacterType.DINO,
    name: "공룡",
    headIcon: DinoPre,
    bodyIcon: DinoBody,
  },
  {
    id: CharacterType.DOG,
    name: "강아지",
    headIcon: DogPre,
    bodyIcon: DogBody,
  },
  {
    id: CharacterType.RABBIT,
    name: "토끼",
    headIcon: RabbitPre,
    bodyIcon: RabbitBody,
  },
];

export const emotions: Array<{
  id: EmotionId;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    id: CharacterEmotion.HAPPY,
    name: "행복했어요",
    icon: EmojiHappy,
  },
  {
    id: CharacterEmotion.ONEMORE,
    name: "또보고싶어요",
    icon: EmojiOnemore,
  },
  {
    id: CharacterEmotion.SURPRISED,
    name: "놀랐어요",
    icon: EmojiSurprised,
  },
  {
    id: CharacterEmotion.SAD,
    name: "슬펐어요",
    icon: EmojiSad,
  },
  {
    id: CharacterEmotion.BORED,
    name: "지루했어요",
    icon: EmojiBored,
  },
  {
    id: CharacterEmotion.CURIOUS,
    name: "궁금해요",
    icon: EmojiCurious,
  },
];
export const accessories: Array<{
  id: AccessoryId;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    id: CharacterAccessories.CROWN,
    name: "왕관",
    icon: Crwon,
  },
  {
    id: CharacterAccessories.FLOWER,
    name: "꽃",
    icon: Flower,
  },
  {
    id: CharacterAccessories.CAP,
    name: "모자",
    icon: Hat,
  },
  {
    id: CharacterAccessories.RIBBON,
    name: "리본",
    icon: Ribbon,
  },
  {
    id: CharacterAccessories.GLASSES,
    name: "둥근안경",
    icon: RoundGlass,
  },
  {
    id: CharacterAccessories.WIZHAT,
    name: "마법사모자",
    icon: WizardHat,
  },
];
