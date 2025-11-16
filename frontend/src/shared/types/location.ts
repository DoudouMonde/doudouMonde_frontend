// 카카오 로컬 검색 API 응답 타입
export interface KakaoLocalSearchResponse {
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
  documents: KakaoPlaceDocument[];
}

export interface KakaoPlaceDocument {
  id: string;
  place_name: string;
  category_name: string;
  category_group_code: string;
  category_group_name: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: string; // 경도
  y: string; // 위도
  place_url: string;
  distance: string;
}

// 주소 검색 결과 타입
export interface AddressSearchResult {
  id: string;
  placeName: string;
  addressName: string;
  roadAddressName: string;
  categoryName: string;
  phone: string;
  latitude: number;
  longitude: number;
  placeUrl: string;
}

// 주소 선택 시 반환되는 타입
export interface SelectedAddress {
  placeName: string;
  addressName: string;
  roadAddressName: string;
  latitude: number;
  longitude: number;
  categoryName: string;
  phone: string;
}
