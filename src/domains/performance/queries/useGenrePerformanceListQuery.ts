import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import {
  performanceApi,
  PerformanceListResponse,
} from "@/domains/performance/apis";
import { queryKeys } from "@/shared/apis";
import { Genre } from "@/shared/types";

export function useGenrePerformanceListQuery(
  genre: Genre,
  queryOptions?: Omit<
    UseQueryOptions<PerformanceListResponse, Error>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: [queryKeys.PERFORMANCE_LIST, genre],
    queryFn: async () => await performanceApi.getGenrePerformanceList(genre),
    ...queryOptions,
  });
}
