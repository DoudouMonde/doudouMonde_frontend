import React, { useEffect, useState } from "react";
import { ReviewPerformanceInfo } from "@/shared/components/Review/ReviewPerformanceInfo";
import { PhotoGridUploader } from "@/shared/components/Review/UploadPhoto";
import { ReviewMemoTextarea } from "@/shared/components/Review/ReviewMemoTextare";
import { NewReviewData } from "@/pages/review/ReviewFunnelPage";

type PhototextReviewProps = {
  data: {
                      performanceName: string,
                  children: string[],
                  watchDate: string,
                  reviewText: string,
                  uploadedImages: File[],

  }
  onChange: (patch: {
    uploadedImages: (File | null)[];
    reviewText: string;
  }) => void;
  onValidityChange?: (ok: boolean) => void;
};

export const PhototextReview = ({
  data,
  onChange,
  onValidityChange,
}:PhototextReviewProps ) => {
  const [uploadedImages, setUploadedImages] = useState<(File | null)[]>(
    data.uploadedImages ?? [null, null, null, null] // 기본 4칸
  );
  const [reviewText, setReviewText] = useState<string>(data.reviewText ?? "");
  // ✅ data가 바뀌면 (다시 돌아왔을 때 등) 로컬 상태도 동기화
  // useEffect(() => {
  //   if (data.uploadedImages) {
  //     setUploadedImages(data.uploadedImages);
  //   }
  //   if (data.reviewText !== undefined) {
  //     setReviewText(data.reviewText);
  //   }
  // }, [data.uploadedImages, data.reviewText]);

  // ✅ 로컬 상태가 바뀔 때마다 부모에 patch 전달 + 유효성도 함께 올리기
  // useEffect(() => {
  //   onChange({
  //     reviewText,
  //     uploadedImages,
  //   });

  //   if (onValidityChange) {
  //     const hasText = reviewText.trim().length > 0;
  //     const hasImage = uploadedImages.some((img) => img !== null);
  //     onValidityChange(hasText || hasImage); // 예: 텍스트 또는 사진 하나 이상 있으면 OK
  //   }
  // }, [reviewText, uploadedImages, onChange, onValidityChange]);

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

  //data에서 선택한 공연, 날짜 불러오기
  const selectedPerformance = data.performanceName ?? null;
  const selectedDate = data.watchDate ?? null;

  return (
    <div>
      {/* 공연명, 관람날짜 */}
      <ReviewPerformanceInfo
        title={selectedPerformance ?? null}
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
    </div>
  );
};
