"use client";
import Modal from "@/shared/components/Modal";

type LocationConsentModalProps = {
  open: boolean;
  onClose: () => void;
  onConsent: () => void;
  onManual: () => void;
  isLocating?: boolean;
  isLoadingAddress?: boolean;
};

export const LocationConsentModal = ({
  open,
  onClose,
  onConsent,
  onManual,
  isLocating = false,
  isLoadingAddress = false,
}: LocationConsentModalProps) => {
  const disabled = isLocating || isLoadingAddress;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="mb-6 text-center">
        {/* 아이콘 (Heroicons 스타일) */}
        <div className="flex justify-center items-center mx-auto mb-4 w-12 h-12 bg-green-100 rounded-full">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 h-6 text-green-600"
            aria-hidden="true"
          >
            <path
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h2 className="mb-2 text-xl font-bold text-gray-900">자동 위치 등록</h2>
        <p className="text-sm text-secondary-100">
          현재 위치를 기반으로 인기 공연과 <br />
          공연장까지의 소요시간 정보를 제공해드려요.
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={onConsent}
          disabled={disabled}
          className={`w-full rounded-xl py-2 font-semibold text-gray-200 transition-colors ${
            disabled ? "bg-gray-400" : "bg-green-200 hover:bg-green-600"
          }`}
        >
          {isLocating
            ? "현재 위치 확인 중…"
            : isLoadingAddress
            ? "주소 불러오는 중…"
            : "위치 정보 동의"}
        </button>

        <button
          onClick={onManual}
          className="py-2 w-full font-semibold bg-gray-100 rounded-xl transition-colors text-secondary-100 hover:bg-gray-200"
        >
          직접 입력하기
        </button>
      </div>
    </Modal>
  );
};
