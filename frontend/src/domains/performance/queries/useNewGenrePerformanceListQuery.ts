import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import {
  performanceApi,
  PerformanceListResponse,
} from "@/domains/performance/apis";
import { queryKeys } from "@/shared/apis";

export function useNewGenrePerformanceListQuery(
  childId: number | null,
  queryOptions?: Omit<
    UseQueryOptions<PerformanceListResponse, Error>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: [queryKeys.PERFORMANCE_LIST, "new-genre", childId],
    queryFn: async () => {
      if (!childId) throw new Error("Child ID is required");
      return await performanceApi.getNewGenrePerformanceList(childId);
    },
    enabled: !!childId,
    ...queryOptions,
  });
}
