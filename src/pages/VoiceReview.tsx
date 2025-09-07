import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationButtons } from "@/shared/components";
import {
  Calendar,
  PlayingCardsIcon,
  RecordStart,
  RecordStop,
} from "@/assets/icons";

const VoiceReview: React.FC = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string>("");

  // localStorage에서 선택된 날짜와 아이들 불러오기
  React.useEffect(() => {
    const savedDate = localStorage.getItem("selectedDate");
    if (savedDate) {
      const date = new Date(savedDate);
      setSelectedDate(date.toLocaleDateString("ko-KR"));
    }
  }, []);

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingDuration(0);
    // 실제 녹음 로직은 여기에 구현
    console.log("녹음 시작");
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // 실제 녹음 중지 로직은 여기에 구현
    console.log("녹음 중지");
  };

  const handleDeleteRecording = () => {
    setRecordedAudio(null);
    setRecordingDuration(0);
  };

  const handlePrevious = () => {
    navigate(-1); // 브라우저 히스토리에서 이전 페이지로 이동
  };

  const handleNext = () => {
    console.log("음성 후기 완료:", { recordedAudio, recordingDuration });
    // 다음 단계로 이동 (예: 완료 페이지)
    // navigate(PATH.NEXT_PAGE);
  };

  const isFormValid = recordedAudio !== null;

  return (
    <div className="flex min-h-screen bg-gray-200/70 rounded-[40px] mt-20">
      {/* Main Content */}
      <div className="p-6 w-full">
        {/* Header */}
        <div className="flex flex-col mb-6">
          <h1 className="mb-4 title-inter">후기 입력</h1>
          <div className="w-auto min-w-20">
            <div className="flex gap-1 items-center">
              <PlayingCardsIcon className="w-[13px] h-[13px]" />
              <p>공연이름</p>
            </div>
            <div className="flex gap-1 items-center">
              <Calendar className="w-[13px] h-[13px] flex-shrink-0" />
              <p className="whitespace-nowrap">{selectedDate || "선택날짜"}</p>
            </div>
          </div>
        </div>
        <hr className="my-4 mb-6 border-secondary-100/30" />

        {/* 음성 녹음 섹션 */}
        <div className="mb-8">
          <p className="mb-4 title-inter">음성 메시지 기록</p>
          <p className="subtitle text-secondary-100">
            아이와 대화를 나누며 자유롭게 음성 기록을 남겨주세요!
          </p>
          <p className="subtitle text-secondary-100">
            예: 오늘 가장 즐거웠던 때는 어제였어? 오늘 가장 마음에 든 캐릭터는
            누구야?
          </p>

          <div className="bg-white/60 backdrop-blur-sm rounded-[16px] p-6 border border-secondary-100/30 mt-5">
            {!recordedAudio ? (
              <div className="flex flex-col items-center">
                <p className="mb-4 text-black-100 body-noto">
                  {isRecording
                    ? "녹음 중..."
                    : "마이크 버튼을 눌러 음성 후기를 녹음해주세요"}
                </p>
                <button
                  onClick={
                    isRecording ? handleStopRecording : handleStartRecording
                  }
                  className={`flex justify-center items-center w-16 h-16 rounded-full transition-all duration-200 ${
                    isRecording
                      ? "bg-red-500 animate-pulse hover:bg-red-600"
                      : ""}`}
                >
                  {isRecording ? <RecordStop /> : <RecordStart />}
                </button>
                {isRecording && (
                  <p className="mt-2 text-sm text-gray-500">
                    녹음 시간: {Math.floor(recordingDuration / 60)}:
                    {(recordingDuration % 60).toString().padStart(2, "0")}
                  </p>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="flex justify-center items-center mb-4 w-24 h-24 rounded-full">
                  <RecordStop />
                </div>
                <p className="mb-4 text-gray-600 body-inter">
                  녹음이 완료되었습니다
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={handleDeleteRecording}
                    className="px-4 py-2 text-white bg-red-500 rounded-lg transition-colors hover:bg-red-600"
                  >
                    다시 녹음
                  </button>
                  <button
                    onClick={() => {
                      // 재생 로직
                      console.log("재생");
                    }}
                    className="px-4 py-2 text-white rounded-lg transition-colors"
                  >
                    재생
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 네비게이션 버튼 */}
        <div className="mt-8">
          <NavigationButtons
            onPrevious={handlePrevious}
            onNext={handleNext}
            isNextDisabled={!isFormValid}
          />
        </div>
      </div>
    </div>
  );
};

export default VoiceReview;
