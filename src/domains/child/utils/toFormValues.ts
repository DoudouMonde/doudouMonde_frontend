// /domains/child/utils/toFormValues.ts
import { ChildDetailResponse } from "@/domains/child/types/childApiTypes";
import { ChildFormValues } from "@/domains/child/types/childForm";

// birthday: "YYYY-MM-DD" → year/month/day 분해
function splitBirthday(birthday?: string) {
  if (!birthday) return { year: "", month: "", day: "" };
  const [y, m, d] = birthday.split("-");
  return { year: y ?? "", month: m ?? "", day: d ?? "" };
}

export function toFormValues(child: ChildDetailResponse): ChildFormValues {
  const { year, month, day } = splitBirthday(child.birthday);

  return {
    name: child.name ?? "",
    birthYear: year,
    birthMonth: month,
    birthDay: day,
    gender: child.gender ?? "", // 폼 타입이 string | undefined 라면 그대로
    selectedProfile: child.profile ?? "CAT", // 폼에서 쓰는 필드명이 selectedProfile이면 여기서 맞춰준다
  };
}
