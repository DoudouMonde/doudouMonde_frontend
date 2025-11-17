import { Gender, Genre, Profile, Sido, Trait } from '@doudoumonde/shared/schemas';

export type ChildItem = {
  id: number;
  name: string;
  birthday: string;
  gender: Gender;
  profile: Profile;
  sido: Sido;
  genre: Genre;
  trait?: Trait;
};
