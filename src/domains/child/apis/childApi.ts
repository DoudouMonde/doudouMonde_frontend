import { ChildListResponse } from "@/domains/child/apis/dto/ChildListResponse";
import { apiRequester } from "@/shared/apis/axiosInstance";

export const childApi = {
  getChildList: async () => {
    const response = await apiRequester.get<ChildListResponse>("/api/v1/child");
    return response.data;
  },
};
