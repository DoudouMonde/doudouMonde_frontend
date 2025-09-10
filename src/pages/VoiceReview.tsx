import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationButtons } from "@/shared/components";
import {
  Calendar,
  PlayingCardsIcon,
  RecordStart,
  RecordStop,
} from "@/assets/icons";
import { PATH } from "@/shared/constants";
import { useReviewStore } from "@/stores/reviewStore";

const VoiceReview: React.FC = () => {
  const navigate = useNavigate();
  const {
    recordedAudio,
    recordingDuration,
    selectedDate,
    selectedPerformance,
    setRecordedAudio,
    setSelectedDate,
    setSelectedPerformance,
  } = useReviewStore();

  const [localRecordingDuration, setLocalRecordingDuration] =
    useState<number>(0);

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

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

  // 컴포넌트 언마운트 시 정리
  React.useEffect(() => {
    return () => {
      if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
      }
    };
  }, [mediaRecorder, isRecording]);

  const handleStartRecording = async () => {
    try {
      // 마이크 권한 요청
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: "audio/wav" });
        console.log("녹음된 오디오 Blob:", audioBlob);
        console.log("오디오 크기:", audioBlob.size, "bytes");
        console.log("녹음 시간:", localRecordingDuration, "초");

        setRecordedAudio(audioBlob, localRecordingDuration);
        console.log("오디오가 Zustand store에 저장되었습니다.");

        // 스트림 정리
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setLocalRecordingDuration(0);

      // 녹음 시간 카운터
      const timer = setInterval(() => {
        setLocalRecordingDuration((prev) => prev + 1);
      }, 1000);

      // 컴포넌트 언마운트 시 타이머 정리
      return () => clearInterval(timer);
    } catch (error) {
      console.error("녹음 시작 실패:", error);
      alert("마이크 권한이 필요합니다.");
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const handleDeleteRecording = () => {
    setRecordedAudio(null, 0);
    setLocalRecordingDuration(0);
  };

  const handlePlayRecording = () => {
    if (recordedAudio) {
      const audio = new Audio(URL.createObjectURL(recordedAudio));
      audio.play();
    }
  };

  const handlePrevious = () => {
    navigate(-1); // 브라우저 히스토리에서 이전 페이지로 이동
  };

  const handleNext = async () => {
    try {
      if (recordedAudio) {
        console.log("음성 후기 완료 - 저장된 오디오:", recordedAudio);
        console.log("오디오 크기:", recordedAudio.size, "bytes");
        console.log("녹음 시간:", recordingDuration, "초");
        console.log("오디오 타입:", recordedAudio.type);
      } else {
        console.log("음성 녹음 없이 다음 페이지로 이동합니다.");
      }

      // 상상친구 만들기 페이지로 이동 (이미 Zustand store에 저장됨)
      navigate(PATH.CHARACTER_CREATION);
    } catch (error) {
      console.error("음성 후기 처리 중 오류:", error);
    }
  };

  // 음성녹음이 필수가 아니므로 항상 다음 페이지로 이동 가능
  const isFormValid = true;

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
        <hr className="my-4 mb-6 border-secondary-100/30" />

        {/* 음성 녹음 섹션 */}
        <div className="mb-8">
          <p className="mb-2 title-inter">음성 메시지 기록</p>

          <p className="subtitle text-secondary-100">
            아이와 대화를 나누며 자유롭게 음성 기록을 남겨주세요!
          </p>
          <p className="subtitle text-secondary-100">
            예: 오늘 가장 즐거웠던 때는 어제였어? <hr></hr>오늘 가장 마음에 든
            캐릭터는 누구야?
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
                    녹음 시간: {Math.floor(localRecordingDuration / 60)}:
                    {(localRecordingDuration % 60).toString().padStart(2, "0")}
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
                    onClick={handlePlayRecording}
                    className="px-4 py-2 text-white bg-green-100 rounded-lg transition-colors hover:bg-green-200"
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
