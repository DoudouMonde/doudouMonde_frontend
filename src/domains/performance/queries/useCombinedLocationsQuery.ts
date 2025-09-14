import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import { performanceApi } from "@/domains/performance/apis";
import { queryKeys } from "@/shared/apis";
import { CombinedLocationDto } from "@/domains/performance/types";

export function useCombinedLocationsQuery(
  performanceId: number,
  queryOptions?: Omit<
    UseQueryOptions<CombinedLocationDto, Error>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: [queryKeys.PERFORMANCE_DETAIL, performanceId, "locations"],
    queryFn: async () =>
      await performanceApi.getCombinedLocations(performanceId),
    enabled: !!performanceId,
    ...queryOptions,
  });
}
