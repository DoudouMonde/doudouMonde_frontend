// src/domains/child/queries/useDeleteChildMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { childApi } from "@/domains/child/apis/childApi";
import { queryKeys } from "@/shared/apis/queryKeys";
import type { ChildListResponse } from "@/domains/child/types/childApiTypes";

export const useDeleteChildMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (childId: number) => {
      return await childApi.deleteChild(childId);
    },
    onMutate: async (childId) => {
      await queryClient.cancelQueries({ queryKey: [queryKeys.CHILD_LIST] });
      const previous = queryClient.getQueryData<ChildListResponse>([
        queryKeys.CHILD_LIST,
      ]);

      if (previous) {
        queryClient.setQueryData<ChildListResponse>([queryKeys.CHILD_LIST], {
          items: previous.items.filter((c) => c.id !== childId),
        });
      }

      return { previous };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData([queryKeys.CHILD_LIST], ctx.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.CHILD_LIST] });
    },
  });
};
