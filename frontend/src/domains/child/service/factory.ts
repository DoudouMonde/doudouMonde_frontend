import { Gender, Profile } from "@/entities/types";
import { ChildFormValues } from "../models/ChildFormValues";

export const createNewChild = (): ChildFormValues => {
  return {
    name: "",
    birthday: "",
    gender: Gender.MALE,
    profile: Profile.DOG,
  };
};
