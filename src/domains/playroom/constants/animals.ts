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

export type AnimalId = "chick" | "cat" | "dino" | "dog" | "rabbit";
export type EmotionId =
  | "bored"
  | "curious"
  | "happy"
  | "onemore"
  | "sad"
  | "surprised";

export const animals: Array<{
  id: AnimalId;
  name: string;
  headIcon: React.ComponentType<{ className?: string }>;
  bodyIcon: React.ComponentType<{ className?: string }>;
}> = [
  { id: "chick", name: "병아리", headIcon: ChickPre, bodyIcon: ChickBody },
  { id: "cat", name: "고양이", headIcon: CatPre, bodyIcon: CatBody },
  { id: "dino", name: "공룡", headIcon: DinoPre, bodyIcon: DinoBody },
  { id: "dog", name: "강아지", headIcon: DogPre, bodyIcon: DogBody },
  { id: "rabbit", name: "토끼", headIcon: RabbitPre, bodyIcon: RabbitBody },
];

export const emotions: {
  id: EmotionId;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "happy", name: "행복했어요", icon: EmojiHappy },
  { id: "onemore", name: "또보고싶어요", icon: EmojiOnemore },
  { id: "surprised", name: "놀랐어요", icon: EmojiSurprised },
  { id: "sad", name: "슬펐어요", icon: EmojiSad },
  { id: "bored", name: "지루했어요", icon: EmojiBored },
  { id: "curious", name: "궁금해요", icon: EmojiCurious },
];
