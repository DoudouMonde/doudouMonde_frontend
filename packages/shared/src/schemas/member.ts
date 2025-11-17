import { z } from 'zod';
import { MemberRole, SocialType } from '@doudoumonde/shared/schemas';

// Member entity (DB의 members 테이블과 매핑)
export const MemberEntity = z.object({
  // 일반 데이터 필드
  oauth2Provider: z.enum(SocialType),
  providerId: z.string(),
  memberRole: z.enum(MemberRole),

  // 기본 키
  id: z.number(),
});

export type MemberEntity = z.infer<typeof MemberEntity>;

// pick 메서드에 전달할 객체의 타입을 엄격하게 정의
export type PickMemberEntityKeys = {
  [K in keyof MemberEntity]?: true;
};
