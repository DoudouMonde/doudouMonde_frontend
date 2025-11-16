# 모노레포 설정 가이드

이 문서는 모노레포 구조로 전환하는 과정과 사용 방법을 설명합니다.

## 구조 개요

```
doudouMonde/
├── packages/
│   └── shared/              # 공유 패키지
│       ├── src/
│       │   ├── config/      # 공유 설정 (axios, jest)
│       │   ├── schemas/     # Zod Schema
│       │   ├── dtos/        # DTO 타입
│       │   └── index.ts
│       ├── package.json
│       ├── tsconfig.json
│       └── jest.config.js
├── frontend/                # React 프론트엔드
├── backend/                 # NestJS 백엔드
├── mobile/                  # React Native 모바일
├── package.json             # 루트 package.json (workspaces)
├── .prettierrc              # 공유 Prettier 설정
└── .gitignore
```

## 공유되는 것들

### 1. Jest 설정
- `packages/shared/jest.config.js`에 공통 Jest 설정
- 각 프로젝트는 필요시 확장 가능

### 2. Axios 설정
- `packages/shared/src/config/axios.ts`에 공통 Axios 유틸리티
- `createAxiosInstance`: 기본 인스턴스 생성
- `createAuthInterceptor`: 인증 인터셉터 생성

### 3. Prettier 설정
- 루트 `.prettierrc`에 공통 설정
- 모든 프로젝트에서 동일한 포맷팅 규칙 적용

### 4. Zod Schema와 DTO
- `packages/shared/src/schemas/`에 공유 Schema 정의
- `packages/shared/src/dtos/`에 DTO 타입 정의
- 프론트엔드, 백엔드, 모바일에서 동일한 타입 사용

## 설치 및 설정

### 1. 의존성 설치

```bash
# 루트에서 실행
npm install
```

이 명령어는 모든 워크스페이스의 의존성을 설치합니다.

### 2. 각 프로젝트에서 shared 패키지 사용

#### 프론트엔드 예시

```typescript
// src/shared/apis/axiosInstance.ts
import { createAxiosInstance, createAuthInterceptor } from '@doudoumonde/shared';
import { SERVER_BASE_URL } from '@/shared/constants/api';

export const apiRequester = createAxiosInstance({
  baseURL: SERVER_BASE_URL + '/api',
  timeout: 10_000,
});

const authInterceptor = createAuthInterceptor(
  () => localStorage.getItem('token'),
  () => {
    localStorage.removeItem('token');
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }
);

apiRequester.interceptors.request.use(authInterceptor.request);
apiRequester.interceptors.response.use(
  authInterceptor.response.onFulfilled,
  authInterceptor.response.onRejected
);
```

#### 백엔드 예시

```typescript
// src/common/services/http.service.ts
import { createAxiosInstance } from '@doudoumonde/shared';

export class HttpService {
  private client = createAxiosInstance({
    baseURL: process.env.EXTERNAL_API_URL,
    timeout: 10_000,
  });

  // ...
}
```

#### 모바일 예시

```typescript
// shared/apis/axiosInstance.ts
import { createAxiosInstance, createAuthInterceptor } from '@doudoumonde/shared';
import { SERVER_BASE_URL } from '@/shared/constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const apiRequester = createAxiosInstance({
  baseURL: SERVER_BASE_URL + '/api',
  timeout: 5_000,
});

const authInterceptor = createAuthInterceptor(
  async () => await AsyncStorage.getItem('token'),
  async () => {
    await AsyncStorage.removeItem('token');
    // 네비게이션 처리
  }
);

apiRequester.interceptors.request.use(authInterceptor.request);
apiRequester.interceptors.response.use(
  authInterceptor.response.onFulfilled,
  authInterceptor.response.onRejected
);
```

### 3. Zod Schema 공유

#### Schema 정의 (packages/shared/src/schemas/)

