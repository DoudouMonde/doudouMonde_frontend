import { HttpStatus } from '@nestjs/common';

export const CommonErrorCode = {
  INTERNAL_SERVER_ERROR: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    code: 'C001',
    message: '오류 발생했습니다. 관리자에게 문의해주세요.',
  },
  INVALID_INPUT_VALUE: {
    status: HttpStatus.BAD_REQUEST,
    code: 'C001',
    message: '입력이 올바르지 않습니다.',
  },

  METHOD_NOT_ALLOWED: {
    status: HttpStatus.METHOD_NOT_ALLOWED,
    code: 'C002',
    message: '허용되지 않는 메서드입니다.',
  },
  HANDLE_ACCESS_DENIED: {
    code: 'C003',
    message: '접근 권한이 없습니다',
    status: HttpStatus.FORBIDDEN,
  },
  TOKEN_VALID_ERROR: {
    status: HttpStatus.UNAUTHORIZED,
    code: 'C004',
    message: 'Token Valid Error',
  },

  ERROR_DATE_BEFORE_TODAY: {
    status: HttpStatus.BAD_REQUEST,
    code: 'C005',
    message: '날짜는 오늘 이후일 수 없습니다.',
  },
};
