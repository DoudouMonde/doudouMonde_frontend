import { ChildRequest } from "@/domains/auth/types/signup";
import { ChildListResponse } from "@/domains/child/types/childApiTypes";
import { apiRequester } from "@/shared/apis/axiosInstance";

//API 호출 환경 설정 및 Mocking 활성화
const IS_MOCKING_ENABLED = true;

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

//Mocking 함수
const mockPostChildRegistration = async (
  data: ChildRequest
): Promise<PostChildRegistrationResponse> => {
  console.log("--- MOCK API CALL: POST Child Registration ---");
  console.log("Mocking: 아이 정보 등록 시도", data);

  //2초 지연 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 2000));

  //성공 응답 및 임시 ID 반환
  return {
    childId: Math.floor(Math.random() * 10000) + 1,
    success: true,
  };
};

export const childApi = {
  postChildRegistration: async (
    data: ChildRequest
  ): Promise<PostChildRegistrationResponse> => {
    if (IS_MOCKING_ENABLED) {
      return mockPostChildRegistration(data);
    }

    try {
      const response = await apiRequester.post<PostChildRegistrationResponse>(
        "/vi/child",
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getChildList: async () => {
    try {
      const response = await apiRequester.get<ChildListResponse>("/v1/child");
      return response.data;
    } catch (error) {
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
};
