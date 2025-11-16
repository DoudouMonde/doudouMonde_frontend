# @doudoumonde/shared

프론트엔드, 백엔드, 모바일에서 공유하는 설정과 코드를 포함하는 패키지입니다.

## 구조

```
packages/shared/
├── src/
│   ├── config/        # 공유 설정 (axios, jest 등)
│   ├── schemas/       # Zod Schema 정의
│   ├── dtos/          # DTO 타입 정의
│   └── index.ts       # 메인 엔트리 포인트
├── package.json
├── tsconfig.json
└── jest.config.js
```

## 사용 방법

### 1. Axios 설정 사용

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

### 2. Zod Schema 사용

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

### 3. DTO 타입 사용

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

## 개발

```bash
# 테스트 실행
npm run test

# 테스트 감시 모드
npm run test:watch

# 커버리지 확인
npm run test:cov
```

