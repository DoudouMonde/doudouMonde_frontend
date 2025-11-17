import { ChildFormValues } from '@/domains/child/example/models';
import { Gender, Profile } from '@doudoumonde/shared/schemas';

export const createNewChild = (): ChildFormValues => {
  return {
    name: '',
    birthday: '',
    gender: Gender.MALE,
    profile: Profile.DOG,
  };
};
