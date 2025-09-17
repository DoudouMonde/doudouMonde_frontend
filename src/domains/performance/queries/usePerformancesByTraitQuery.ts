import { useQuery } from "@tanstack/react-query";
import { performanceApi } from "../apis/performanceApi";
import { queryKeys } from "@/shared/apis/queryKeys";
import { Trait } from "@/shared/types";

export const usePerformancesByTraitQuery = (
  trait: Trait | null,
  childId: number | null
) => {
  return useQuery({
    queryKey: queryKeys.performance.trait(trait, childId),
    queryFn: () => performanceApi.getPerformancesByTrait(trait!, childId!),
    enabled: !!trait && !!childId,
  });
};
