import React from "react";

interface NavigationButtonsProps {
  onPrevious?: () => void;
  onNext?: () => void;
  previousText?: string;
  nextText?: string;
  isNextDisabled?: boolean;
  className?: string;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrevious,
  onNext,
  previousText = "이전",
  nextText = "다음",
  isNextDisabled = false,
  className = "",
}) => {
  return (
    <div className={`grid grid-cols-2 gap-2 w-full ${className}`}>
      {/* 이전 버튼 */}
      <button
        onClick={onPrevious}
        className="flex items-center justify-center gap-2 w-full h-[34px] bg-secondary-100 backdrop-blur-sm rounded-[20px]  hover:bg-white/80 hover:border-gray-400 transition-all duration-200 active:scale-95"
      >
        <span className="text-base font-medium text-gray-200 body-inter-r">
          {previousText}
        </span>
      </button>

      {/* 다음 버튼 */}
      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className={`flex items-center justify-center gap-2 w-full h-[34px] rounded-[20px] transition-all duration-200 active:scale-95 ${
          isNextDisabled
            ? "text-gray-200 cursor-not-allowed bg-green-100/40 body-inter-r"
            : "text-gray-200 bg-green-100 shadow-lg hover:scale-105 body-inter-r"
        }`}
      >
        <span className="text-base font-medium body-inter-r">{nextText}</span>
      </button>
    </div>
  );
};

export default NavigationButtons;
