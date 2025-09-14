import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

type Props = {
  width: string;
  height: string;
  lat: number;
  lng: number;
  // 출발지와 도착지 정보 (옵셔널)
  startLat?: number;
  startLng?: number;
  endLat?: number;
  endLng?: number;
};

export default function KakaoMap({
  width,
  height,
  lat,
  lng,
  startLat,
  startLng,
  endLat,
  endLng,
}: Props) {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 카카오 객체가 존재하는지 확인
    if (typeof window !== "undefined") {
      if (window.kakao && window.kakao.maps) {
        setIsReady(true);
      } else {
        // 타이머로 주기적으로 확인
        const checkKakao = setInterval(() => {
          console.log("🔄 카카오맵 로딩 상태 확인 중...");
          if (window.kakao && window.kakao.maps) {
            console.log("✅ 카카오맵 스크립트 로드 완료 (지연)");
            setIsReady(true);
            clearInterval(checkKakao);
          }
        }, 500);

        // 10초 후에도 로드되지 않으면 에러 처리
        const timeout = setTimeout(() => {
          if (!window.kakao || !window.kakao.maps) {
            console.log("❌ 카카오맵 로딩 타임아웃");
            setError("카카오맵을 불러올 수 없습니다.");
            clearInterval(checkKakao);
          }
        }, 10000);

        return () => {
          clearInterval(checkKakao);
          clearTimeout(timeout);
        };
      }
    }
  }, []);

  if (error) {
    return (
      <div
        style={{ width, height }}
        className="flex justify-center items-center bg-red-50 rounded border border-red-300"
      >
        <div className="p-4 text-center">
          <p className="text-sm font-semibold text-red-600">{error}</p>
          <p className="mt-2 text-xs text-red-500">
            개발자 도구(F12) → Console 탭에서 자세한 로그를 확인하세요.
          </p>
        </div>
      </div>
    );
  }

  if (!isReady) {
    return (
      <div
        style={{ width, height }}
        className="flex justify-center items-center bg-blue-50 rounded border border-blue-300"
      >
        <div className="text-center">
          <div className="mx-auto mb-2 w-8 h-8 rounded-full border-b-2 border-blue-600 animate-spin"></div>
          <p className="text-sm text-blue-600">지도를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 두 마커가 있을 때 적절한 지도 레벨 계산
  const calculateMapLevel = () => {
    if (startLat && startLng && endLat && endLng) {
      const latDiff = Math.abs(startLat - endLat);
      const lngDiff = Math.abs(startLng - endLng);
      const maxDiff = Math.max(latDiff, lngDiff);

      // 거리에 따른 지도 레벨 설정
      if (maxDiff > 0.1) return 10; // 매우 먼 거리
      if (maxDiff > 0.05) return 8; // 먼 거리
      if (maxDiff > 0.02) return 6; // 중간 거리
      if (maxDiff > 0.01) return 5; // 가까운 거리
      return 4; // 매우 가까운 거리
    }
    return 3; // 기본 레벨
  };

  return (
    <Map
      center={{ lat, lng }}
      style={{ width, height, zIndex: 0 }}
      level={calculateMapLevel()}
    >
      {/* 출발지 마커 (고양이 아이콘) */}
      {startLat && startLng && (
        <MapMarker
          position={{ lat: startLat, lng: startLng }}
          image={{
            src:
              "data:image/svg+xml;base64," +
              btoa(`
              <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 0C7.163 0 0 7.163 0 16c0 16 16 24 16 24s16-8 16-24C32 7.163 24.837 0 16 0z" fill="#3DCCA3"/>
                <circle cx="16" cy="16" r="12" fill="white"/>
                <g transform="translate(4, 6) scale(0.13)">
                  <ellipse cx="90.5" cy="96.5" fill="#FBE9CC" rx="82.5" ry="67.5"/>
                  <path fill="#FBE9CC" d="m32.05 11.046 21.143 10.297 21.5 19-51.5 31v-31zM152.505 11.046l-21.143 10.297-21.5 19 51.501 31-.001-31z"/>
                  <path fill="#000" d="M100.533 99.033c1.059 1.016 1.304 1.866 1.371 3.301-.047 1.79-.809 3.11-2.01 4.403a19 19 0 0 1-4.494 3.108c-.094 1.934.291 3.72 1.553 5.242 1.684 1.592 3.676 2.214 5.956 2.189 1.773-.148 3.605-.76 4.917-1.995.836-1.062 1.263-2.164 1.61-3.456.236-.736.644-1.196 1.253-1.653.929-.283 1.723-.226 2.621.085.671.457.962.792 1.311 1.529.372 2.133-.595 4.194-1.768 5.917-2.044 2.722-5.168 4.444-8.522 4.956-3.729.23-7.296-.419-10.213-2.906a36 36 0 0 1-1.63-1.56l-.265.292c-2.605 2.752-6.042 4.148-9.807 4.259-3.506-.032-6.542-1.38-9.034-3.833-1.875-1.95-2.922-3.985-2.9-6.708.1-.91.337-1.2 1.038-1.776.747-.477 1.424-.401 2.275-.326.625.186.955.444 1.414.909.194.479.34.913.473 1.407.554 1.827 1.3 2.974 2.942 3.98 1.99 1.036 4.097 1.108 6.244.51 1.902-.653 3.36-1.627 4.259-3.458.417-1.212.502-2.53.643-3.798l-.505-.145c-2.323-.859-4.6-2.883-5.708-5.097-.536-1.404-.628-2.889-.032-4.288.933-1.534 2.546-2.257 4.215-2.684 3.947-.863 9.483-1.085 12.793 1.596"/>
                  <path fill="#000" d="M62.77 85.503c1.91 1.02 3.201 2.672 3.884 4.733.59 2.55.488 5.434-.886 7.693-.976 1.363-2.25 2.682-3.956 2.985-1.934.219-3.292-.092-4.846-1.256-1.58-1.408-2.434-3.573-2.58-5.647-.109-2.643.393-5.042 2.184-7.076 1.703-1.739 3.828-2.412 6.2-1.432M126.949 85.491c2.031 1.256 3.055 3.143 3.645 5.396.472 2.368.195 4.99-1.036 7.09-.971 1.394-2.208 2.499-3.871 2.937-1.659.17-3.032.063-4.375-.956-1.778-1.518-2.835-3.11-3.038-5.482-.168-2.912.241-5.248 2.171-7.54.375-.397.708-.654 1.165-.972l.316-.23c1.403-.873 3.526-.918 5.023-.243"/>
                </g>
              </svg>
            `),
            size: { width: 32, height: 40 },
            options: { offset: { x: 16, y: 40 } },
          }}
        />
      )}

      {/* 도착지 마커 (공룡 아이콘) */}
      {endLat && endLng && (
        <MapMarker
          position={{ lat: endLat, lng: endLng }}
          image={{
            src:
              "data:image/svg+xml;base64," +
              btoa(`
              <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 0C7.163 0 0 7.163 0 16c0 16 16 24 16 24s16-8 16-24C32 7.163 24.837 0 16 0z" fill="#FF6060"/>
                <circle cx="16" cy="16" r="12" fill="white"/>
                <g transform="translate(4, 5) scale(0.11)">
                  <path fill="#ECECEB" d="M166 86.5c19.5 55-32.235 47-72 47s-90-3-74.5-47c0-28.443 34.736-56 74.5-56s72 27.557 72 56"/>
                  <path fill="#ECECEB" d="M178 134.5c0 30.652-38.951 55.5-87 55.5S4 165.152 4 134.5 42.951 54 91 54s87 49.848 87 80.5"/>
                  <path fill="#3A9592" d="M145.758 28.893c.603 1.236.314 3.074.318 4.456l.002.597a79 79 0 0 1-.531 9.185l-.064.56c-.202 1.737-.46 3.392-.934 5.077-.083 1.205.056 2.105.483 3.23a167 167 0 0 1-2.793-2.175c-5.095-4.053-10.756-7.21-16.622-9.923-.669-.325-.669-.325-1.395-.822l.562-.266c1.809-.891 3.506-1.89 5.2-2.994 10.853-7.023 10.853-7.023 15.774-6.925M92.745 5.267c1.662.64 2.437 2.106 3.396 3.464l.405.57c4.411 6.292 7.918 13.305 10.34 20.495l.261.775q.237.717.455 1.44c.491 1.514 1.035 2.182 2.408 3.1v.266a74 74 0 0 1-4.268-.526c-8.799-1.295-17.97-1.473-26.733.138-.984.171-1.969.283-2.963.388l.778-.732c1.172-1.293 1.566-2.741 2.07-4.348 2.85-8.521 7.044-18.622 13.851-25.03"/>
                  <path fill="#000" d="M60.149 142.326c1.517.796 2.31 2.235 3.173 3.655 3.711 5.753 10.767 8.547 17.135 10.135l.71.18c3.802.9 7.682 1.057 11.575 1.04l.619-.002c3.19-.011 6.289-.158 9.423-.796l.628-.122c6.61-1.304 14.371-4.328 18.288-10.162q.478-.72.935-1.452c.683-1.082 1.379-1.89 2.55-2.476 1.2-.132 2.143-.131 3.237.406.929.839 1.374 1.487 1.475 2.74-.134 3.021-2.535 5.355-4.471 7.453l-.452.503c-6.767 7.191-17.96 10.519-27.54 10.891-1.565.04-3.128.041-4.692.032l-.832-.002c-5.933-.023-11.415-.64-17.068-2.512l-.5-.159c-4.194-1.354-8.438-3.464-11.785-6.345l-.639-.547c-.6-.53-1.187-1.071-1.77-1.621l-.5-.454c-1.834-1.725-4.243-4.446-4.337-7.087.074-1.206.32-1.964 1.224-2.816 1.143-.691 2.319-.709 3.614-.482"/>
                  <path fill="#000" d="M110.01 125.224c1.066.533 1.733 1.192 2.409 2.168.468 1.406.351 2.729-.218 4.078-1.084 2.045-2.762 3.729-4.871 4.699-1.409.275-2.469.276-3.684-.512-.886-.737-1.253-1.498-1.452-2.599-.143-2.198.827-4.044 2.125-5.772 1.666-1.625 3.362-2.324 5.691-2.062M77.783 125.4c2.23 1.047 3.691 2.701 4.617 4.973.265 1.54.442 2.939-.272 4.365-.907 1.009-1.596 1.489-2.965 1.656-1.851-.176-3.5-1.197-4.803-2.499-1.452-1.881-2.232-3.611-1.927-6.022.32-.955.858-1.587 1.596-2.273 1.25-.578 2.439-.635 3.754-.2"/>
                </g>
              </svg>
            `),
            size: { width: 32, height: 40 },
            options: { offset: { x: 16, y: 40 } },
          }}
        />
      )}

      {/* 단일 마커 (기본 위치) */}
      {(!startLat || !startLng || !endLat || !endLng) && (
        <MapMarker position={{ lat, lng }} />
      )}
    </Map>
  );
}
