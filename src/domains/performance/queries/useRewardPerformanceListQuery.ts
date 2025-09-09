import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import {
  performanceApi,
  PerformanceListResponse,
} from "@/domains/performance/apis";
import { queryKeys } from "@/shared/apis";

export function useRewardPerformanceListQuery(
  queryOptions?: UseQueryOptions<PerformanceListResponse, Error>
) {
  return useQuery({
    queryKey: [queryKeys.PERFORMANCE_LIST],
    queryFn: async () => await performanceApi.getRewardPerformanceList(),
    ...queryOptions,
  });
}
