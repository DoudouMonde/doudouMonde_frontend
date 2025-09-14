import { ChildListResponse } from "@/domains/child/types/childApiTypes";
import { apiRequester } from "@/shared/apis/axiosInstance";

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

export interface UpdateChildTraitsRequest {
  traits: string[];
}

export interface UpdateChildTraitsResponse {
  childId: number;
  traits: string[];
}

export const childApi = {
  getChildList: async () => {
    const response = await apiRequester.get<ChildListResponse>("/v1/child");
    return response.data;
  },
  updateChildName: async (
    childId: number,
    request: UpdateChildNameRequest
  ): Promise<UpdateChildNameResponse> => {
    const response = await apiRequester.patch<UpdateChildNameResponse>(
      `/v1/child/${childId}/name`,
      request
    );
    return response.data;
  },
  updateChildProfile: async (
    childId: number,
    request: UpdateChildProfileRequest
  ): Promise<UpdateChildProfileResponse> => {
    const response = await apiRequester.patch<UpdateChildProfileResponse>(
      `/v1/child/${childId}/profile`,
      request
    );
    return response.data;
  },
  updateChildTraits: async (
    childId: number,
    request: UpdateChildTraitsRequest
  ): Promise<UpdateChildTraitsResponse> => {
    const response = await apiRequester.patch<UpdateChildTraitsResponse>(
      `/v1/child/${childId}/traits`,
      request
    );
    return response.data;
  },
};
