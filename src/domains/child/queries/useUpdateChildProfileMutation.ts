import { useMutation } from "@tanstack/react-query";
import { childApi, UpdateChildProfileRequest } from "../apis/childApi";

export const useUpdateChildProfileMutation = () => {
  return useMutation({
    mutationFn: ({
      childId,
      request,
    }: {
      childId: number;
      request: UpdateChildProfileRequest;
    }) => childApi.updateChildProfile(childId, request),
    // 쿼리 무효화를 제거하여 순서 변경 방지
    // 로컬 상태 업데이트로 UI 반영
  });
};
