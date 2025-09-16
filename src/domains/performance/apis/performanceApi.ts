import { PerformanceListResponse } from "@/domains/performance/apis";
import {
  PerformanceDetail,
  CombinedLocationDto,
  EnglishContentListResponse,
} from "@/domains/performance/types";
import { apiRequester } from "@/shared/apis/axiosInstance";
import { Genre, Sido } from "@/shared/types";

export const performanceApi = {
  getPerformanceDetail: async (performanceId: number) => {
    console.log("🎭 공연 상세 정보 API 요청:", {
      performanceId,
      performanceIdType: typeof performanceId,
      url: `/v1/performances/${performanceId}`,
      timestamp: new Date().toISOString(),
    });

    const response = await apiRequester.get<PerformanceDetail>(
      `/v1/performances/${performanceId}`
    );

    console.log("🎭 공연 상세 정보 API 응답:", {
      performanceId,
      status: response.status,
      data: response.data,
      timestamp: new Date().toISOString(),
    });

    return response.data;
  },
  getGenrePerformanceList: async (genre: Genre) => {
    const response = await apiRequester.get<PerformanceListResponse>(
      `/v1/performances`,
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
      `/v1/performances`,
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
      `/v1/performances`,
      {
        params: {
          isReward: true,
        },
      }
    );
    return response.data;
  },
  searchPerformances: async (searchText?: string, page: number = 0) => {
    const response = await apiRequester.get<PerformanceListResponse>(
      `/v1/performances`,
      {
        params: {
          searchText,
          page,
        },
      }
    );
    return response.data;
  },
  getCombinedLocations: async (performanceId: number) => {
    const response = await apiRequester.get<CombinedLocationDto>(
      `/v1/performances/${performanceId}/locations`
    );
    return response.data;
  },
  getEnglishContents: async (performanceId: number) => {
    const response = await apiRequester.get<EnglishContentListResponse>(
      `/v1/performances/${performanceId}/english-contents`
    );
    return response.data;
  },
  getNewGenrePerformanceList: async (childId: number) => {
    const response = await apiRequester.get<PerformanceListResponse>(
      `/v1/performances/new-genre/${childId}`
    );
    return response.data;
  },
};
