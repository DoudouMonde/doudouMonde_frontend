// /domains/child/hooks/useChildListData.ts
import { useChildListQuery } from "@/domains/child/queries";
import { queryClient } from "@/shared/apis/queryClient";
import { queryKeys } from "@/shared/apis/queryKeys";
import type { ChildItemResponse } from "@/domains/child/types/childApiTypes";
import { Profile } from "@/entities/types";
import { useEffect, useState } from "react";

// 목 데이터 예시
const MOCK_CHILDREN: ChildItemResponse[] = [
  {
    id: 1,
    name: "민준",
    profile: Profile.CAT,
  },
  {
    id: 2,
    name: "서연",
    profile: Profile.CHICK,
  },
  {
    id: 3,
    name: "지후",
    profile: Profile.DINOSAUR,
  },
];
export function useChildListData() {
  const [children, setChildren] = useState<ChildItemResponse[]>([]);

  useEffect(() => {
    // API 호출 전 목 데이터 사용
    setChildren(MOCK_CHILDREN);
  }, []);
  // const { data } = useChildListQuery<ChildItemResponse[]>({
  //   select: (d) => d.items,
  // });

  // const children: ChildItemResponse[] = data ?? [];

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: [queryKeys.CHILD_LIST] });

  return { children, invalidate };
}
