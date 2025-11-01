import type { ChildFormValues } from "@/domains/child/schemas/childFormSchema";
import { Gender, Profile } from "@/shared/types";

export const defaultChildFormValues: ChildFormValues = {
  name: "",
  birthYear: "",
  birthMonth: "",
  birthDay: "",
  gender: Gender.MALE,
  selectedProfile: Profile.CAT,
};
