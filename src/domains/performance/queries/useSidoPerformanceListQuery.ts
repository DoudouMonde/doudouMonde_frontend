import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import {
  performanceApi,
  PerformanceListResponse,
} from "@/domains/performance/apis";
import { queryKeys } from "@/shared/apis";
import { Sido } from "@/shared/types";

export function useSidoPerformanceListQuery(
  sido: Sido,
  queryOptions?: Omit<
    UseQueryOptions<PerformanceListResponse, Error>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: [queryKeys.PERFORMANCE_LIST, sido],
    queryFn: async () => await performanceApi.getSidoPerformanceList(sido),
    ...queryOptions,
  });
}
