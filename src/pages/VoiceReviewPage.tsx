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

export const VoiceReviewPage = () => {
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
      try {
        const performanceData = JSON.parse(savedPerformance);
        // SelectPerformancePage에서 저장한 데이터를 reviewStore의 PerformanceData 형태로 변환
        setSelectedPerformance({
          id: performanceData.id,
          title: performanceData.title,
        });
        console.log("VoiceReviewPage - 저장된 공연 데이터:", performanceData);
        console.log("VoiceReviewPage - 변환된 공연 데이터:", {
          id: performanceData.id,
          title: performanceData.title,
        });
      } catch (error) {
        console.error("공연 데이터 파싱 오류:", error);
      }
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
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      });

      // 지원되는 MIME 타입 확인
      let mimeType = "audio/webm";
      if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
        mimeType = "audio/webm;codecs=opus";
      } else if (MediaRecorder.isTypeSupported("audio/mp4")) {
        mimeType = "audio/mp4";
      } else if (MediaRecorder.isTypeSupported("audio/wav")) {
        mimeType = "audio/wav";
      }

      console.log("사용할 MIME 타입:", mimeType);

      const recorder = new MediaRecorder(stream, { mimeType });
      const chunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        console.log("데이터 수신:", event.data.size, "bytes");
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: mimeType });
        console.log("녹음된 오디오 Blob:", audioBlob);
        console.log("오디오 크기:", audioBlob.size, "bytes");
        console.log("오디오 타입:", audioBlob.type);
        console.log("녹음 시간:", localRecordingDuration, "초");

        setRecordedAudio(audioBlob, localRecordingDuration);
        console.log("오디오가 Zustand store에 저장되었습니다.");

        // 스트림 정리
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start(100); // 100ms마다 데이터 수집
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
      console.log("재생할 오디오:", recordedAudio);
      console.log("오디오 타입:", recordedAudio.type);
      console.log("오디오 크기:", recordedAudio.size, "bytes");

      const audioUrl = URL.createObjectURL(recordedAudio);
      const audio = new Audio(audioUrl);

      audio.onloadedmetadata = () => {
        console.log("오디오 메타데이터 로드됨, 재생 시작");
      };

      audio.onplay = () => {
        console.log("오디오 재생 시작");
      };

      audio.onended = () => {
        console.log("오디오 재생 완료");
        URL.revokeObjectURL(audioUrl); // 메모리 정리
      };

      audio.onerror = (error) => {
        console.error("오디오 재생 오류:", error);
        URL.revokeObjectURL(audioUrl); // 메모리 정리
      };

      audio.play().catch((error) => {
        console.error("오디오 재생 실패:", error);
        URL.revokeObjectURL(audioUrl); // 메모리 정리
      });
    } else {
      console.log("재생할 오디오가 없습니다.");
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
      <div className=" relative p-6 w-full bg-gray-200/70 rounded-[40px] mt-20 mb-24">
        {/* Header */}
        <div className="flex flex-col mb-6">
          <h1 className="mb-4 title-inter">후기 입력</h1>
          <div className="flex flex-col gap-2 w-auto">
            <div className="flex gap-1 items-center">
              <PlayingCardsIcon className="w-[13px] h-[13px]" />
              <p className="body-hak-r">
                {selectedPerformance ? selectedPerformance.title : "공연이름"}
              </p>
            </div>
            <div className="flex gap-1 items-center">
              <Calendar className="w-[13px] h-[13px] flex-shrink-0" />
              <p className="whitespace-nowrap body-hak-r">
                {selectedDate || "선택날짜"}
              </p>
            </div>
          </div>
        </div>
        <hr className="my-4 mb-6 border-secondary-100/30" />

        {/* 음성 녹음 섹션 */}
        <div className="mb-8">
          <p className="mb-2 subtitle-b">음성 메시지 기록</p>

          <p className="subtitle text-secondary-100">
            아이와 대화를 나누며 자유롭게 음성 기록을 남겨주세요!
          </p>
          <p className="subtitle text-secondary-100">
            예: 오늘 가장 즐거웠던 때는 어제였어? <hr></hr>오늘 가장 마음에 든
            캐릭터는 누구야?
          </p>

          <div className="bg-white/60 backdrop-blur-sm rounded-[16px] p-6 border border-secondary-100/30 mt-5 h-52 flex items-center justify-center">
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
                <div className="flex justify-center items-center mb-4 w-16 h-16 rounded-full">
                  <RecordStop />
                </div>
                <p className="mb-4 text-gray-600 body-inter">
                  녹음이 완료되었습니다
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={handleDeleteRecording}
                    className="px-4 py-2 text-secondary-100  rounded-[20px] transition-colors border border-secondary-100/70 body-inter-r hover:bg-red-600"
                  >
                    다시 녹음
                  </button>
                  <button
                    onClick={handlePlayRecording}
                    className="px-4 py-2 text-gray-200 bg-green-100 rounded-[20px] transition-colors body-inter-r hover:bg-green-200"
                  >
                    재생
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 네비게이션 버튼 */}
        <div className="absolute right-0 left-0 bottom-8">
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
