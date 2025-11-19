import { Gender, Profile } from "@/entities/types";
import { ChildEntity, PickChildEntityKeys } from "@/entities";
import { z } from "zod";

export const ChildItemResponse = ChildEntity.pick({
  id: true,
  name: true,
  profile: true,
} satisfies PickChildEntityKeys).extend({});
export type ChildItemResponse = z.infer<typeof ChildItemResponse>;

//단건 조회용
export interface ChildDetailResponse extends ChildItemResponse {
  birthday: string;
  gender: Gender;
}

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
