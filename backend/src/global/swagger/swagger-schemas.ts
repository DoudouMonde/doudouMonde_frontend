// Swagger 스키마 정의 (순환 의존성 방지)
export const ApiResponseSchema = {
  type: 'object',
  properties: {
    code: { type: 'string', example: 'S200' },
    message: { type: 'string', example: 'success' },
    data: { type: 'object', description: '응답 데이터' },
  },
};

export const ErrorResponseSchema = {
  type: 'object',
  properties: {
    code: { type: 'string', example: 'M001' },
    message: { type: 'string', example: 'Email Not Found' },
    data: { type: 'null', example: null },
  },
};

export const ValidationErrorResponseSchema = {
  type: 'object',
  properties: {
    code: { type: 'string', example: 'C001' },
    message: { type: 'string', example: 'Invalid Input Value' },
    data: { type: 'null', example: null },
    errors: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          field: { type: 'string', example: 'title' },
          message: { type: 'string', example: 'title should not be empty' },
          value: { type: 'string', example: '' },
        },
      },
    },
  },
};
