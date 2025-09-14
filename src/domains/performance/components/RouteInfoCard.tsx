import { useState, useEffect } from "react";

type RouteInfo = {
  type: "car" | "transit" | "walk";
  duration: string;
  distance: string;
  cost?: string;
  route?: string;
  icon: string;
  color: string;
};

type Props = {
  from: { lat: number; lng: number; name?: string };
  to: { lat: number; lng: number; name: string };
};

export const RouteInfoCard = ({ from, to }: Props) => {
  const [routes, setRoutes] = useState<RouteInfo[]>([]);
  const [loading, setLoading] = useState(false);

  // 거리 계산 (직선거리)
  const calculateDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ) => {
    const R = 6371; // 지구 반지름 (km)
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // km
  };

  // 예상 경로 정보 생성 (실제 API 연동시 교체)
  const generateRouteEstimates = () => {
    setLoading(true);

    const distance = calculateDistance(from.lat, from.lng, to.lat, to.lng);

    // 강남역 → 롯데콘서트홀 실제 경로 기반 정보
    const estimates: RouteInfo[] = [
      {
        type: "transit",
        duration: "35분",
        distance: `${distance.toFixed(1)}km`,
        cost: "1,550원",
        route: "지하철 2호선 → 8호선 잠실역 → 도보 10분",
        icon: "🚌",
        color: "bg-green-50 border-green-200 text-green-700",
      },
      {
        type: "car",
        duration: "25분",
        distance: `${distance.toFixed(1)}km`,
        cost: "주차비 3,000원/시간",
        route: "테헤란로 → 올림픽대로 → 롯데월드타워",
        icon: "🚗",
        color: "bg-blue-50 border-blue-200 text-blue-700",
      },
      {
        type: "walk",
        duration: "1시간 20분",
        distance: `${distance.toFixed(1)}km`,
        route: "한강을 따라 걷는 산책로 (추천하지 않음)",
        icon: "🚶",
        color: "bg-orange-50 border-orange-200 text-orange-700",
      },
    ];

    // 로딩 시뮬레이션
    setTimeout(() => {
      setRoutes(estimates);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    if (from && to) {
      generateRouteEstimates();
    }
  }, [from, to]);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-4 border border-gray-200 rounded-lg animate-pulse"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-700 mb-3">
        📍 {from.name || "현재 위치"} → {to.name} 경로 정보
      </h4>

      {routes.map((route, index) => (
        <div
          key={index}
          className={`p-4 border-2 rounded-lg transition-all hover:shadow-md ${route.color}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{route.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">
                    {route.type === "transit" && "대중교통"}
                    {route.type === "car" && "자동차"}
                    {route.type === "walk" && "도보"}
                  </span>
                  <span className="text-sm text-gray-600">
                    약 {route.duration}
                  </span>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <div>📏 거리: {route.distance}</div>
                  {route.cost && <div>💰 비용: {route.cost}</div>}
                  {route.route && <div>🛣️ 경로: {route.route}</div>}
                </div>
              </div>
            </div>

            <button
              className="ml-2 px-3 py-1 text-xs font-medium bg-white border border-current rounded-md hover:bg-gray-50 transition-colors"
              onClick={() => {
                // 카카오맵 link/by 방식으로 길찾기 열기
                const transportModeMap = {
                  car: "car",
                  transit: "publictransit",
                  walk: "walk",
                };

                const mode = transportModeMap[route.type];
                const origin = `${from.name || "강남역"},${from.lat},${
                  from.lng
                }`;
                const destination = `${to.name},${to.lat},${to.lng}`;
                const url = `https://map.kakao.com/link/by/${mode}/${origin}/${destination}`;

                console.log(`🗺️ ${route.type} 경로:`, url);
                window.open(url, "_blank");
              }}
            >
              길찾기
            </button>
          </div>
        </div>
      ))}

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-500 text-center">
          ⏰ 실시간 교통상황에 따라 소요시간이 달라질 수 있습니다
        </p>
      </div>
    </div>
  );
};
