import { create } from "zustand";

interface CharacterData {
  animal: string;
  emotion: string;
  accessory: string;
}

interface PerformanceData {
  id: number;
  title: string;
}

interface ReviewState {
  // 기본 리뷰 데이터
  reviewText: string;
  uploadedImages: (File | null)[];
  recordedAudio: Blob | null;
  recordingDuration: number;

  // 캐릭터 데이터
  characterData: CharacterData;
  characterName: string;

  // 공연 및 날짜 데이터
  selectedPerformance: PerformanceData | null;
  selectedDate: string;

  // Actions
  setReviewText: (text: string) => void;
  setUploadedImages: (images: (File | null)[]) => void;
  addUploadedImage: (image: File, index: number) => void;
  removeUploadedImage: (index: number) => void;
  setRecordedAudio: (audio: Blob | null, duration?: number) => void;
  setCharacterData: (data: CharacterData) => void;
  setCharacterName: (name: string) => void;
  setSelectedPerformance: (performance: PerformanceData | null) => void;
  setSelectedDate: (date: string) => void;

  // 리뷰 데이터 초기화
  clearReviewData: () => void;

  // 리뷰 데이터 가져오기 (FormData 생성용)
  getReviewDataForSubmission: () => {
    reviewText: string;
    uploadedImages: File[];
    recordedAudio: Blob | null;
    recordingDuration: number;
    characterData: CharacterData;
    characterName: string;
    selectedPerformance: PerformanceData | null;
    selectedDate: string;
  };
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  // 초기 상태
  reviewText: "",
  uploadedImages: [null, null, null, null] as (File | null)[],
  recordedAudio: null,
  recordingDuration: 0,
  characterData: {
    animal: "chick",
    emotion: "happy",
    accessory: "crwon",
  },
  characterName: "",
  selectedPerformance: null,
  selectedDate: "",

  // Actions
  setReviewText: (text) => set({ reviewText: text }),

  setUploadedImages: (images) => set({ uploadedImages: images }),

  addUploadedImage: (image, index) =>
    set((state) => {
      const newImages = [...state.uploadedImages];
      newImages[index] = image;
      return { uploadedImages: newImages };
    }),

  removeUploadedImage: (index) =>
    set((state) => {
      const newImages = [...state.uploadedImages];
      newImages[index] = null;
      return { uploadedImages: newImages };
    }),

  setRecordedAudio: (audio, duration = 0) =>
    set({
      recordedAudio: audio,
      recordingDuration: duration,
    }),

  setCharacterData: (data) => set({ characterData: data }),

  setCharacterName: (name) => set({ characterName: name }),

  setSelectedPerformance: (performance) =>
    set({ selectedPerformance: performance }),

  setSelectedDate: (date) => set({ selectedDate: date }),

  clearReviewData: () =>
    set({
      reviewText: "",
      uploadedImages: [null, null, null, null] as (File | null)[],
      recordedAudio: null,
      recordingDuration: 0,
      characterData: {
        animal: "chick",
        emotion: "happy",
        accessory: "crwon",
      },
      characterName: "",
      selectedPerformance: null,
      selectedDate: "",
    }),

  getReviewDataForSubmission: () => {
    const state = get();
    return {
      reviewText: state.reviewText,
      uploadedImages: state.uploadedImages.filter(
        (img) => img !== null
      ) as File[],
      recordedAudio: state.recordedAudio,
      recordingDuration: state.recordingDuration,
      characterData: state.characterData,
      characterName: state.characterName,
      selectedPerformance: state.selectedPerformance,
      selectedDate: state.selectedDate,
    };
  },
}));
