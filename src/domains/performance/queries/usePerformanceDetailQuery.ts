import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { performanceApi } from "@/domains/performance/apis";
import { queryKeys } from "@/shared/apis";
import { PerformanceDetail } from "@/domains/performance/types";

export function usePerformanceDetailQuery(
  performanceId: number,
  queryOptions?: Omit<
    UseQueryOptions<PerformanceDetail, Error>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: [queryKeys.PERFORMANCE_LIST],
    queryFn: async () =>
      await performanceApi.getPerformanceDetail(performanceId),
    ...queryOptions,
  });
}
