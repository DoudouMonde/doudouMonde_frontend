import { Genre } from "@/shared/types";

export const getGenreLabel = (genre: Genre) => {
  // COMPOSITE("복합"),
  // PLAY("연극"),
  // MUSICAL("뮤지컬"),
  // POP_DANCE("대중무용"),
  // POP_MUSIC("대중음악"),
  // CLASSICAL_MUSIC("서양음악(클래식)"),
  // KOREAN_MUSIC("한국음악(국악)"),
  // CIRCUS_MAGIC("서커스/마술"),
  // DANCE("무용(서양/한국무용)");
  switch (genre) {
    case Genre.PLAY:
      return "연극";
    case Genre.COMPOSITE:
      return "공연";
    case Genre.MUSICAL:
      return "뮤지컬";
    case Genre.CIRCUS_MAGIC:
      return "서커스/마술";
    case Genre.POP_DANCE:
      return "대중무용";
    case Genre.POP_MUSIC:
      return "대중음악";
    case Genre.CLASSICAL_MUSIC:
      return "서양음악(클래식)";
    case Genre.KOREAN_MUSIC:
      return "한국음악(국악)";
    case Genre.DANCE:
      return "무용(서양/한국무용)";
    default:
      return "알 수 없음";
  }
};
