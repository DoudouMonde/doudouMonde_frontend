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

export type AnimalId = "chick" | "cat" | "dino" | "dog" | "rabbit";

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
