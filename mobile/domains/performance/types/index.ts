import { ImageSourcePropType } from "react-native";

// 공연 데이터 타입
export type PerformanceItem = {
  id: number;
  title: string;
  location: string;
  poster: ImageSourcePropType;
  facilities: FacilityIcon[];
};
// 시설 아이콘 타입
export type FacilityIcon = "restroom" | "baby" | "playroom";

// 좌석정보 데이터 타입
export type SeatsInfo = {
  seatMapImage: string | { uri: string };
  disclaimer: string;
  childCategories: string[];
};

// 공연 상세 정보 타입
export type PerformanceDetail = {
  title: string;
  poster: ImageSourcePropType;
  tag?: string;
  location: string;
  period: string;
  duration: string;
  ageLimit: string;
  prices: string[];
  facilities: string;
  hasParking?: boolean;
  transportInfo?: {
    publicTransport: {
      duration: string;
      image: ImageSourcePropType;
    };
    car: {
      duration: string;
      image: ImageSourcePropType;
    };
  };
  nearbyInfo?: NearbyInfo;
  seatsInfo?: SeatsInfo;
};

export type TabType = "transport" | "seats" | "nearby";
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