```typescript
// packages/shared/src/schemas/user.ts
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  email: z.string().email(),
  createdAt: z.string().datetime(),
});

export const CreateUserRequestSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export const UpdateUserRequestSchema = CreateUserRequestSchema.partial();
```

#### Schema export (packages/shared/src/schemas/index.ts)

```typescript
export * from './base';
export * from './user';
// ... 다른 스키마들
```

#### DTO 타입 정의 (packages/shared/src/dtos/)

```typescript
// packages/shared/src/dtos/user.ts
import { UserSchema, CreateUserRequestSchema, UpdateUserRequestSchema } from '../schemas/user';
import { z } from 'zod';

export type User = z.infer<typeof UserSchema>;
export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;
export type UpdateUserRequest = z.infer<typeof UpdateUserRequestSchema>;
```

#### 사용 예시

```typescript
// 프론트엔드, 백엔드, 모바일 모두에서
import { User, CreateUserRequest } from '@doudoumonde/shared';
import { UserSchema } from '@doudoumonde/shared';

// 타입 사용
const user: User = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  createdAt: new Date().toISOString(),
};

// Schema로 validation
const result = UserSchema.safeParse(data);
if (result.success) {
  const validUser = result.data;
}
```

## 기존 코드 마이그레이션

### 1. Axios 인스턴스 마이그레이션

기존 코드:
```typescript
export const apiRequester = axios.create({
  baseURL: SERVER_BASE_URL + '/api',
  timeout: 10_000,
});
```

새로운 코드:
```typescript
import { createAxiosInstance } from '@doudoumonde/shared';

export const apiRequester = createAxiosInstance({
  baseURL: SERVER_BASE_URL + '/api',
  timeout: 10_000,
});
```

### 2. Zod Schema 마이그레이션

기존 코드 (프론트엔드):
```typescript
// frontend/src/domains/child/schemas/ChildRequestSchema.ts
export const ChildRequestSchema = z.object({
  name: z.string().min(1),
  // ...
});
```

새로운 코드:
```typescript
// packages/shared/src/schemas/child.ts
export const ChildRequestSchema = z.object({
  name: z.string().min(1),
  // ...
});

// frontend/src/domains/child/schemas/ChildRequestSchema.ts
export { ChildRequestSchema } from '@doudoumonde/shared';
```

## 개발 워크플로우

### 1. shared 패키지 수정 시

shared 패키지를 수정한 후, 각 프로젝트에서 다시 설치할 필요 없이 바로 반영됩니다 (workspace 프로토콜 사용).

### 2. 테스트 실행

```bash
# 모든 워크스페이스 테스트
npm run test

# 특정 워크스페이스만
npm run test --workspace=frontend
npm run test --workspace=backend
npm run test --workspace=packages/shared
```

### 3. 빌드

```bash
# 프론트엔드 빌드
npm run build:frontend

# 백엔드 빌드
npm run build:backend
```

## 주의사항

1. **Circular Dependencies**: shared 패키지는 다른 워크스페이스에 의존하지 않아야 합니다.

2. **TypeScript 경로**: 각 프로젝트의 `tsconfig.json`에 `@doudoumonde/shared` 경로가 추가되어 있어야 합니다.

3. **빌드 도구 설정**: Vite, Metro 등 빌드 도구에도 alias 설정이 필요합니다.

4. **환경별 차이**: localStorage (프론트엔드) vs AsyncStorage (모바일) 등 환경별 차이는 인터셉터 생성 시 함수로 전달하여 처리합니다.

## 문제 해결

### shared 패키지를 찾을 수 없다는 에러

1. 루트에서 `npm install` 실행
2. 각 프로젝트의 `package.json`에 `"@doudoumonde/shared": "workspace:*"` 확인
3. TypeScript 경로 설정 확인

### TypeScript 타입 에러

1. `tsconfig.json`의 paths 설정 확인
2. 빌드 도구(Vite, Metro)의 alias 설정 확인
3. IDE 재시작

