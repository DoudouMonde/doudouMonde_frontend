import { useMutation } from "@tanstack/react-query";
import { childApi, UpdateChildNameRequest } from "../apis/childApi";

export const useUpdateChildNameMutation = () => {
  return useMutation({
    mutationFn: ({
      childId,
      request,
    }: {
      childId: number;
      request: UpdateChildNameRequest;
    }) => childApi.updateChildName(childId, request),
    // 쿼리 무효화를 제거하여 순서 변경 방지
    // 로컬 상태 업데이트로 UI 반영
  });
};
