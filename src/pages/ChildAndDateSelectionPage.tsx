import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "@/domains/calendar/components/Calendar";
import { NavigationButtons } from "@/shared/components";
import { RadioTrue, RadioFalse } from "@/assets/icons";
import { PATH } from "@/shared/constants";
import { useChildListQuery } from "@/domains/child/queries/useChildListQuery";
import { ChildItemResponse } from "@/domains/child/types/childApiTypes";

export const ChildAndDateSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedChildren, setSelectedChildren] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 실제 아이 데이터를 API에서 불러오기
  const { data: childListData, isLoading, error } = useChildListQuery();

  const handleChildSelect = (childId: number) => {
    setSelectedChildren((prev) => {
      if (prev.includes(childId)) {
        // 이미 선택된 아이면 선택 해제
        return prev.filter((id) => id !== childId);
      } else {
        // 선택되지 않은 아이면 선택 추가
        return [...prev, childId];
      }
    });
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    // localStorage에 선택된 날짜 저장
    localStorage.setItem("selectedDate", date.toISOString());
    console.log("선택된 날짜:", date);
  };

  const handlePrevious = () => {
    navigate(-1); // 브라우저 히스토리에서 이전 페이지로 이동
  };

  const handleNext = () => {
    console.log("선택된 아이들:", selectedChildren);
    console.log("선택된 날짜:", selectedDate);
    // localStorage에 선택된 아이들 저장
    localStorage.setItem("selectedChildren", JSON.stringify(selectedChildren));
    // ReviewWriting 페이지로 이동
    navigate(PATH.REVIEW_WRITING);
  };

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="flex min-h-screen">
        <div className="p-6 w-full bg-gray-200/70 rounded-[40px] mt-20 mb-24">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 rounded-full border-b-2 border-pink-500 animate-spin"></div>
              <p className="text-gray-600">아이 정보를 불러오는 중...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="flex min-h-screen">
        <div className="p-6 w-full bg-gray-200/70 rounded-[40px] mt-20 mb-24">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="mb-4 text-red-500">
                아이 정보를 불러오는 데 실패했습니다.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 text-white bg-pink-500 rounded-lg transition-colors hover:bg-pink-600"
              >
                다시 시도
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 아이 데이터가 없는 경우
  const children = childListData?.contents || [];
  if (children.length === 0) {
    return (
      <div className="flex min-h-screen">
        <div className="p-6 w-full bg-gray-200/70 rounded-[40px] mt-20 mb-24">
          <div className="py-12 text-center">
            <p className="mb-2 text-gray-500">등록된 아이가 없습니다.</p>
            <p className="text-sm text-gray-400">
              먼저 아이 정보를 등록해주세요.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="p-6 w-full bg-gray-200/70 rounded-[40px] mt-20 mb-24">
        {/* 아이 선택 섹션 */}
        <div className="">
          <h2 className="pt-2 pb-5 title-inter">아이 선택</h2>
          <div className="space-y-3">
            {children.map((child: ChildItemResponse) => (
              <div
                key={child.id}
                onClick={() => handleChildSelect(child.id)}
                className=" transition-all duration-200 cursor-pointer rounded-[16px]"
              >
                <div className="flex gap-4 items-center">
                  {/* 선택 표시 */}
                  {selectedChildren.includes(child.id) ? (
                    <RadioTrue className="w-6 h-6" />
                  ) : (
                    <RadioFalse className="w-6 h-6" />
                  )}
                  {/* 아이 이름만 표시 */}
                  <div className="flex-1 min-w-0">
                    <h3 className="body-inter-r">{child.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 관람날짜 선택 섹션 */}
        <div className="">
          <h2 className="mt-8 mb-6 title-inter">관람 날짜 선택</h2>
          <div className="flex justify-center">
            <Calendar onDateChange={handleDateChange} />
          </div>
        </div>

        {/* 네비게이션 버튼 */}
        <div className="mt-8">
          <NavigationButtons
            onPrevious={handlePrevious}
            onNext={handleNext}
            isNextDisabled={selectedChildren.length === 0 || !selectedDate}
          />
        </div>
      </div>
    </div>
  );
};
