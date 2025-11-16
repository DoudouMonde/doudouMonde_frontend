import { useMutation, useQueryClient } from "@tanstack/react-query";
import { childApi } from "@/domains/child/apis/childApi";
import type { ChildDetailResponse } from "@/domains/child/types/childApiTypes";
import { UpdateChildRequest } from "@/domains/child/types/childApiTypes";
type UpdateVars = { childId: number; payload: UpdateChildRequest };

export const useUpdateChildMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ childId, payload }: UpdateVars) =>
      childApi.patchChild(childId, payload),

    onSuccess: async (_res, { childId, payload }) => {
      // 단건 캐시 병합
      qc.setQueryData<ChildDetailResponse>(["child", childId], (prev) =>
        prev ? { ...prev, ...payload } : prev
      );

      // 목록 무효화(필요 시)
      await qc.invalidateQueries({ queryKey: ["child"] });
    },
  });
};
