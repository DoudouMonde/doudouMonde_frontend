import { z } from "zod";
import { Gender, Profile } from "@/shared/types";

const genderValues = Object.values(Gender) as [string, ...string[]];
const profileValues = Object.values(Profile) as [string, ...string[]];

export const ChildRequestSchema = z.object({
  name: z.string().min(1, { message: "이름을 입력해주세요." }),
  birthday: z.string().min(1, { message: "생년월일을 입력해주세요." }),

  gender: z.enum(genderValues),
  profile: z.enum(profileValues),
});
