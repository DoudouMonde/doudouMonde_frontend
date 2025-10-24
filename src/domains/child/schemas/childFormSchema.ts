import { z } from "zod";
import { ProfileValue } from "../types/childForm";  // ChildFormValues 임포트
import { GENDER_MAPPING, TRAIT_MAPPING, GENRE_MAPPING, PROFILE_MAPPING } from "@/domains/auth/types/signup";
import { NAME_ALLOWED_REGEX, HANGUL_OR_SPACE_ONLY_REGEX } from "../constants/childRegistration";

// genderKeys와 profileKeys 타입을 정확하게 설정
const profileKeys = Object.keys(PROFILE_MAPPING) as [string, ...string[]];
const genderKeys = Object.keys(GENDER_MAPPING) as [string, ...string[]];
const traitKeys = Object.keys(TRAIT_MAPPING) as [string, ...string[]];
const genreKeys = Object.keys(GENRE_MAPPING) as [string, ...string[]];


export const createChildFormSchema = (isDuplicateName: (value: string) => boolean) => {
  const nameValidation = z
    .string()
    .trim()
    .min(1, "이름을 입력해주세요.")
    .refine((value) => !/\s{2,}/.test(value), {
      message: "연속된 공백은 허용되지 않습니다.",
    })
    .regex(NAME_ALLOWED_REGEX, {
      message: "한글, 영문(대/소문자), 공백만 허용됩니다.",
    })
    .superRefine((value, ctx) => {
      const trimmedValue = value.trim();
      if (HANGUL_OR_SPACE_ONLY_REGEX.test(value)) {
        if (trimmedValue.length < 2 || trimmedValue.length >= 5) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "한글 이름은 (띄어쓰기 포함) 최소 2자, 최대 5자까지 가능합니다.",
          });
        }
      } else {
        if (trimmedValue.length < 2 || trimmedValue.length >= 20) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "영문 또는 혼용 이름은 최소 2자, 최대 20자까지 가능합니다.",
          });
        }
      }
    })
    .refine((value) => !isDuplicateName(value.trim()), {
      message: "이미 등록된 이름이에요",
    });

    const schema = z.object({
    name: nameValidation,
    birthYear: z.string().min(1, "생년월일(년)은 필수 입력입니다."),
    birthMonth: z.string().min(1, "생년월일(월)은 필수 입력입니다."),
    birthDay: z.string().min(1, "생년월일(일)은 필수 입력입니다."),
    gender: z.enum(genderKeys, {
      message: "성별은 필수 입력입니다.",
    }),
    selectedProfile: z.enum(profileKeys, {
      message: "프로필은 필수 선택입니다.",
    }),
    selectedTraits: z
      .array(z.enum(traitKeys))
      .min(1, "성향은 최소 1개 이상 선택해야 합니다."),
    selectedGenres: z
      .array(z.enum(genreKeys))
      .min(1, "장르는 최소 1개 이상 선택해야 합니다."),
  });

  return schema;
};
type ChildFormSchema = ReturnType<typeof createChildFormSchema>;

export type ChildFormValues = z.infer<ChildFormSchema>;