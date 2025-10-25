import { ReviewPerformanceInfo } from "@/shared/components/Review/ReviewPerformanceInfo";
import { useReviewStore } from "@/stores/reviewStore";

type DescProps = {
  content: React.ReactNode;
};

export const Desc = ({ content }: DescProps) => {
  // 공연 정보 (전시용)
  const { selectedDate, selectedPerformance } = useReviewStore();

  return (
    <header className="flex flex-col pt-2">
      <p className="subtitle text-secondary-100">{content}</p>

      {/* 공연명, 관람날짜 */}
      <ReviewPerformanceInfo
        title={selectedPerformance?.title ?? null}
        date={selectedDate ?? null}
      />
    </header>
  );
};
