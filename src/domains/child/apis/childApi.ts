import { ChildRequest } from "@/domains/auth/types/signup";
import { ChildListResponse } from "@/domains/child/types/childApiTypes";
import { apiRequester } from "@/shared/apis/axiosInstance";

//아이 등록 API 요청 결과 타입 -> api가 생성된 후 다시 수정
export interface PostChildRegistrationResponse {
  childId: number;
  success: boolean;
}

export interface UpdateChildNameRequest {
  name: string;
}

export interface UpdateChildNameResponse {
  childId: number;
  name: string;
}

export interface UpdateChildProfileRequest {
  profile: string;
}

export interface UpdateChildProfileResponse {
  childId: number;
  profile: string;
}

export const childApi = {
  postChildRegistration: async (
    data: ChildRequest
  ): Promise<PostChildRegistrationResponse> => {
    const res = await apiRequester.post<PostChildRegistrationResponse>(
      "/v1/child",
      data
    );
    return res.data;
  },

  getChildList: async () => {
    const res = await apiRequester.get<ChildListResponse>("/v1/child");
    return res.data;
  },

  updateChildName: async (childId: number, request: UpdateChildNameRequest) => {
    const res = await apiRequester.patch<UpdateChildNameResponse>(
      `/v1/child/${childId}/name`,
      request
    );
    return res.data;
  },

  updateChildProfile: async (
    childId: number,
    request: UpdateChildProfileRequest
  ) => {
    const res = await apiRequester.patch<UpdateChildProfileResponse>(
      `/v1/child/${childId}/profile`,
      request
    );
    return res.data;
  },
};
