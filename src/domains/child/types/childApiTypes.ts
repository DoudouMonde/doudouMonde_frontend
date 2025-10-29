import { Gender, Profile } from "@/entities/types";

export interface ChildItemResponse {
  id: number;
  name: string;
  birthday: string;
  gender: Gender;
  profile: Profile;
}

export interface ChildListResponse {
  contents: ChildItemResponse[];
}
