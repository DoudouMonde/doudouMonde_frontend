/**
 * 공유 DTO 타입
 * 
 * Zod Schema에서 추론된 TypeScript 타입들을 export합니다.
 */

import {
  PaginationSchema,
  PageMetadataSchema,
  ApiResponseSchema,
  ErrorResponseSchema,
} from '../schemas';
import { z } from 'zod';

// 기본 타입들
export type Pagination = z.infer<typeof PaginationSchema>;
export type PageMetadata = z.infer<typeof PageMetadataSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

// 제네릭 타입들
export type PaginatedData<T> = {
  page: PageMetadata;
  content: T[];
};

export type ApiResponse<T> = {
  code: string;
  message: string;
  data: T;
};

// 헬퍼 함수
export const createPaginatedResponse = <T>(
  content: T[],
  page: number,
  size: number,
  totalElements: number,
): PaginatedData<T> => {
  return {
    page: {
      page,
      size,
      totalElements,
      totalPages: Math.ceil(totalElements / size),
    },
    content,
  };
};

