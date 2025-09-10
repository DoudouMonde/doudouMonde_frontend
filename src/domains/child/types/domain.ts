import { Gender, Genre, Profile, Sido } from "@/shared/types";

export type ChildItem = {
  id: number;
  name: string;
  birthday: string;
  gender: Gender;
  profile: Profile;
  sido: Sido;
  genre: Genre;
};
