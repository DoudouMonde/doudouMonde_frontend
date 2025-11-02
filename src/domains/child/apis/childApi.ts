import {
  ChildDetailResponse,
  ChildListResponse,
  PostChildRegistrationRequest,
} from "@/domains/child/types/childApiTypes";

import { PostChildRegistrationResponse } from "@/domains/child/types/childApiTypes";
import { apiRequester } from "@/shared/apis/axiosInstance";
import { Profile } from "@/shared/types";

export const childApi = {
  postChildRegistration: async (
    data: PostChildRegistrationRequest
  ): Promise<PostChildRegistrationResponse> => {
    const res = await apiRequester.post<PostChildRegistrationResponse>(
      "/v1/child",
      data
    );
    return res.data;
  },

  getChildList: async () => {
    const res = await apiRequester.get<ChildListResponse>("/v1/child");

    //safeParse를 통해 에러를 제어할 수 있음
    const result = ChildListResponse.safeParse(res.data); //data가 childListResponse 와 일치하는지 확인

    if (!result.success) {
      console.error(result.error);
      //error를 던지기
      throw new Error("Invalid ChildListResponse");
      //모니터링로그를 남기는 코드 -> sentry를 추가해봐

      //UI를 어떻게 띄울지 고민
      //프로필이 중요하지 않으면 -> 아무 프로필 띄우는 것으로 해결할 수 있음
      return {
        items: [{ id: 0, name: "알 수 없음", profile: Profile.CAT }],
      };
      //정확한 정보가 띄워야져야 하면 -> 아예 띄우지 않거나.. 아무 대안이 없다면 메세지를 띄우는 것으로 해결할 수 있음
    }
    return res.data;
  },
  getChildDetail: async (childId: number) => {
    const res = await apiRequester.get<ChildDetailResponse>(
      `/vi/child/${childId}`
    );
    return res.data;
  },
};
