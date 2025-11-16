import { HttpStatus } from '@nestjs/common';

export const MemberErrorCode = {
  MEMBER_NOT_FOUND: {
    status: HttpStatus.NOT_FOUND,
    code: 'ME001',
    message: '회원을 찾을 수 없습니다',
  },
} as const;
