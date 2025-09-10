import { PerformanceListResponse } from "@/domains/performance/apis";
import { PerformanceDetail } from "@/domains/performance/types";
import { apiRequester } from "@/shared/apis/axiosInstance";
import { Genre, Sido } from "@/shared/types";

export const performanceApi = {
  getPerformanceDetail: async (performanceId: number) => {
    const response = await apiRequester.get<PerformanceDetail>(
      `/api/v1/performances/${performanceId}`
    );
    return response.data;
  },
  getGenrePerformanceList: async (genre: Genre) => {
    const response = await apiRequester.get<PerformanceListResponse>(
      `/api/v1/performances`,
      {
        params: {
          genre,
        },
      }
    );
    return response.data;
  },
  getSidoPerformanceList: async (sido: Sido) => {
    const response = await apiRequester.get<PerformanceListResponse>(
      `/api/v1/performances`,
      {
        params: {
          sido,
        },
      }
    );
    return response.data;
  },
  getRewardPerformanceList: async () => {
    const response = await apiRequester.get<PerformanceListResponse>(
      `/api/v1/performances`,
      {
        params: {
          isReward: true,
        },
      }
    );
    return response.data;
  },
};
