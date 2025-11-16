import { performanceApi } from "@/domains/performance/apis/performanceApi";
import { queryKeys } from "@/shared/apis/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useNearbyFacilitiesQuery = (
  performanceId: number,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: queryKeys.performance.nearbyFacilities(performanceId),
    queryFn: () => performanceApi.getNearbyFacilities(performanceId),
    enabled: options?.enabled ?? true,
  });
};
