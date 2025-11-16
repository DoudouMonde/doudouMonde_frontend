import { HttpException } from '@nestjs/common';
import { ErrorCode } from './error-code.';

export class BusinessException extends HttpException {
  public readonly errorCode: ErrorCode;

  constructor(errorCode: ErrorCode, customMessage?: string) {
    super(
      {
        code: errorCode.code,
        message: customMessage || errorCode.message,
        data: null,
      },
      errorCode.status,
    );
    this.errorCode = errorCode;
  }
}
