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
