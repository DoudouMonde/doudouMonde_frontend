import {
  CharacterAnimal,
  CharacterAccessory,
  CharacterEmotion,
} from "@/shared/types";

import { z } from "zod";

// Character entity (DB의 character 테이블과 매핑)
export const CharacterEntity = z.object({
  accessory: z.enum(CharacterAccessory),
  animal: z.enum(CharacterAnimal),
  emotion: z.enum(CharacterEmotion),

  // 기본 키
  id: z.number(),
});

export type CharacterEntity = z.infer<typeof CharacterEntity>;

// pick 메서드에 전달할 객체의 타입을 엄격하게 정의
export type PickCharacterEntityKeys = {
  [K in keyof CharacterEntity]?: true;
};
