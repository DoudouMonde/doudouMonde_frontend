import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "@/domains/calendar/components/Calendar";
import { NavigationButtons } from "@/shared/components";

const ChildAndDateSelection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedChild, setSelectedChild] = useState<number | null>(null);
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
    setSelectedChild(childId);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    console.log("선택된 날짜:", date);
  };

  const handlePrevious = () => {
    navigate(-1); // 브라우저 히스토리에서 이전 페이지로 이동
  };

  const handleNext = () => {
    // 다음 페이지로 이동 (예: 공연 상세 페이지)
    console.log("다음 단계로 이동");
    // navigate(PATH.NEXT_PAGE);
  };

  return (
    // 원래는 gray200인데 잘 안보여서 임시로 beige로 한 거임
    <div className="flex min-h-screen bg-gray-200/70 rounded-[40px] mt-20">
      {/* Main Content */}
      <div className="p-6 w-full">
        {/* 아이 선택 섹션 -> 여긴 라디오 선택으로 만들기 */}
        <div className="">
          <h2 className="mb-4 title-inter">아이 선택</h2>
          <div className="">
            {children.map((child) => (
              <div
                key={child.id}
                onClick={() => handleChildSelect(child.id)}
                className={"p-2 transition-all duration-200"}
              >
                <div className="flex gap-2 items-center">
                  <span className="body-inter">{child.name}</span>
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
            isNextDisabled={!selectedChild || !selectedDate}
          />
        </div>
      </div>
    </div>
  );
};

export default ChildAndDateSelection;
