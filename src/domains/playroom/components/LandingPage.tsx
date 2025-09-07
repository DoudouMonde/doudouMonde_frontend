import React from "react";
import { LandingPageProps, ActionButtonProps } from "../types";

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  children,
  variant = "primary",
  className = "",
}) => {
  const baseClasses =
    "w-[142px] h-[31px] rounded-[10px] font-['Hakgyoansim_Dunggeunmiso_OTF'] text-base font-normal tracking-[-0.03em] transition-all duration-200 hover:scale-105 active:scale-95";

  const variantClasses =
    variant === "primary"
      ? "bg-[#FFF288] text-black shadow-lg"
      : "bg-[#FFF288] text-black shadow-lg";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
};

const LandingPage: React.FC<LandingPageProps> = ({
  onStart,
  onSkip,
  // className = "",
}) => {
  return (
    <div className={`overflow-hidden relative w-full h-screen`}>
      {/* Background Image */}

      {/* Main Content Area */}
      <div className="relative pt-[64px]">
        {/* 나무 이미지 */}
        <div className="flex z-20 justify-center items-start pt-8 w-full">
          <img
            src="/assets/characters/treeEx.png"
            alt="나무 이미지"
            className="w-full h-auto object-contain drop-shadow-[0px_0px_5px_rgba(0,0,0.5,0)]"
          />
        </div>

        <div className="flex absolute top-0 z-20 flex-col gap-0 items-center translate-y-full">
          {/* Speech Bubble */}
          <div className="bg-white/70 backdrop-blur-sm rounded-[40px] p-6 shadow-[0px_0px_12px_0px_rgba(255,246,165,1)]">
            <p className="text-center text-black text-base font-normal leading-[1.21] tracking-[-0.04em] font-['Inter']">
              안녕 서아야!
              <br />
              이야기마을에 온 걸 환영해.
              <br />
              나와 함께 상상친구를 만들면서
              <br />
              우리가 본 공연을 한 번 추억해볼까?
            </p>
          </div>

          {/* Character - Doudou */}
          <div className="flex z-20 gap-0 items-center">
            <img
              src="/assets/characters/doudou.png"
              alt="두두 캐릭터"
              className="w-[193px] h-[248px] object-contain drop-shadow-[0px_0px_20px_rgba(100, 100, 100, 0.8)]"
            />

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 items-end pb-8">
              <ActionButton onClick={onStart || (() => {})}>좋아</ActionButton>
              <ActionButton onClick={onSkip || (() => {})}>
                다음에 할래
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
