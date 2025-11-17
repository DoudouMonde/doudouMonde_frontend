import { Gender, Profile } from '@doudoumonde/shared/schemas';
import { ChildFormValues } from '../models/ChildFormValues';

export const createNewChild = (): ChildFormValues => {
  return {
    name: '',
    birthday: '',
    gender: Gender.MALE,
    profile: Profile.DOG,
  };
};
