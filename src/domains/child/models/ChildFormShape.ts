import { Gender, Profile } from "@/shared/types";

export type ChildFormShape = {
  name: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  gender: Gender;
  profile: Profile;
};
