import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import {
  performanceApi,
  PerformanceListResponse,
} from "@/domains/performance/apis";
import { queryKeys } from "@/shared/apis";
import { Genre } from "@/shared/types";

export function usePerformanceListByGenreQuery(
  genre: Genre,
  queryOptions?: UseQueryOptions<PerformanceListResponse, Error>
) {
  return useQuery({
    queryKey: [queryKeys.PERFORMANCE_LIST],
    queryFn: async () => await performanceApi.getGenrePerformanceList(genre),
    ...queryOptions,
  });
}
