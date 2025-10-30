import { Gender, Profile } from "@/entities/types";

//목록 조회
export interface ChildItemResponse {
  id: number;
  name: string;
  profile: Profile;
}

//단건 조회용
export interface ChildDetailResponse extends ChildItemResponse {
  birthday: string;
  gender: Gender;
}

export interface ChildListResponse {
  items: ChildItemResponse[];
}

export interface PostChildRegistrationResponse {
  childId: number;
  success: boolean;
}

export interface UpdateChildNameRequest {
  name: string;
}

export interface UpdateChildNameResponse {
  childId: number;
  name: string;
}

export interface UpdateChildProfileRequest {
  profile: string;
}

export interface UpdateChildProfileResponse {
  childId: number;
  profile: string;
}

export interface UpdateChildBirthdayRequest {
  childId: number;
  birthday: string;
}

export interface UpdateChildBirthdayResponse {
  childId: number;
  birthday: string;
}

export interface UpdateChildGenderRequest {
  childId: number;
  gender: string;
}

export interface UpdateChildGenderResponse {
  childId: number;
  gender: string;
}
