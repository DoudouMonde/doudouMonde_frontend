import { useEffect } from "react";
import { useReviewStore } from "@/stores/reviewStore";

export const useHydrateReviewFromStorage = () => {
  const { setSelectedDate, setSelectedPerformance } = useReviewStore();

  useEffect(() => {
    const savedDate = localStorage.getItem("selectedDate");
    if (savedDate) {
      const date = new Date(savedDate);
      setSelectedDate(date.toLocaleDateString("ko-KR"));
    }

    const savedPerformance = localStorage.getItem("selectedPerformance");
    if (savedPerformance) {
      try {
        const performanceData = JSON.parse(savedPerformance);
        setSelectedPerformance({
          id: performanceData.id,
          title: performanceData.title,
        });
      } catch (error) {
        console.error("공연 데이터 파싱 오류:", error);
      }
    }
  }, [setSelectedDate, setSelectedPerformance]);
};
