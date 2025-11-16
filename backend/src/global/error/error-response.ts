import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse<T> {
  @ApiProperty({
    description: '상태코드',
    example: 400,
  })
  status: number;

  @ApiProperty({
    description: '에러 코드',
    example: {
      code: 'C001',
      message: '입력이 올바르지 않습니다.',
    },
  })
  error: {
    code: string;
    message: string;
  };

  @ApiProperty({
    description: '결과 데이터 (에러 시 null)',
    example: null,
  })
  data: T | null;

  constructor(status: number, error: { code: string; message: string }) {
    this.status = status;
    this.error = error;
  }
}
