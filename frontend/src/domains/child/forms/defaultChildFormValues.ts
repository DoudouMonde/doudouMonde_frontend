import type { ChildFormValues } from '@/domains/child/schemas/childFormSchema';
import { Gender, Profile } from '@doudoumonde/shared/schemas';

export const defaultChildFormValues: ChildFormValues = {
  name: '',
  birthYear: '',
  birthMonth: '',
  birthDay: '',
  gender: Gender.MALE,
  selectedProfile: Profile.CAT,
};
