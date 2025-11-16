import { ChildErrorCode } from '@/domains/child/error/child-error-code';
import { MemberErrorCode } from '@/domains/member/error/member-error-code';
import { PerformanceErrorCode } from '@/domains/performance/error/performance-error-code';
import { ReviewErrorCode } from '@/domains/review/error/review-error-code';
import { CommonErrorCode } from '@/global/error/common-error-code';

// 에러 정보를 통합 관리하는 객체
export const ErrorCode = {
  ...CommonErrorCode,

  ...MemberErrorCode,
  ...ChildErrorCode,
  ...ReviewErrorCode,
  ...PerformanceErrorCode,
} as const;

// 타입 정의
export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];
