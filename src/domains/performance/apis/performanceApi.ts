import { PerformanceListResponse } from "@/domains/performance/apis";
import { apiRequester } from "@/shared/apis/axiosInstance";

export const performanceApi = {
  getRecommendedPerformanceList: async (childId: number) => {
    const response = await apiRequester.get<PerformanceListResponse>(
      `/v1/performance/children/${childId}/performances?recommended=true`
    );
    return response.data;
  },
};
