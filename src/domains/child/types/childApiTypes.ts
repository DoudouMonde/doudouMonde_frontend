import { ChildEntity, PickChildEntityKeys } from "@/entities";
import { Gender, Profile } from "@/shared/types";
import { z } from "zod";

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
//typeof를 공부하자
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

// export interface UpdateChildRequest extends PostChildRegistrationRequest {}
