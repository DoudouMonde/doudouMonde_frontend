import { HttpStatus } from '@nestjs/common';

export const ChildErrorCode = {
  CHILD_NOT_FOUND: {
    status: HttpStatus.NOT_FOUND,
    code: 'CH001',
    message: '아이를 찾을 수 없습니다',
  },
  CHILD_NAME_DUPLICATE: {
    status: HttpStatus.CONFLICT,
    code: 'CH011',
    message: '아이 이름에 중복이 있습니다',
  },
} as const;
