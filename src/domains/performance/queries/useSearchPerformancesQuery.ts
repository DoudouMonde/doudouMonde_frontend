import { useQuery } from "@tanstack/react-query";
import { performanceApi } from "@/domains/performance/apis";

export const useSearchPerformancesQuery = (
  searchText?: string,
  page: number = 0
) => {
  return useQuery({
    queryKey: ["searchPerformances", searchText, page],
    queryFn: () => performanceApi.searchPerformances(searchText, page),
    enabled: !!searchText || searchText === "", // 빈 문자열도 허용 (전체 검색)
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  });
};
