import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import {
  performanceApi,
  PerformanceListResponse,
} from "@/domains/performance/apis";
import { queryKeys } from "@/shared/apis";
import { Trait } from "@/shared/types";

export function usePerformancesByTraitQuery(
  trait: Trait,
  childId: number,
  queryOptions?: Omit<
    UseQueryOptions<PerformanceListResponse, Error>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: [queryKeys.PERFORMANCE_LIST, "trait", trait, childId],
    queryFn: async () => {
      if (!trait || !childId)
        throw new Error("Trait and Child ID are required");
      return await performanceApi.getPerformancesByTrait(trait, childId);
    },
    enabled: !!trait && !!childId,
    ...queryOptions,
  });
}
