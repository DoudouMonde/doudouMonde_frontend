import { z } from 'zod';
import { PerformanceEntity, PickPerformanceEntityKeys } from '../schemas/performance';
import { Sido } from '../schemas/types/sido.enum';

/**
 * 공연 목록 조회용 DTO
 * PerformanceEntity에서 필요한 필드만 선택
 */
export const PerformanceItemResponseSchema = PerformanceEntity.pick({
  id: true,
  name: true,
  posterUrl: true,
} satisfies PickPerformanceEntityKeys).extend({
  sido: z.enum(Sido),
});

export type PerformanceItemResponse = z.infer<typeof PerformanceItemResponseSchema>;
