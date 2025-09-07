import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "@/domains/calendar/components/Calendar";
import { NavigationButtons } from "@/shared/components";

const ChildAndDateSelection: React.FC = () => {
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
    navigate("/review-writing");
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
                className={`p-3 rounded-[12px] cursor-pointer transition-all duration-200 hover:bg-white/40 ${
                  selectedChildren.includes(child.id)
                    ? "bg-green-100/50 border-2 border-green-100"
                    : "bg-white/20 border-2 border-transparent"
                }`}
              >
                <div className="flex gap-2 items-center">
                  <span
                    className={`body-inter ${
                      selectedChildren.includes(child.id)
                        ? "text-green-100 font-bold"
                        : "text-black-100"
                    }`}
                  >
                    {child.name}
                  </span>
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

export default ChildAndDateSelection;
