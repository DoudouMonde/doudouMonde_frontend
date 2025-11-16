import { Gender, Profile } from "@/shared/types";

export type ChildItem = {
  id: number;
  name: string;
  birthday: string;
  gender: Gender;
  profile: Profile;
};
