import { z } from 'zod';

/**
 * 기본 페이지네이션 스키마
 */
export const PaginationSchema = z.object({
  page: z.number().int().min(0).default(0),
  size: z.number().int().min(1).max(100).default(20),
});

/**
 * 페이지네이션 메타데이터 스키마
 */
export const PageMetadataSchema = z.object({
  page: z.number().int().min(0),
  size: z.number().int().min(1),
  totalElements: z.number().int().min(0),
  totalPages: z.number().int().min(0),
});

/**
 * 페이지네이션 응답 스키마
 */
export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    page: PageMetadataSchema,
    content: z.array(itemSchema),
  });

/**
 * 기본 API 응답 스키마
 */
export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    code: z.string(),
    message: z.string(),
    data: dataSchema,
  });

/**
 * 에러 응답 스키마
 */
export const ErrorResponseSchema = z.object({
  code: z.string(),
  message: z.string(),
  errors: z.array(z.object({ field: z.string(), message: z.string() })).optional(),
});

