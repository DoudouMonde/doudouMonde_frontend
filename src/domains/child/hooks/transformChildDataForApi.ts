import { ChildFormValues } from "../types/childForm";
import {
  GENDER_MAPPING,
  TRAIT_MAPPING,
  GENRE_MAPPING,
  PROFILE_MAPPING,
} from "@/domains/auth/types/signup"; 

export const transformChildDataForApi = (data: ChildFormValues) => {
  return {
    name: data.name.trim(),
    birthday: `${data.birthYear}-${data.birthMonth.padStart(
      2,
      "0"
    )}-${data.birthDay.padStart(2, "0")}`,
    gender:
      GENDER_MAPPING[data.gender as keyof typeof GENDER_MAPPING] || "MALE",
    profile:
      PROFILE_MAPPING[data.selectedProfile as keyof typeof PROFILE_MAPPING] ||
      "CAT",
    traits: data.selectedTraits.map(
      (t) => TRAIT_MAPPING[t as keyof typeof TRAIT_MAPPING] || t 
    ),
    genres: data.selectedGenres.map(
      (g) => GENRE_MAPPING[g as keyof typeof GENRE_MAPPING] || g 
    ),
  };
};