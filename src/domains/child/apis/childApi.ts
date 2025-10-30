import { PostChildRegistrationRequest } from "@/domains/child/types/childApiTypes";

import {
  ChildListResponse,
  PostChildRegistrationResponse,
} from "@/domains/child/types/childApiTypes";
import { apiRequester } from "@/shared/apis/axiosInstance";

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
    return res.data.items;
  },
};
