import { Genre } from "@/shared/types";

export const getGenreLabel = (genre: Genre) => {
  switch (genre) {
    case Genre.PLAY:
      return "연극";
    case Genre.PERFORMANCE:
      return "공연";
    case Genre.MUSICAL:
      return "뮤지컬";
  }
};
