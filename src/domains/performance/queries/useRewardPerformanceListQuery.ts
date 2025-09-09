import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import {
  performanceApi,
  PerformanceListResponse,
} from "@/domains/performance/apis";
import { queryKeys } from "@/shared/apis";

export function useRewardPerformanceListQuery(
  queryOptions?: Omit<
    UseQueryOptions<PerformanceListResponse, Error>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: [queryKeys.PERFORMANCE_LIST],
    queryFn: async () => await performanceApi.getRewardPerformanceList(),
    ...queryOptions,
  });
}
