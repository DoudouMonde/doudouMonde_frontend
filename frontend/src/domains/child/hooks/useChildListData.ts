// /domains/child/hooks/useChildListData.ts
import { useChildListQuery } from "@/domains/child/queries";
import { queryClient } from "@/shared/apis/queryClient";
import { queryKeys } from "@/shared/apis/queryKeys";
import type { ChildItemResponse } from "@/domains/child/types/childApiTypes";

export function useChildListData() {
  const { data } = useChildListQuery<ChildItemResponse[]>({
    select: (d) => d.items, // d: ChildListResponse → items: ChildItemResponse[]
  });

  const children: ChildItemResponse[] = data ?? [];

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: [queryKeys.CHILD_LIST] });

  return { children, invalidate };
}
