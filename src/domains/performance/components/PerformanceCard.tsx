import { BabyIcon, BearIcon, RestroomIcon } from "@/assets/icons";
import { PerformanceItem } from "@/domains/performance/types";
import { DUMMY_IMAGES } from "@/shared/constants";
import { getGenreLabel } from "@/shared/services";
import { getSidoLabel } from "@/shared/services/address";

// Props 타입
type Props = {
  performance: PerformanceItem;
  onClick?: (performanceId: number) => void;
};

export default function PerformanceCard({ performance, onClick }: Props) {
  return (
    <li
      onClick={() => onClick?.(performance.performanceId)}
      className="w-[124px] flex flex-col gap-2"
    >
      {/* 포스터 */}
      <div className="w-[124px] h-[177px] rounded-xl relative">
        <img
          src={performance.posterUrl || DUMMY_IMAGES.PERFORMANCE}
          alt={performance.performanceName + "이미지"}
          className="w-full h-full rounded-xl"
        />
        {/* 배경 레이어 (투명도 적용) */}
        {/* <div className="flex absolute bottom-0 left-0 w-full h-6 rounded-b-xl bg-secondary-100/80"></div> */}
      </div>

      {/* 제목과 위치 */}
      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <p className="subtitle text-secondary-100">
            {getSidoLabel(performance.sido)}
          </p>
          {/* <p className="text-red-100 subtitle">
            {getGenreLabel(performance.genre)}
          </p> */}

          {/* 아이콘 레이어 (투명도 적용 안됨) */}
          {/* <div className="flex absolute bottom-0 left-0 gap-1 items-center px-2 py-2 w-full h-6 rounded-b-xl"> */}
          <div className="flex gap-1 items-center pr-3">
            {performance.hasRestRoom && (
              <div className="flex justify-center items-center w-4 h-4">
                <RestroomIcon className="w-full h-full text-yellow-500" />
              </div>
            )}
            {performance.hasNursingRoom && (
              <div className="flex justify-center items-center w-4 h-4">
                <BabyIcon className="w-full h-full text-yellow-500" />
              </div>
            )}
            {performance.hasPlayRoom && (
              <div className="flex justify-center items-center w-4 h-[14px]">
                <BearIcon className="w-full h-full text-yellow-500" />
              </div>
            )}
          </div>
          {/* </div> */}
        </div>
        <p className="body-inter-r">{performance.performanceName}</p>
      </div>
    </li>
  );
}
