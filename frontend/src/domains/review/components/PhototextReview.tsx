import React, { useEffect, useState } from "react";
import { ReviewPerformanceInfo } from "@/shared/components/Review/ReviewPerformanceInfo";
import { PhotoGridUploader } from "@/shared/components/Review/UploadPhoto";
import { ReviewMemoTextarea } from "@/shared/components/Review/ReviewMemoTextare";
import { STEP_FIELDS, StepField } from "../utils/stepConfig";
import { NewReviewData } from "@/pages/review/ReviewFunnelPage";

type PhototextData = StepField<NewReviewData, typeof STEP_FIELDS.photoTextReview>;

type PhototextReviewProps = {
  data: PhototextData,
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
  
  const uploadedImages = data.uploadedImages ?? [null, null, null, null] // 기본 4칸
  const [localText, setLocalText] = useState( data.reviewText ?? "");
  
  //data에서 선택한 공연, 날짜 불러오기
  const selectedPerformance = data.performanceName ?? null;
  const selectedDate = data.watchDate ?? null;

  const handleImageUpload = (index: number, file: File) => {
    const newImages = [...uploadedImages];
    newImages[index] = file;

    onChange({
      uploadedImages: newImages,
      reviewText : localText,
    })
    onValidityChange?.(true);
  };

  const handleImageRemove = (index: number) => {
    const newImages = [...uploadedImages];
    newImages[index] = null;

    onChange({
      uploadedImages: newImages,
      reviewText : localText,
    })
    onValidityChange?.(true);
  };

  //먼저 로컬에서만 상태 갱신
  const handleTextChange = (next: string) => {
      setLocalText(next);
  }
//blur 시점에 부모로 전달
  const handleTextBlur =() => {
        onChange({
      uploadedImages,
      reviewText: localText,
    })
  }


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
        value={localText}
        onChange={handleTextChange}
        onBlur={handleTextBlur}
        label="메모"
        placeholder="오랫동안 추억할 수 있게 간단한 메모를 남겨주세요."
        maxLength={300}
      />
    </div>
  );
};
