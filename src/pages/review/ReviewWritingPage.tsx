import React, { useEffect } from "react";
import { useReviewStore } from "@/stores/reviewStore";
import { ReviewContainer } from "@/shared/components/Layout/ReviewContainer";
import { ReviewPerformanceInfo } from "@/shared/components/Review/ReviewPerformanceInfo";
import { PhotoGridUploader } from "@/shared/components/Review/UploadPhoto";
import { ReviewMemoTextarea } from "@/shared/components/Review/ReviewMemoTextare";

export const ReviewWritingPage = () => {
  // const navigate = useNavigate();
  const {
    reviewText,
    uploadedImages,
    selectedDate,
    selectedPerformance,
    setReviewText,
    setUploadedImages,
    setSelectedDate,
    setSelectedPerformance,
  } = useReviewStore();

  // localStorage에서 선택된 날짜, 아이들, 공연 정보 불러오기
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
        // SelectPerformancePage에서 저장한 데이터를 reviewStore의 PerformanceData 형태로 변환
        setSelectedPerformance({
          id: performanceData.id,
          title: performanceData.title,
        });
        console.log("저장된 공연 데이터:", performanceData);
        console.log("변환된 공연 데이터:", {
          id: performanceData.id,
          title: performanceData.title,
        });
      } catch (error) {
        console.error("공연 데이터 파싱 오류:", error);
      }
    }
  }, [setSelectedDate, setSelectedPerformance]);

  const handleImageUpload = (index: number, file: File) => {
    const newImages = [...uploadedImages];
    newImages[index] = file;
    setUploadedImages(newImages);
  };

  const handleImageRemove = (index: number) => {
    const newImages = [...uploadedImages];
    newImages[index] = null;
    setUploadedImages(newImages);
  };

  return (
    <ReviewContainer title="후기 입력">
      {/* 공연명, 관람날짜 */}
      <ReviewPerformanceInfo
        title={selectedPerformance?.title ?? null}
        date={selectedDate ?? null}
      />

      {/* 사진 업로드 섹션 */}
      <div className="mb-8">
        <h2 className="mb-4 subtitle-b">사진 등록</h2>

        <PhotoGridUploader
          images={uploadedImages}
          onUpload={handleImageUpload}
          onRemove={handleImageRemove}
          slots={4} // 그리드 칸 수
          columns={2} // 2열 그리드
          accept="image/*"
          uploadLabel="사진 추가"
          square // true면 정사각형 칸 유지
        />
      </div>

      {/* 후기 텍스트 섹션 */}
      <ReviewMemoTextarea
        value={reviewText}
        onChange={(next) => setReviewText(next)}
        label="메모"
        placeholder="오랫동안 추억할 수 있게 간단한 메모를 남겨주세요."
        maxLength={300}
      />
    </ReviewContainer>
  );
};
