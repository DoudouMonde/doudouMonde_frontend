import { z } from "zod";

// Review entity (DB의 review 테이블과 매핑)
export const ReviewEntity = z.object({
  // 일반 데이터 필드
  watchDate: z.iso.date(),
  content: z.string(),
  audioUrl: z.string(),

  // BaseEntity 필드들
  createdAt: z.iso.date(),
  updatedAt: z.iso.date(),

  // 기본 키, 외래키
  id: z.number(),
  performanceId: z.number(),
  memberId: z.number(),
  characterId: z.number(),
});

export type ReviewEntity = z.infer<typeof ReviewEntity>;

// pick 메서드에 전달할 객체의 타입을 엄격하게 정의
export type PickReviewEntityKeys = {
  [K in keyof ReviewEntity]?: true;
};
