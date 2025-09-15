import { Back } from "@/assets/icons";
import { usePerformanceDetailQuery } from "@/domains/performance/queries";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export const PerformanceHeader = () => {
  const navigate = useNavigate();
  const { performanceId } = useParams();

  const { data: performanceDetail } = usePerformanceDetailQuery(
    Number(performanceId),
    {
      enabled: !!performanceId,
    }
  );

  const handleBackClick = () => {
    navigate("/");
  };

  if (!performanceDetail) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full h-[60px] bg-white/70 bg-gray-200">
      <div className="flex justify-between items-center px-6 w-full h-full">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={handleBackClick}
          className="flex justify-center items-center w-6 h-6 text-black transition-transform active:scale-95"
          aria-label="뒤로가기"
        >
          <Back className="w-6 h-6" />
        </button>

        {/* 공연 제목 */}
        <h1 className="flex-1 text-center text-black font-bold text-base leading-[19px] font-inter">
          {performanceDetail.performanceName}
        </h1>

        {/* 오른쪽 공간 (제목 중앙 정렬을 위한 빈 공간) */}
        <div className="w-6 h-6" />
      </div>
    </header>
  );
};
