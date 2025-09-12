import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "@/domains/calendar/components/Calendar";
import { NavigationButtons } from "@/shared/components";
import { RadioTrue, RadioFalse } from "@/assets/icons";
import { PATH } from "@/shared/constants";

export const ChildAndDateSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedChildren, setSelectedChildren] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 임시 아이 데이터 (실제로는 API에서 가져올 데이터)
  const children = [
    {
      id: 1,
      name: "서아",
      avatar: "/assets/images/profile/CAT.png",
      age: 5,
    },
    {
      id: 2,
      name: "민수",
      avatar: "/assets/images/profile/DOG.png",
      age: 7,
    },
    {
      id: 3,
      name: "지영",
      avatar: "/assets/images/profile/RABBIT.png",
      age: 4,
    },
  ];

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

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="p-6 w-full bg-gray-200/70 rounded-[40px] mt-20 mb-24">
        {/* 아이 선택 섹션 */}
        <div className="">
          <h2 className="mb-5 title-inter">아이 선택</h2>
          <div className="space-y-3">
            {children.map((child) => (
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
                    <h3 className="body-inter">{child.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 관람날짜 선택 섹션 */}
        <div className="">
          <h2 className="mt-8 mb-8 title-inter">관람 날짜 선택</h2>
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
