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
    console.log("🗺️ KakaoMap 컴포넌트 마운트됨");
    console.log("window.kakao:", window.kakao);
    console.log(
      "환경 변수 VITE_KAKAO_API_KEY:",
      import.meta.env.VITE_KAKAO_API_KEY
    );

    // 카카오 객체가 존재하는지 확인
    if (typeof window !== "undefined") {
      if (window.kakao && window.kakao.maps) {
        console.log("✅ 카카오맵 스크립트 로드 완료");
        setIsReady(true);
      } else {
        console.log("❌ 카카오맵 스크립트를 찾을 수 없음");
        console.log("현재 페이지의 스크립트 태그들:");
        const scripts = document.querySelectorAll('script[src*="kakao"]');
        console.log("카카오 스크립트 태그 개수:", scripts.length);
        scripts.forEach((script, index) => {
          console.log(`스크립트 ${index + 1}:`, script.src);
        });

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
          <p className="text-red-600 text-sm font-semibold">{error}</p>
          <p className="text-red-500 text-xs mt-2">
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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-blue-600 text-sm">지도를 불러오는 중...</p>
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
