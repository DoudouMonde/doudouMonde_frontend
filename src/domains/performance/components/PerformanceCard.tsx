import { FacilityIcon, PerformanceItem } from "@/domains/performance/types";

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
  console.log("performance", performance);
  return (
    <div
      onClick={() => onPress(performance.performanceId)}
      className="mr-4 w-[124px]"
    >
      <p className="relative">
        {/* 포스터 */}
        <img
          src={{ uri: performance.postUrl }}
          className="w-[124px] h-[177px] bg-gray-100 rounded-lg"
          resizeMode="cover"
        />

        {/* 시설 아이콘 오버레이 */}
        {performance.playRoom ||
          performance.nursingRoom ||
          (performance.disableRestRoom && (
            <div className="absolute right-0 bottom-0 left-0">
              {/* 배경 */}
              <div className="h-[21px] bg-neutral-gray-600 rounded-b-lg" />
              {/* 아이콘들 */}
              <div className="absolute top-1 left-2 flex-row">
                {/* {performance.facilities.map((facility) =>
                  renderFacilityIcon(facility)
                )} */}
              </div>
            </div>
          ))}
      </p>

      {/* 제목과 위치 */}
      <div className="px-1 mt-2">
        <p className="text-[10px] font-semibold text-neutral-gray-400 mb-1 font-inter">
          {performance.location}
        </p>
        <p className="text-[12px] font-semibold text-black font-inter leading-[14.5px]">
          {performance.performanceName}
        </p>
      </div>
    </div>
  );
}
