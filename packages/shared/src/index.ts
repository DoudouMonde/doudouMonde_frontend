/**
 * @doudoumonde/shared 패키지 메인 엔트리 포인트
 * 
 * 공유 설정, 유틸리티, 스키마, DTO를 export합니다.
 */

// Axios 설정
export * from './config/axios';

// Zod Schema (수동 정의)
export * from './schemas';

// DTO 타입 (수동 정의)
export * from './dtos';

// OpenAPI로부터 자동 생성된 타입과 스키마
export * from './generated';

