import { HttpStatus } from '@nestjs/common';

export const PerformanceErrorCode = {
  PERFORMANCE_NOT_FOUND: {
    status: HttpStatus.NOT_FOUND,
    code: 'PE001',
    message: '공연을 찾을 수 없습니다',
  },
} as const;
