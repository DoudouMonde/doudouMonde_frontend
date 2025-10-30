import { ChildFormValues } from "@/domains/child/example/models";
import { Gender, Profile } from "@/shared/types";

export const createNewChild = (): ChildFormValues => {
  return {
    name: "",
    birthday: "",
    gender: Gender.MALE,
    profile: Profile.DOG,
  };
};
