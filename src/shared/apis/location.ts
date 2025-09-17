import { kakaoInstance } from "@/shared/apis";
import { END_POINT } from "@/shared/constants/api";
import { KakaoLocalSearchResponse } from "@/shared/types/location";

export const getLocationListByQuery = async (query: string) => {
  const response = await kakaoInstance.get<KakaoLocalSearchResponse>(
    END_POINT.LOCATION,
    {
      params: { query, size: 6 },
    }
  );
  return response;
};
