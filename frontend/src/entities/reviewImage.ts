import { Dayjs } from "dayjs";
import { z } from "zod";

export const ReviewImageEntity = z.object({
  // 일반 데이터 필드
  objectKey: z.string(),
  order: z.number(),

  // 기본 키, 외래키
  id: z.number(),
  reviewId: z.number(),
});

export type ReviewImageEntity = z.infer<typeof ReviewImageEntity>;

// pick 메서드에 전달할 객체의 타입을 엄격하게 정의
export type PickReviewImageEntityKeys = {
  [K in keyof ReviewImageEntity]?: true;
};
