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
    console.log("👶 아이 목록 API 요청 시작");
    console.log("🌐 요청 URL:", "/v1/child");
    console.log("🌍 전체 URL:", `${apiRequester.defaults.baseURL}/v1/child`);

    try {
      const response = await apiRequester.get<ChildListResponse>("/v1/child");
      console.log("👶 아이 목록 API 응답 성공:", {
        status: response.status,
        data: response.data,
        childrenCount: response.data?.contents?.length || 0,
      });
      return response.data;
    } catch (error) {
      console.error("❌ 아이 목록 API 요청 실패:", error);
      console.error("🔍 에러 상세:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
      });
      throw error;
    }
  },
  getChildTraits: async (
    childId: number
  ): Promise<UpdateChildTraitsResponse> => {
    console.log("👶 아이 취향 API 요청 시작");
    console.log("🌐 요청 URL:", `/v1/child/${childId}/traits`);
    console.log(
      "🌍 전체 URL:",
      `${apiRequester.defaults.baseURL}/v1/child/${childId}/traits`
    );
    console.log(
      "🔍 백엔드가 /api/v1/{childId}/traits를 사용한다면:",
      `${apiRequester.defaults.baseURL}/${childId}/traits`
    );
    console.log(
      "🔍 백엔드가 /api/v1/child/{childId}/traits를 사용한다면:",
      `${apiRequester.defaults.baseURL}/v1/child/${childId}/traits`
    );
    console.log("👤 childId:", childId);
    console.log("🔑 요청 메서드: GET");

    try {
      const response = await apiRequester.get<UpdateChildTraitsResponse>(
        `/v1/${childId}/traits`
      );
      console.log("👶 아이 취향 API 응답 성공:", {
        status: response.status,
        data: response.data,
        traits: response.data?.traits || [],
      });
      return response.data;
    } catch (error) {
      console.error("❌ 아이 취향 API 요청 실패:", error);
      console.error("🔍 에러 상세:", {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
      });
      throw error;
    }
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
