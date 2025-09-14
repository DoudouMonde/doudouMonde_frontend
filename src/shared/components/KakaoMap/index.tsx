import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

type Props = {
  width: string;
  height: string;
  lat: number;
  lng: number;
};

export default function KakaoMap({ width, height, lat, lng }: Props) {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 카카오 객체가 존재하는지 확인
    if (typeof window !== "undefined") {
      if (window.kakao && window.kakao.maps) {
        setIsReady(true);
      } else {
        const scripts = document.querySelectorAll('script[src*="kakao"]');

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

  return (
    <Map center={{ lat, lng }} style={{ width, height, zIndex: 0 }}>
      <MapMarker position={{ lat, lng }} />
    </Map>
  );
}
