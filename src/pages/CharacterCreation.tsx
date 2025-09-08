import React from "react";
import { useNavigate } from "react-router-dom";
import { NavigationButtons } from "@/shared/components";

const CharacterCreation: React.FC = () => {
  const navigate = useNavigate();

  const handlePrevious = () => {
    navigate(-1); // 브라우저 히스토리에서 이전 페이지로 이동
  };

  const handleNext = () => {
    console.log("상상친구 만들기 완료!");
    // TODO: 다음 페이지로 이동하거나 완료 처리
  };

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="p-6 w-full bg-gray-200/70 rounded-[40px] mt-20 mb-24">
        {/* Header */}
        <div className="flex flex-col mb-6">
          <h1 className="mb-4 title-inter">상상친구 만들기</h1>
          <p className="subtitle text-secondary-100">
            오늘 공연을 함께 기억할 상상친구를 만들어 보세요.
            <br />
            먼저 친구 종류를 선택해볼까요?
          </p>
        </div>
        <hr className="my-4 mb-6 border-secondary-100/30" />

        <div>상상친구 만들기 과정</div>

        {/* 네비게이션 버튼 */}
        <div className="mt-8">
          <NavigationButtons
            onPrevious={handlePrevious}
            onNext={handleNext}
            isNextDisabled={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CharacterCreation;
