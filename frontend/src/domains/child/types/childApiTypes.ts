import { ChildEntity, PickChildEntityKeys } from '@doudoumonde/shared/schemas';
import { Gender, Profile } from '@doudoumonde/shared/schemas';
import { z } from 'zod';

//공통 베이스 타입
// export interface ChildBase {
//   id: number;
//   name: string;
//   profileA: Profile;
// }

//z를 가져올 때 zod v3를 가져오면 안된다.
// export const ChildItemResponse = z.object({
//   id: z.number(),
//   name: z.string(),
//   profile: z.enum(Profile),
// });

export const ChildItemResponse = ChildEntity.pick({
  id: true,
  name: true,
  profile: true,
} satisfies PickChildEntityKeys).extend({});
export type ChildItemResponse = z.infer<typeof ChildItemResponse>;

//목록 조회
// export interface ChildItemResponse extends ChildBase {}

//단건 조회용
export interface ChildDetailResponse extends ChildItemResponse {
  birthday: string;
  gender: Gender;
}

export type ChildRecord = ChildDetailResponse;

// export interface ChildListResponse {
//   items: ChildItemResponse[];
// }

export const ChildListResponse = z.object({
  items: z.array(ChildItemResponse),
});

export type ChildListResponse = z.infer<typeof ChildListResponse>;

export interface PostChildRegistrationRequest {
  name: string;
  birthday: string;
  gender: Gender;
  profile: Profile;
  // traits: string[];
  // genres: string[];
}

export interface PostChildRegistrationResponse {
  id: number;
  success: boolean;
}

export type childVoidResponse = { description: string };

export type UpdateChildRequest = PostChildRegistrationRequest;
