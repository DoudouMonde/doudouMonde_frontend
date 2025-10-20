// 순수 데이터 + 타입만 (UI 의존성 없음)
export type GenreValue =
  | "COMPOSITE"
  | "PLAY"
  | "MUSICAL"
  | "POP_DANCE"
  | "POP_MUSIC"
  | "CLASSICAL_MUSIC"
  | "KOREAN_MUSIC"
  | "CIRCUS_MAGIC"
  | "DANCE";

export const GENRE_LABELS: Record<GenreValue, string> = {
  COMPOSITE: "복합",
  PLAY: "연극",
  MUSICAL: "뮤지컬",
  POP_DANCE: "대중무용",
  POP_MUSIC: "대중음악",
  CLASSICAL_MUSIC: "서양음악(클래식)",
  KOREAN_MUSIC: "한국음악(국악)",
  CIRCUS_MAGIC: "서커스/마술",
  DANCE: "무용(서양/한국무용)",
};

export const GENRES: { value: GenreValue; label: string }[] = Object.entries(
  GENRE_LABELS
).map(([value, label]) => ({ value: value as GenreValue, label }));
