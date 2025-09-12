import { PerformanceDetail } from "@/domains/performance/types";
import KakaoMap from "@/shared/components/KakaoMap";

type Props = {};

export const TransportSection = ({}: Props) => {
  return (
    <div className="p-4">
      {/* <iframe
        className="w-full h-full"
        src="https://map.kakao.com/?sName=서울역&eName=강남역"
        loading="lazy"
      ></iframe> */}
      <KakaoMap width="85%" height="20dvh" lat={37.501389} lng={126.978} />
    </div>
  );
};
