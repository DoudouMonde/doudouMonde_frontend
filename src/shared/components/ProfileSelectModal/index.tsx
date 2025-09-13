import React from "react";
import {
  CatIcon,
  ChickIcon,
  DinosaurIcon,
  DogIcon,
  RabbitIcon,
} from "@/assets/icons/profile";
import { SwitchCase } from "@/shared/components";

interface ProfileSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (profile: string) => void;
  currentProfile: string;
  isLoading?: boolean;
}

const PROFILE_OPTIONS = [
  { value: "CAT", label: "고양이" },
  { value: "CHICK", label: "병아리" },
  { value: "DINOSAUR", label: "공룡" },
  { value: "DOG", label: "강아지" },
  { value: "RABBIT", label: "토끼" },
];

export const ProfileSelectModal: React.FC<ProfileSelectModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  currentProfile,
  isLoading = false,
}) => {
  const [selectedProfile, setSelectedProfile] =
    React.useState<string>(currentProfile);

  React.useEffect(() => {
    if (isOpen) {
      setSelectedProfile(currentProfile);
    }
  }, [isOpen, currentProfile]);

  const handleConfirm = () => {
    onConfirm(selectedProfile);
  };

  if (!isOpen) return null;

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* 모달 컨텐츠 */}
      <div className="relative p-6 mx-4 w-full max-w-sm bg-gray-200 rounded-lg">
        <h3 className="mb-4 text-lg font-semibold text-center text-gray-900">
          어떤 캐릭터로 바꿀래요?
        </h3>

        {/* 프로필 선택 그리드 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {PROFILE_OPTIONS.map((option) => (
            <div
              key={option.value}
              onClick={() => setSelectedProfile(option.value)}
              className={`flex flex-col items-center p-3 rounded-lg cursor-pointer transition-colors ${
                selectedProfile === option.value
                  ? "bg-blue-100 border-2 border-blue-300"
                  : "bg-white border-2 border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div className="flex justify-center items-center mb-2 w-16 h-16 bg-gray-200 rounded-full">
                <SwitchCase
                  value={option.value}
                  case={{
                    CAT: <CatIcon className="w-12 h-12" />,
                    CHICK: <ChickIcon className="w-12 h-12" />,
                    DINOSAUR: <DinosaurIcon className="w-12 h-12" />,
                    DOG: <DogIcon className="w-12 h-12" />,
                    RABBIT: <RabbitIcon className="w-12 h-12" />,
                  }}
                />
              </div>
              <span className="text-xs text-center text-gray-700">
                {option.label}
              </span>
            </div>
          ))}
        </div>

        {/* 버튼들 */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 rounded-lg border border-gray-300 transition-colors hover:bg-gray-50"
            disabled={isLoading}
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 text-gray-200 bg-green-200 rounded-lg transition-colors hover:bg-blue-600 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "처리 중..." : "확인"}
          </button>
        </div>
      </div>
    </div>
  );
};
