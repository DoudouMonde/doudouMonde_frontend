import { useEffect, useRef, useState } from "react";

type Props = {
  width: string;
  height: string;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  startName: string;
  endName: string;
  transportType: "car" | "transit" | "walk";
};

export default function KakaoRouteMap({
  width,
  height,
  startLat,
  startLng,
  endLat,
  endLng,
  startName,
  endName,
  transportType,
}: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const initializeMap = () => {
      try {
        if (!window.kakao || !window.kakao.maps) {
          setError("카카오맵 SDK가 로드되지 않았습니다.");
          return;
        }

        // 지도 초기화
        const mapContainer = mapRef.current;
        const mapOption = {
          center: new window.kakao.maps.LatLng(
            (startLat + endLat) / 2, // 중점 계산
            (startLng + endLng) / 2
          ),
          level: 5,
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        // 출발지 마커
        const startPosition = new window.kakao.maps.LatLng(startLat, startLng);
        const startMarker = new window.kakao.maps.Marker({
          position: startPosition,
          map: map,
        });

        // 출발지 정보창
        const startInfoWindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px; font-size:12px; color: #333;">
            <strong>🚩 ${startName}</strong><br/>
            출발지
          </div>`,
        });
        startInfoWindow.open(map, startMarker);

        // 도착지 마커
        const endPosition = new window.kakao.maps.LatLng(endLat, endLng);
        const endMarker = new window.kakao.maps.Marker({
          position: endPosition,
          map: map,
        });

        // 도착지 정보창
        const endInfoWindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px; font-size:12px; color: #333;">
            <strong>🎯 ${endName}</strong><br/>
            목적지
          </div>`,
        });
        endInfoWindow.open(map, endMarker);

        // 직선 경로 그리기 (실제 경로는 아니지만 시각적 효과)
        const linePath = [startPosition, endPosition];
        const polyline = new window.kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 4,
          strokeColor:
            transportType === "car"
              ? "#007bff"
              : transportType === "transit"
              ? "#28a745"
              : "#fd7e14",
          strokeOpacity: 0.8,
          strokeStyle: transportType === "walk" ? "shortdash" : "solid",
        });
        polyline.setMap(map);

        // 지도 영역 조정
        const bounds = new window.kakao.maps.LatLngBounds();
        bounds.extend(startPosition);
        bounds.extend(endPosition);
        map.setBounds(bounds);

        setIsMapReady(true);
      } catch (err) {
        console.error("카카오맵 초기화 오류:", err);
        setError("지도를 초기화할 수 없습니다.");
      }
    };

    // 카카오맵 SDK 로드 확인
    if (window.kakao && window.kakao.maps) {
      initializeMap();
    } else {
      const checkKakao = setInterval(() => {
        if (window.kakao && window.kakao.maps) {
          clearInterval(checkKakao);
          initializeMap();
        }
      }, 100);

      setTimeout(() => {
        clearInterval(checkKakao);
        if (!window.kakao || !window.kakao.maps) {
          setError("카카오맵 SDK 로드 시간이 초과되었습니다.");
        }
      }, 5000);
    }
  }, [startLat, startLng, endLat, endLng, startName, endName, transportType]);

  if (error) {
    return (
      <div
        style={{ width, height }}
        className="flex justify-center items-center bg-red-50 rounded-lg border border-red-200"
      >
        <div className="p-4 text-center">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!isMapReady) {
    return (
      <div
        style={{ width, height }}
        className="flex justify-center items-center bg-gray-100 rounded-lg border border-gray-200"
      >
        <div className="text-center">
          <div className="mx-auto mb-2 w-8 h-8 rounded-full border-b-2 border-blue-600 animate-spin"></div>
          <p className="text-sm text-gray-600">경로 지도를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width, height }} className="relative">
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />

      {/* 경로 정보 오버레이 */}
      <div className="absolute top-2 left-2 px-3 py-2 text-xs bg-white rounded-lg shadow-lg">
        <div className="flex gap-2 items-center">
          <div
            className={`w-3 h-3 rounded-full ${
              transportType === "car"
                ? "bg-blue-500"
                : transportType === "transit"
                ? "bg-green-500"
                : "bg-orange-500"
            }`}
          />
          <span className="font-medium">
            {transportType === "car" && "자동차"}
            {transportType === "transit" && "대중교통"}
            {transportType === "walk" && "도보"}
          </span>
          경로
        </div>
      </div>
    </div>
  );
}
