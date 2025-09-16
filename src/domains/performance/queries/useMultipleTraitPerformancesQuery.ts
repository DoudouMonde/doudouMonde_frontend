import { useQueries } from "@tanstack/react-query";
import {
  performanceApi,
  PerformanceListResponse,
} from "@/domains/performance/apis";
import { queryKeys } from "@/shared/apis/queryKeys";

export const useMultipleTraitPerformancesQuery = (traits: string[]) => {
  return useQueries({
    queries: traits.map((trait) => ({
      queryKey: [queryKeys.PERFORMANCE_LIST, "trait", trait],
      queryFn: async () => {
        // SHORT_ATTENTION인 경우 별도 API 사용
        if (trait === "SHORT_ATTENTION") {
          const response = await performanceApi.getShortDurationPerformances();
          return {
            ...response,
            trait, // 어떤 성향으로 가져온 데이터인지 표시
            genre: "SHORT_DURATION", // 어떤 장르로 가져온 데이터인지 표시
          } as PerformanceListResponse & { trait: string; genre: string };
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
            genre =
              randomGenres[Math.floor(Math.random() * randomGenres.length)];
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
          trait, // 어떤 성향으로 가져온 데이터인지 표시
          genre, // 어떤 장르로 가져온 데이터인지 표시
        } as PerformanceListResponse & { trait: string; genre: string };
      },
      enabled: !!trait,
      staleTime: 1000 * 60 * 5, // 5분
    })),
  });
};
