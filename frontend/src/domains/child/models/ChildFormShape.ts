import { Gender, Profile } from '@doudoumonde/shared/schemas';

export type ChildFormShape = {
  name: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  gender: Gender;
  profile: Profile;
};
