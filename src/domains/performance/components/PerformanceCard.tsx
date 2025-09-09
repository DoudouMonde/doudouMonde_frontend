import { BabyIcon, BearIcon, RestroomIcon } from "@/assets/icons";
import { FacilityIcon, PerformanceItem } from "@/domains/performance/types";
import { getSidoLabel } from "@/shared/services/address";

// Props 타입
type Props = {
  performance: PerformanceItem;
  onPress: (performanceId: number) => void;
};
// 시설 아이콘 렌더링
const renderFacilityIcon = (facility: FacilityIcon) => {
  const iconMap = {
    restroom: "🚻",
    baby: "👶",
    playroom: "🎮",
  };

  return (
    <div
      key={facility}
      className="w-[18px] h-[14px] bg-secondary-400 rounded-lg mr-1 justify-center items-center"
    >
      <p className="text-[8px]">{iconMap[facility]}</p>
    </div>
  );
};
export default function PerformanceCard({ performance, onPress }: Props) {
  console.log(performance);
  return (
    <li
      onClick={() => onPress(performance.performanceId)}
      className="w-[124px] flex flex-col gap-2"
    >
      {/* 포스터 */}
      <div className="w-[124px] h-[177px] rounded-xl relative">
        <img
          src={performance.postUrl}
          alt={performance.performanceName + "이미지"}
          className="w-full h-full"
        />
        <div className="flex absolute bottom-0 left-0 gap-1 items-center px-2 py-2 w-full h-6 rounded-b-xl bg-secondary-100">
          {performance.hasRestRoom && (
            <div className="flex justify-center items-center w-4 h-4">
              <RestroomIcon className="w-full h-full text-yellow-100" />
            </div>
          )}
          {performance.hasNursingRoom && (
            <div className="flex justify-center items-center w-4 h-4">
              <BabyIcon className="w-full h-full text-yellow-100" />
            </div>
          )}
          {performance.hasPlayRoom && (
            <div className="flex justify-center items-center w-4 h-[14px]">
              <BearIcon className="w-full h-full text-yellow-100" />
            </div>
          )}
        </div>
      </div>

      {/* 제목과 위치 */}
      <div className="flex flex-col">
        <p className="subtitle text-secondary-100">
          {getSidoLabel(performance.sido)}
        </p>
        <p className="body-inter">{performance.performanceName}</p>
      </div>
    </li>
  );
}
