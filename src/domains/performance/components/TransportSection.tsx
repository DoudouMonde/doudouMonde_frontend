import { useState } from "react";
import { PerformanceDetail } from "@/domains/performance/types";
import KakaoMap from "@/shared/components/KakaoMap";
import KakaoRouteMap from "@/shared/components/KakaoRouteMap";
import { RouteInfoCard } from "./RouteInfoCard";

type Props = {
  // 공연장 정보를 받을 수 있도록 확장
  venueName?: string;
  venueAddress?: string;
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
  venueAddress = "서울특별시 송파구 올림픽로 300 롯데월드타워",
  venueLat = 37.5125,
  venueLng = 127.1025,
}: Props) => {
  const [selectedTransport, setSelectedTransport] =
    useState<TransportType>("transit");
  // 하드코딩된 출발지 (강남역 근처)
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>({
    lat: 37.4979, // 강남역
    lng: 127.0276,
  });
  const [showEmbeddedRoute, setShowEmbeddedRoute] = useState(false);
  const [currentRouteUrl, setCurrentRouteUrl] = useState<string>("");

  // 현재 위치 가져오기
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("위치 정보를 가져올 수 없습니다:", error);
          alert(
            "위치 정보를 가져올 수 없습니다. 브라우저 설정을 확인해주세요."
          );
        }
      );
    } else {
      alert("이 브라우저는 위치 서비스를 지원하지 않습니다.");
    }
  };

  // 카카오맵 경로를 임베드로 표시
  const showEmbeddedKakaoMapRoute = (transportType: TransportType) => {
    // 교통수단별 카카오맵 URL 매핑
    const transportModeMap = {
      car: "car", // 자동차
      transit: "publictransit", // 대중교통
      walk: "walk", // 도보
    };

    const mode = transportModeMap[transportType];

    if (userLocation) {
      // link/by 방식: 출발지와 도착지 포함
      const origin = `강남역,${userLocation.lat},${userLocation.lng}`;
      const destination = `${venueName},${venueLat},${venueLng}`;
      const url = `https://map.kakao.com/link/by/${mode}/${origin}/${destination}`;

      console.log(`🗺️ 임베드 카카오맵 URL (${transportType}):`, url);
      setCurrentRouteUrl(url);
      setShowEmbeddedRoute(true);
    } else {
      // 출발지가 없으면 기본 to 방식 사용
      const destination = `${venueName},${venueLat},${venueLng}`;
      const url = `https://map.kakao.com/link/to/${destination}`;

      console.log(`🗺️ 임베드 카카오맵 URL (목적지만):`, url);
      setCurrentRouteUrl(url);
      setShowEmbeddedRoute(true);
    }
  };

  // 외부 카카오맵에서 열기
  const openExternalKakaoMap = () => {
    if (currentRouteUrl) {
      window.open(currentRouteUrl, "_blank");
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* 제목 */}
      <div className="mb-4">
        <h3 className="mb-2 text-lg font-semibold text-gray-800">
          🚗 교통 정보
        </h3>
        <p className="text-sm text-gray-600">
          {venueName}까지의 경로를 확인하세요
        </p>
      </div>
      {/* 현재 위치 설정 버튼 */}
      <div className="mb-4">
        <button
          onClick={getCurrentLocation}
          className="flex gap-2 items-center px-4 py-2 text-white bg-blue-500 rounded-lg transition-colors hover:bg-blue-600"
        >
          📍 현재 위치 설정
        </button>
        {userLocation && (
          <p className="mt-1 text-xs text-green-600">
            ✅ 현재 위치가 설정되었습니다
          </p>
        )}
      </div>
      {/* 교통수단 선택 */}
      <div className="mb-4">
        <h4 className="mb-3 text-sm font-medium text-gray-700">
          교통수단 선택
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {transportOptions.map((option) => (
            <button
              key={option.type}
              onClick={() => setSelectedTransport(option.type)}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedTransport === option.type
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
              }`}
            >
              <div className="text-center">
                <div className="mb-1 text-2xl">{option.icon}</div>
                <div className="text-xs font-medium">{option.label}</div>
                <div className="mt-1 text-xs text-gray-500">
                  {option.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* 경로 정보 카드 */}
      {userLocation && (
        <div className="mb-4">
          <RouteInfoCard
            from={{
              lat: userLocation.lat,
              lng: userLocation.lng,
              name: "현재 위치",
            }}
            to={{
              lat: venueLat,
              lng: venueLng,
              name: venueName,
            }}
          />
        </div>
      )}
      {/* 길찾기 버튼들 */}
      <div className="mb-4 space-y-2">
        <button
          onClick={() => showEmbeddedKakaoMapRoute(selectedTransport)}
          className="flex gap-2 justify-center items-center px-4 py-3 w-full font-medium text-black bg-yellow-400 rounded-lg transition-colors hover:bg-yellow-500"
        >
          <span className="text-lg">🗺️</span>
          {
            transportOptions.find((opt) => opt.type === selectedTransport)
              ?.label
          }{" "}
          경로 보기
        </button>

        {showEmbeddedRoute && (
          <button
            onClick={openExternalKakaoMap}
            className="flex gap-2 justify-center items-center px-3 py-2 w-full text-sm font-medium text-blue-600 bg-blue-50 rounded-lg border border-blue-200 transition-colors hover:bg-blue-100"
          >
            <span className="text-sm">🔗</span>
            카카오맵 앱에서 열기
          </button>
        )}
      </div>
      {/* 임베드된 경로 지도 */}
      {showEmbeddedRoute && (
        <div className="overflow-hidden mb-4 bg-white rounded-lg border border-gray-200">
          <div className="p-3 bg-blue-50 border-b border-blue-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-sm font-medium text-blue-800">
                  🛣️{" "}
                  {
                    transportOptions.find(
                      (opt) => opt.type === selectedTransport
                    )?.label
                  }{" "}
                  경로
                </h4>
                <p className="text-xs text-blue-600">강남역 → {venueName}</p>
              </div>
              <button
                onClick={() => setShowEmbeddedRoute(false)}
                className="px-2 py-1 text-xs text-blue-600 rounded transition-colors hover:bg-blue-100"
              >
                ✕ 닫기
              </button>
            </div>
          </div>
          <div className="w-full h-[400px]">
            <KakaoRouteMap
              width="100%"
              height="400px"
              startLat={userLocation?.lat || 37.4979}
              startLng={userLocation?.lng || 127.0276}
              endLat={venueLat}
              endLng={venueLng}
              startName="강남역"
              endName={venueName}
              transportType={selectedTransport}
            />
          </div>
        </div>
      )}
      {/* 기본 지도 영역
      <div className="overflow-hidden bg-white rounded-lg border border-gray-200">
        <div className="p-3 bg-gray-50 border-b border-gray-200">
          <h4 className="text-sm font-medium text-gray-700">
            📍 {venueName} 위치
          </h4>
          <p className="text-xs text-gray-500">{venueAddress}</p>
        </div>
        <div className="w-full h-[300px]">
          <KakaoMap width="100%" height="300px" lat={venueLat} lng={venueLng} />
        </div>
      </div> */}
      {/* 추가 정보 */}
      {/* <div className="p-3 mt-4 bg-gray-50 rounded-lg">
        <h4 className="mb-2 text-sm font-medium text-gray-700">💡 이용 팁</h4>
        <ul className="space-y-1 text-xs text-gray-600">
          <li>• 대중교통 이용시 지하철역에서 도보 5분 거리입니다</li>
          <li>• 자동차 이용시 인근 공영주차장을 이용하세요</li>
          <li>• 공연 시작 30분 전 도착을 권장합니다</li>
        </ul>
      </div> */}
    </div>
  );
};
