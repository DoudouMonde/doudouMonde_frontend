import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { childApi } from "../apis/childApi";
import type { ChildItemResponse } from "@/domains/child/types/childApiTypes";

const CHILDREN_QK = ["children"];

export function useChildListData() {
  const qc = useQueryClient();

  const { data } = useSuspenseQuery<ChildItemResponse[]>({
    queryKey: CHILDREN_QK,
    queryFn: () => childApi.getChildList(),
    // suspense: true, // ✅ 로딩은 Suspense로
    // useErrorBoundary: true, // ✅ 에러는 ErrorBoundary로
    staleTime: 60_000,
    gcTime: 5 * 60_000,
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: CHILDREN_QK });

  return {
    children: data ?? [],
    invalidate,
  };
}
