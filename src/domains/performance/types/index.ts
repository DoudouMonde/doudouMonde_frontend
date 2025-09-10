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
  startDate: [number, number, number];
  endDate: [number, number, number];
  durationMinutes: number;
  ageLimit: string;
  price: number;

  genre: Genre;
  sido: Sido;

  hasPlayRoom: boolean;
  hasNursingRoom: boolean;
  hasRestRoom: boolean;
  nearbyInfo?: NearbyInfo;
  seatsInfo?: SeatsInfo;
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
