import { useQuery } from "@tanstack/react-query";
import { childApi } from "../apis/childApi";
import { queryKeys } from "@/shared/apis/queryKeys";

export const useChildTraitsQuery = (childId: number | null) => {
  return useQuery({
    queryKey: queryKeys.child.traits(childId),
    queryFn: () => childApi.getChildTraits(childId!),
    enabled: !!childId,
  });
};
