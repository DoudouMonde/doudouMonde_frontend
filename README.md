# DoudouMonde Monorepo

프론트엔드, 백엔드, 모바일을 포함하는 모노레포 프로젝트입니다.

## 프로젝트 구조

```
doudouMonde/
├── packages/
│   └── shared/          # 공유 패키지 (Jest, Axios, Prettier, Zod Schema, DTO)
├── frontend/             # React + Vite 프론트엔드
├── backend/              # NestJS 백엔드
├── mobile/               # React Native + Expo 모바일
└── package.json          # 루트 package.json (workspaces 설정)
```

## 공유 패키지 (@doudoumonde/shared)

프론트엔드, 백엔드, 모바일에서 공유하는 설정과 코드:

- **Jest 설정**: 공통 테스트 설정
- **Axios 설정**: 공통 HTTP 클라이언트 설정
- **Prettier 설정**: 코드 포맷팅 설정
- **Zod Schema**: 공유 스키마 정의
- **DTO 타입**: Schema에서 추론된 TypeScript 타입

## 시작하기

### 1. 의존성 설치

```bash
# 루트에서 모든 워크스페이스의 의존성 설치
npm install
```

### 2. 개발 서버 실행

```bash
# 프론트엔드
npm run dev:frontend

# 백엔드
npm run dev:backend

# 모바일
npm run dev:mobile
```

### 3. 빌드

```bash
# 프론트엔드 빌드
npm run build:frontend

# 백엔드 빌드
npm run build:backend
```

### 4. 테스트

```bash
# 모든 워크스페이스 테스트 실행
npm run test

# 특정 워크스페이스 테스트
npm run test --workspace=frontend
npm run test --workspace=backend
npm run test --workspace=packages/shared
```

### 5. 코드 포맷팅

```bash
# 모든 파일 포맷팅
npm run format

# 포맷팅 체크
npm run format:check
```

## 공유 패키지 사용 방법

### Axios 설정

```typescript
import { createAxiosInstance, createAuthInterceptor } from '@doudoumonde/shared';

const apiRequester = createAxiosInstance({
  baseURL: 'https://api.example.com',
  timeout: 10_000,
});

// 인증 인터셉터 추가
const authInterceptor = createAuthInterceptor(
  () => localStorage.getItem('token'),
  () => {
    // 401 에러 처리
    window.location.href = '/login';
  }
);

apiRequester.interceptors.request.use(authInterceptor.request);
apiRequester.interceptors.response.use(
  authInterceptor.response.onFulfilled,
  authInterceptor.response.onRejected
);
```

### Zod Schema 사용

```typescript
import { PaginationSchema, ApiResponseSchema } from '@doudoumonde/shared';
import { z } from 'zod';

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

const UserResponseSchema = ApiResponseSchema(UserSchema);
type UserResponse = z.infer<typeof UserResponseSchema>;
```

### DTO 타입 사용

```typescript
import { PaginatedData, ApiResponse } from '@doudoumonde/shared';

type User = {
  id: number;
  name: string;
  email: string;
};

type UserListResponse = PaginatedData<User>;
type UserDetailResponse = ApiResponse<User>;
```

## 워크스페이스별 상세 정보

각 워크스페이스의 README를 참고하세요:

- [Frontend](./frontend/README.md)
- [Backend](./backend/README.md)
- [Mobile](./mobile/README.md)
- [Shared Package](./packages/shared/README.md)

## 기술 스택

- **프론트엔드**: React 19, Vite, TypeScript, Tailwind CSS
- **백엔드**: NestJS, TypeScript, TypeORM
- **모바일**: React Native, Expo, TypeScript, NativeWind
- **공유**: Zod, Axios, Jest, Prettier

