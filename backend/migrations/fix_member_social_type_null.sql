-- member 테이블의 socialType 컬럼에 null 값이 있는 경우 기본값으로 업데이트
-- 기존 null 값은 'KAKAO'로 설정 (가장 일반적인 소셜 로그인 타입)
UPDATE member
SET "socialType" = 'KAKAO'
WHERE "socialType" IS NULL;

-- socialType 컬럼에 NOT NULL 제약조건 추가 (이미 enum으로 정의되어 있지만 명시적으로 추가)
ALTER TABLE member
ALTER COLUMN "socialType" SET NOT NULL;

