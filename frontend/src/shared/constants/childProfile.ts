// 순수 데이터 (아이콘은 여기 넣지 않음)
export type ChildProfileValue =
  | "CAT"
  | "CHICK"
  | "DINOSAUR"
  | "DOG"
  | "RABBIT"
  | "DOUDOU";

export const CHILD_PROFILE_LABELS: Record<ChildProfileValue, string> = {
  CAT: "고양이",
  CHICK: "병아리",
  DINOSAUR: "공룡",
  DOG: "강아지",
  RABBIT: "토끼",
  DOUDOU: "두두",
};
