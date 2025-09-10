import { PerformanceDetail } from "@/domains/performance/types";

type Props = {};

export const TransportSection = ({}: Props) => {
  return (
    <div className="p-4">
      <iframe
        src="https://map.kakao.com/?sName=서울역&eName=강남역"
        width="600"
        height="450"
        loading="lazy"
      ></iframe>
    </div>
  );
};
