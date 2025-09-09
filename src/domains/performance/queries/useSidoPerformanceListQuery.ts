import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import {
  performanceApi,
  PerformanceListResponse,
} from "@/domains/performance/apis";
import { queryKeys } from "@/shared/apis";
import { Sido } from "@/shared/types";

export function useSidoPerformanceListQuery(
  sido: Sido,
  queryOptions?: UseQueryOptions<PerformanceListResponse, Error>
) {
  return useQuery({
    queryKey: [queryKeys.PERFORMANCE_LIST],
    queryFn: async () => await performanceApi.getSidoPerformanceList(sido),
    ...queryOptions,
  });
}
