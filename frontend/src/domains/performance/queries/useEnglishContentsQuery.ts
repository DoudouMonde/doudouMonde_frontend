import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { performanceApi } from "@/domains/performance/apis";
import { queryKeys } from "@/shared/apis";
import { EnglishContentListResponse } from "@/domains/performance/types";

export function useEnglishContentsQuery(
  performanceId: number,
  queryOptions?: Omit<
    UseQueryOptions<EnglishContentListResponse, Error>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: [queryKeys.PERFORMANCE_DETAIL, performanceId, "english-contents"],
    queryFn: async () => await performanceApi.getEnglishContents(performanceId),
    enabled: !!performanceId,
    ...queryOptions,
  });
}
