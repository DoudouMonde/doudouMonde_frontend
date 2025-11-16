import { HttpStatus } from '@nestjs/common';

export const ReviewErrorCode = {
  REVIEW_NOT_FOUND: {
    status: HttpStatus.NOT_FOUND,
    code: 'RE001',
    message: '리뷰를 찾을 수 없습니다',
  },
  REVIEW_DUPLICATE_PERFORMANCE: {
    status: HttpStatus.CONFLICT,
    code: 'RE002',
    message: '이미 리뷰를 작성한 공연입니다',
  },
} as const;
