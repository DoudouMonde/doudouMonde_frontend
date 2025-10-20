export type ProfileValue = "CAT" | "CHICK" | "DINOSAUR" | "DOG" | "RABBIT";
export type Birth = { year: string; month: string; day: string };

export type ChildFormValues = {
  name: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  gender: string;
  selectedTraits: string[];
  selectedGenres: string[];
  selectedProfile: ProfileValue;
};
