import { useState } from "react";
import KakaoMap from "@/shared/components/KakaoMap";
import {
  useCombinedLocationsQuery,
  usePerformanceDetailQuery,
} from "@/domains/performance/queries";

type Props = {
  performanceId: number;
};

type TransportType = "car" | "transit" | "walk";

const transportOptions: Array<{
  type: TransportType;
  label: string;
  icon: string;
  description: string;
}> = [
  {
    type: "car",
    label: "자동차",
    icon: "🚗",
    description: "빠르고 편리한 이동",
  },
  {
    type: "transit",
    label: "대중교통",
    icon: "🚌",
    description: "환경친화적 이동",
  },
  { type: "walk", label: "도보", icon: "🚶", description: "건강한 이동" },
];

export const TransportSection = ({ performanceId }: Props) => {
  const [selectedTransport, setSelectedTransport] =
    useState<TransportType>("transit");
  const { data: performanceDetail } = usePerformanceDetailQuery(
    Number(performanceId),
    {
      enabled: !!performanceId,
    }
  );
  // API에서 위치 정보 가져오기
  const {
    data: locationData,
    isLoading,
    error,
  } = useCombinedLocationsQuery(performanceId);

  if (!locationData) {
    return null;
  }

  // API 데이터가 있으면 사용하고, 없으면 fallback 값 사용
  const userLocation = locationData.memberLocation
    ? {
        lat: locationData.memberLocation.latitude,
        lng: locationData.memberLocation.longitude,
        address: locationData.memberLocation.address,
      }
    : {
        lat: 37.4979, // 강남역 fallback
        lng: 127.0276,
        address: "강남역",
      };

  const venueLocation = locationData?.facilityLocation
    ? {
        lat: locationData.facilityLocation.latitude,
        lng: locationData.facilityLocation.longitude,
        address: locationData.facilityLocation.address,
        name: locationData.facilityLocation.address,
      }
    : {
        lat: 37.5125,
        lng: 127.1025,
        address: "롯데콘서트홀",
        name: "롯데콘서트홀",
      };

  // 교통수단별 모드 매핑 (공식)
  const byMap: Record<TransportType, "car" | "publictransit" | "foot"> = {
    car: "car",
    transit: "publictransit",
    walk: "foot",
  };

  const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

  const openKakaoMapRoute = (transportType: TransportType) => {
    const by = byMap[transportType];
    const sp = `${userLocation.lat},${userLocation.lng}`;
    const ep = `${venueLocation.lat},${venueLocation.lng}`;

    const schemeUrl = `kakaomap://route?sp=${sp}&ep=${ep}&by=${by}`;
    const webUrl = `https://m.map.kakao.com/scheme/route?sp=${sp}&ep=${ep}&by=${by}`;

    if (isMobile) {
      window.location.href = schemeUrl;
      setTimeout(() => {
        window.location.replace(webUrl);
      }, 400);
    } else {
      window.open(webUrl, "_blank", "noopener,noreferrer");
    }
  };

  // // 카카오맵 외부 링크로 이동
  // const openKakaoMapRoute = (transportType: TransportType) => {
  //   // 교통수단별 카카오맵 URL 매핑
  //   const transportModeMap = {
  //     car: "car", // 자동차
  //     transit: "publictransit", // 대중교통
  //     walk: "walk", // 도보
  //   };

  //   const mode = transportModeMap[transportType];
  //   const origin = `${userLocation.address},${userLocation.lat},${userLocation.lng}`;
  //   const destination = `${venueLocation.name},${venueLocation.lat},${venueLocation.lng}`;
  //   const url = `https://map.kakao.com/link/by/${mode}/${origin}/${destination}`;

  //   window.open(url, "_blank");
  // };

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <div className="mb-4">
          <h3 className="mb-2 text-lg font-semibold text-primary-100">
            🚗 교통 정보
          </h3>
          <p className="text-sm text-secondary-100">
            위치 정보를 불러오는 중...
          </p>
        </div>
        <div className="flex items-center justify-center h-[350px] bg-gray-200 rounded-lg">
          <div className="text-secondary-100">로딩 중...</div>
        </div>
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="p-4 space-y-4">
        <div className="mb-4">
          <h3 className="mb-2 text-lg font-semibold text-primary-100">
            🚗 교통 정보
          </h3>
          <p className="text-sm text-red-500">
            위치 정보를 불러올 수 없습니다.
          </p>
        </div>
        <div className="flex items-center justify-center h-[350px] bg-gray-200 rounded-lg">
          <div className="text-red-500">위치 정보 로딩 실패</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* 제목 */}
      {performanceDetail?.hasPublicParking && (
        <div className="mb-4">
          <p className="text-sm text-gray-900 body-hak-r bg-yellow-200 rounded-[10px] p-2 inline-block">
            자체 주차장이 있는 공연장이에요
          </p>
        </div>
      )}

      {/* 교통수단 선택 */}
      <div className="mb-4">
        <h4 className="mb-3 body-hak-b text-primary-100">교통수단 선택</h4>
        <div className="grid grid-cols-3 gap-2">
          {transportOptions.map((option) => (
            <button
              key={option.type}
              onClick={() => {
                setSelectedTransport(option.type);
                openKakaoMapRoute(option.type);
              }}
              className={`p-3 bg-gray-200 rounded-lg border-2 transition-all border-tertiary-100 text-secondary-100`}
            >
              {/* ${
                selectedTransport === option.type
                  ? "border-green-200 bg-green-200/10 text-green-100"
                  : "border-tertiary-100 bg-gray-200 text-secondary-100"
              } */}
              <div className="text-center">
                <div className="mb-1 text-2xl">{option.icon}</div>
                <div className="text-xs font-medium">{option.label}</div>
                {/* <div className="mt-1 text-xs text-secondary-100">
                  {option.description}
                </div> */}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 지도 영역 */}
      <div className="overflow-hidden bg-gray-200 rounded-lg border border-tertiary-100">
        <div className="p-3 border-b bg-beige-200 border-tertiary-100">
          <h4 className="text-sm font-medium text-primary-100">📍 위치 정보</h4>
        </div>
        <div className="w-full h-[350px]">
          <KakaoMap
            width="100%"
            height="350px"
            lat={(userLocation.lat + venueLocation.lat) / 2} // 두 지점의 중간점
            lng={(userLocation.lng + venueLocation.lng) / 2}
            startLat={userLocation.lat}
            startLng={userLocation.lng}
            endLat={venueLocation.lat}
            endLng={venueLocation.lng}
          />
        </div>
      </div>
    </div>
  );
};
