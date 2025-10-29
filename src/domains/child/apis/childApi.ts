import { ChildRequest } from "@/domains/auth/types/signup";
import { ChildListResponse } from "@/domains/child/types/childApiTypes";
import { apiRequester } from "@/shared/apis/axiosInstance";

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

export interface UpdateChildBirthdayRequest {
  childId: number;
  birthday: string;
}

export interface UpdateChildBirthdayResponse {
  childId: number;
  birthday: string;
}

export interface UpdateChildGenderRequest {
  childId: number;
  gender: string;
}

export interface UpdateChildGenderResponse {
  childId: number;
  gender: string;
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

  updateChildBirthday: async (
    childId: number,
    request: UpdateChildBirthdayRequest
  ) => {
    const res = await apiRequester.patch<UpdateChildBirthdayResponse>(
      `/v1/child/${childId}/birthday`,
      request
    );
    return res.data;
  },

  updateChildGender: async (
    childId: number,
    request: UpdateChildGenderRequest
  ) => {
    const res = await apiRequester.patch<UpdateChildGenderResponse>(
      `/v1/child/${childId}/gender`,
      request
    );
    return res.data;
  },
};
