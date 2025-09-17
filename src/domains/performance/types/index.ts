import { Genre, Sido } from "@/shared/types";

// 공연 데이터 타입
export type PerformanceItem = {
  performanceId: number;
  performanceName: string;
  posterUrl: string;
  sido: Sido;

  hasPlayRoom: boolean;
  hasNursingRoom: boolean;
  hasRestRoom: boolean;
};

// 좌석정보 데이터 타입
export type SeatsInfo = {
  seatMapImage: string | { uri: string };
  disclaimer: string;
  childCategories: string[];
};

// 공연 상세 정보 타입
export type PerformanceDetail = {
  performanceName: string;
  posterUrl: string;
  place: string;
  startDate: string;
  endDate: string;
  durationMinutes: number;
  ageLimit: number;
  price: number;

  genre: Genre;
  sido: Sido;
  isView: boolean;
  isLike: boolean;
  hasPlayRoom: boolean;
  hasNursingRoom: boolean;
  hasRestRoom: boolean;
};

export type TabType = "transport" | "seats" | "content";
// 인근 정보 타입
export type NearbyPlace = {
  name: string;
  distance: string;
  hasHighChair?: boolean; // 유아의자 여부 (맛집에만 해당)
};

export type NearbyInfo = {
  restaurants: NearbyPlace[];
  kidsCafes: NearbyPlace[];
};
// 위치 정보 타입
export type LocationDto = {
  latitude: number;
  longitude: number;
  address: string;
};

// 회원 위치와 공연장 위치를 함께 반환하는 타입
export type CombinedLocationDto = {
  memberLocation: LocationDto;
  facilityLocation: LocationDto;
};

// 영어 콘텐츠 타입
export type EnglishContent = {
  id: number;
  thumbnailUrl: string;
  youtubeUrl: string;
  englishTitle: string;
};

// 영어 콘텐츠 목록 응답 타입
export type EnglishContentListResponse = {
  contents: EnglishContent[];
};

// 인근시설 타입
export type NearbyFacility = {
  facilityId: number;
  facilityName: string;
  facilityType: string; // "RESTAURANT" | "KIDS_CAFE"
  distance: string;
  hasHighChair?: boolean;
  address: string;
  phoneNumber?: string;
};

// 인근시설 응답 타입
export type NearbyFacilityResponse = {
  facilities: NearbyFacility[];
};
