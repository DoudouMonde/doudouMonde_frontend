import { useState } from "react";
import KakaoMap from "@/shared/components/KakaoMap";

type Props = {
  // 공연장 정보를 받을 수 있도록 확장
  venueName?: string;
  venueLat?: number;
  venueLng?: number;
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

export const TransportSection = ({
  venueName = "롯데콘서트홀",
  venueLat = 37.5125,
  venueLng = 127.1025,
}: Props) => {
  const [selectedTransport, setSelectedTransport] =
    useState<TransportType>("transit");

  // 하드코딩된 출발지 (강남역 근처)
  const userLocation = {
    lat: 37.4979, // 강남역
    lng: 127.0276,
  };

  // 카카오맵 외부 링크로 이동
  const openKakaoMapRoute = (transportType: TransportType) => {
    // 교통수단별 카카오맵 URL 매핑
    const transportModeMap = {
      car: "car", // 자동차
      transit: "publictransit", // 대중교통
      walk: "walk", // 도보
    };

    const mode = transportModeMap[transportType];
    const origin = `강남역,${userLocation.lat},${userLocation.lng}`;
    const destination = `${venueName},${venueLat},${venueLng}`;
    const url = `https://map.kakao.com/link/by/${mode}/${origin}/${destination}`;

    console.log(`🗺️ 카카오맵 URL (${transportType}):`, url);
    window.open(url, "_blank");
  };

  return (
    <div className="p-4 space-y-4">
      {/* 제목 */}
      <div className="mb-4">
        <h3 className="mb-2 text-lg font-semibold text-primary-100">
          🚗 교통 정보
        </h3>
        <p className="text-sm text-secondary-100">
          {venueName}까지의 경로를 확인하세요
        </p>
      </div>

      {/* 교통수단 선택 */}
      <div className="mb-4">
        <h4 className="mb-3 text-sm font-medium text-primary-100">
          교통수단 선택
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {transportOptions.map((option) => (
            <button
              key={option.type}
              onClick={() => {
                setSelectedTransport(option.type);
                openKakaoMapRoute(option.type);
              }}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedTransport === option.type
                  ? "border-green-200 bg-green-200/10 text-green-100"
                  : "border-tertiary-100 bg-gray-200 text-secondary-100 hover:border-green-200"
              }`}
            >
              <div className="text-center">
                <div className="mb-1 text-2xl">{option.icon}</div>
                <div className="text-xs font-medium">{option.label}</div>
                <div className="mt-1 text-xs text-secondary-100">
                  {option.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 지도 영역 */}
      <div className="overflow-hidden bg-gray-200 rounded-lg border border-tertiary-100">
        <div className="p-3 border-b bg-beige-200 border-tertiary-100">
          <h4 className="text-sm font-medium text-primary-100">📍 위치 정보</h4>
          <p className="text-xs text-secondary-100">강남역 → {venueName}</p>
        </div>
        <div className="w-full h-[350px]">
          <KakaoMap
            width="100%"
            height="350px"
            lat={(userLocation.lat + venueLat) / 2} // 두 지점의 중간점
            lng={(userLocation.lng + venueLng) / 2}
            startLat={userLocation.lat}
            startLng={userLocation.lng}
            endLat={venueLat}
            endLng={venueLng}
          />
        </div>
      </div>
    </div>
  );
};
