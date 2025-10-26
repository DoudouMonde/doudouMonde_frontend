import { z } from "zod";
import { Gender, Profile } from "@/entities/types";

// Child entity (DB의 child 테이블과 매핑)
export const ChildEntity = z.object({
  // 일반 데이터 필드
  name: z.string(),
  birthday: z.iso.date(),
  gender: z.enum(Gender),
  profile: z.enum(Profile),

  // 기본 키, 외래키
  id: z.number(),
  memberId: z.number(),
});

// pick 메서드에 전달할 객체의 타입을 엄격하게 정의
export type PickChildEntityKeys = {
  [K in keyof typeof ChildEntity]?: true;
};
