// /domains/child/queries/useChildDetailQuery.ts
import { useQuery } from "@tanstack/react-query";
import { childApi } from "@/domains/child/apis/childApi";
import { ChildItemResponse } from "@/domains/child/types/childApiTypes";

export const useChildDetailQuery = (childId: number) => {
  return useQuery<ChildItemResponse>({
    queryKey: ["child", childId],
    queryFn: () => childApi.getChildDetail(childId),
    enabled: !!childId, // childId가 있을 때만 실행
  });
};
