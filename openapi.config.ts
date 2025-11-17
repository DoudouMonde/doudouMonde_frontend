import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: './swagger.json',
  output: {
    format: 'prettier',
    path: './packages/shared/src/generated',
  },
  types: {
    enums: 'typescript',
  },
  services: {
    asClass: true,
  },
  // zod 스키마 생성은 별도 도구 필요 (openapi-typescript-zod 등)
  // 현재는 TypeScript 타입만 생성
});

