import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationButtons } from "@/shared/components";
import { Calendar, PlayingCardsIcon } from "@/assets/icons";
import { PATH } from "@/shared/constants";
import { useReviewStore } from "@/stores/reviewStore";

const ReviewWriting: React.FC = () => {
  const navigate = useNavigate();
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
      setSelectedPerformance(JSON.parse(savedPerformance));
    }
  }, [setSelectedDate, setSelectedPerformance]);

  const handleImageUpload = (index: number, file: File) => {
    const newImages = [...uploadedImages];
    newImages[index] = file;
    console.log("이미지가 제대로 등록이 되었나 : ", newImages);
    setUploadedImages(newImages);
  };

  const handleImageRemove = (index: number) => {
    const newImages = [...uploadedImages];
    newImages[index] = null;
    setUploadedImages(newImages);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  const handlePrevious = () => {
    navigate(-1); // 브라우저 히스토리에서 이전 페이지로 이동
  };

  const handleNext = () => {
    console.log("후기 작성 완료:", { reviewText, uploadedImages });

    // VoiceReview 페이지로 이동 (이미 Zustand store에 저장됨)
    navigate(PATH.VOICE_REVIEW);
  };

  const isFormValid =
    reviewText.trim().length > 0 && uploadedImages.some((img) => img !== null);

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="p-6 w-full bg-gray-200/70 rounded-[40px] mt-20 mb-24">
        {/* Header */}
        <div className="flex flex-col mb-6">
          <h1 className="mb-4 title-inter">후기 입력</h1>
          <div className="flex flex-col gap-2 w-auto">
            <div className="flex gap-1 items-center">
              <PlayingCardsIcon className="w-[13px] h-[13px]" />
              <p>
                {selectedPerformance ? selectedPerformance.title : "공연이름"}
              </p>
            </div>
            <div className="flex gap-1 items-center">
              <Calendar className="w-[13px] h-[13px] flex-shrink-0" />
              <p className="whitespace-nowrap">{selectedDate || "선택날짜"}</p>
            </div>
          </div>
        </div>
        <hr className="my-4 border-secondary-100/30" />

        {/* 사진 업로드 섹션 */}
        <div className="mb-8">
          <h2 className="mb-4 title-inter">사진 등록</h2>
          <div className="grid grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="relative aspect-square bg-white/60 backdrop-blur-sm rounded-[16px] border-2 border-dashed border-secondary-100/30 hover:border-green-100 transition-colors"
              >
                {uploadedImages[index] ? (
                  <div className="relative w-full h-full">
                    <img
                      src={URL.createObjectURL(uploadedImages[index]!)}
                      alt={`업로드된 이미지 ${index + 1}`}
                      className="w-full h-full object-cover rounded-[14px]"
                    />
                    <button
                      onClick={() => handleImageRemove(index)}
                      className="flex absolute top-2 right-2 justify-center items-center w-6 h-6 text-sm text-white bg-red-500 rounded-full transition-colors hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col justify-center items-center w-full h-full cursor-pointer">
                    <div className="flex flex-col justify-center items-center text-gray-400">
                      <svg
                        className="mb-2 w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      <span className="text-sm font-medium">사진 추가</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(index, file);
                      }}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 후기 텍스트 섹션 */}
        <div className="mb-8">
          <h2 className="mb-4 title-inter">메모</h2>
          <div className="backdrop-blur-sm rounded-[20px] p-4 border border-secondary-100/30">
            <textarea
              value={reviewText}
              onChange={handleTextChange}
              placeholder="오랫동안 추억할 수 있게 간단한 메모를 남겨주세요."
              className="w-full h-20 text-gray-700 bg-transparent border-none outline-none resize-none subtitle"
              maxLength={500}
            />
            <div className="flex justify-end mt-2">
              <span className="text-sm text-black-100">
                {reviewText.length}/500
              </span>
            </div>
          </div>
        </div>

        {/* 네비게이션 버튼 */}
        <div className="mt-8">
          <NavigationButtons
            onPrevious={handlePrevious}
            onNext={handleNext}
            isNextDisabled={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewWriting;
