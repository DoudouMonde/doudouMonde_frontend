import { useQuery } from "@tanstack/react-query";
import {
  performanceApi,
  PerformanceListResponse,
} from "@/domains/performance/apis";
import { queryKeys } from "@/shared/apis/queryKeys";

export const useTraitPerformanceQuery = (trait: string) => {
  return useQuery({
    queryKey: [queryKeys.PERFORMANCE_LIST, "trait", trait],
    queryFn: async () => {
      // SHORT_ATTENTION인 경우 별도 API 사용
      if (trait === "SHORT_ATTENTION") {
        const response = await performanceApi.getShortDurationPerformances();
        return response; // 백엔드에서 이미 2개만 반환하므로 그대로 사용
      }

      let genre = "";

      // 성향에 따른 장르 매핑
      switch (trait) {
        case "MUSIC_LOVER":
          genre = "POP_MUSIC";
          break;
        case "DANCE_LOVER":
          genre = "POP_DANCE";
          break;
        case "CURIOUS":
          // 새로운 장르 추천 - 랜덤하게 다른 장르 선택
          const randomGenres = [
            "CLASSICAL_MUSIC",
            "KOREAN_MUSIC",
            "CIRCUS_MAGIC",
          ];
          genre = randomGenres[Math.floor(Math.random() * randomGenres.length)];
          break;
        default:
          genre = "PLAY"; // 기본값
      }

      const response = await performanceApi.getGenrePerformanceList(
        genre as any
      );

      // 2개만 반환
      return {
        ...response,
        contents: response.contents.slice(0, 2),
      } as PerformanceListResponse;
    },
    enabled: !!trait,
    staleTime: 1000 * 60 * 5, // 5분
  });
};
