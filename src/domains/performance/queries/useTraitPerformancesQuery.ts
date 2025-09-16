import { useQuery } from "@tanstack/react-query";
import { performanceApi } from "../apis/performanceApi";
import { queryKeys } from "@/shared/apis/queryKeys";

export const useTraitPerformancesQuery = (
  trait: string,
  childId: number | null
) => {
  return useQuery({
    queryKey: [queryKeys.PERFORMANCE_LIST, "trait", trait, childId],
    queryFn: () => performanceApi.getPerformancesByTrait(trait, childId!),
    enabled: !!trait && !!childId,
    staleTime: 1000 * 60 * 5, // 5분
  });
};
