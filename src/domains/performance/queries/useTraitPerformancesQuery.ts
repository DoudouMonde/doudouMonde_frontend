import { useQuery } from "@tanstack/react-query";
import { performanceApi } from "../apis/performanceApi";
import { queryKeys } from "@/shared/apis/queryKeys";
import { Trait } from "@/shared/types";

export const useTraitPerformancesQuery = (
  trait: Trait,
  childId: number | null
) => {
  return useQuery({
    queryKey: [queryKeys.PERFORMANCE_LIST, "trait", trait, childId],
    queryFn: () => performanceApi.getPerformancesByTrait(trait, childId!),
    enabled: !!trait && !!childId,
    staleTime: 1000 * 60 * 5, // 5분
  });
};
