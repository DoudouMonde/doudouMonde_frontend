import { Dayjs } from "dayjs";
import { z } from "zod";
import { Genre } from "@/shared/types";

// Performance entity (DB의 performance 테이블과 매핑)
export const PerformanceEntity = z.object({
  // 일반 데이터 필드
  name: z.string(),
  startDate: z.iso.date(),
  endDate: z.iso.date(),
  durationMinute: z.number(),
  audienceCount: z.number(),
  ageLimit: z.string(),
  price: z.number(),
  genre: z.enum(Genre),
  posterUrl: z.string(),
  pfCode: z.string(),
  reservationSiteUrl: z.string(),
  reward: z.string(),

  // 기본 키
  id: z.number(),
});

export type PerformanceEntity = z.infer<typeof PerformanceEntity>;

// pick 메서드에 전달할 객체의 타입을 엄격하게 정의
export type PickPerformanceEntityKeys = {
  [K in keyof PerformanceEntity]?: true;
};
