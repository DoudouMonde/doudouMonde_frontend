import { Gender, Profile } from "@/shared/types";

//공통 베이스 타입
export interface ChildBase {
  id: number;
  name: string;
  profile: Profile;
}

//목록 조회
export interface ChildItemResponse extends ChildBase {}

//단건 조회용
export interface ChildDetailResponse extends ChildBase {
  birthday: string;
  gender: Gender;
}

export type ChildRecord = ChildDetailResponse;

export interface ChildListResponse {
  items: ChildItemResponse[];
}

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

export interface UpdateChildRequest extends PostChildRegistrationRequest {}
