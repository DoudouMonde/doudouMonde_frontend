import { ChildFormValues } from "../types/childForm";
import { Gender, Profile } from "@/shared/types";

export const transformChildDataForApi = (data: ChildFormValues) => {
  return {
    name: data.name.trim(),
    birthday: `${data.birthYear}-${data.birthMonth.padStart(
      2,
      "0"
    )}-${data.birthDay.padStart(2, "0")}`,
    gender: Gender[data.gender as keyof typeof Gender] || "MALE",
    profile: Profile[data.selectedProfile as keyof typeof Profile] || "CAT",
    // traits: data.selectedTraits.map(
    //   (t) => TRAIT_MAPPING[t as keyof typeof TRAIT_MAPPING] || t
    // ),
    // genres: data.selectedGenres.map(
    //   (g) => GENRE_MAPPING[g as keyof typeof GENRE_MAPPING] || g
    // ),
  };
};
