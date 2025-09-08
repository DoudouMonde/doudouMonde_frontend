import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationButtons, SearchInput } from "@/shared/components";
import { RadioTrue, RadioFalse } from "@/assets/icons";
import { PATH } from "@/shared/constants";

import {
  SingleSelectGroup,
  SingleSelectItem,
} from "@/shared/components/SingleSelect";

const SelectPerformance: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPerformance, setSelectedPerformance] = useState<number | null>(
    1 // 더미 데이터: 첫 번째 공연이 선택된 상태로 시작
  );

  // 더미 공연 데이터
  const performances = [
    {
      id: 1,
      title: "인어공주",
      date: "2024.01.15",
      location: "서울예술의전당",
      description: "클래식한 동화를 현대적으로 재해석한 뮤지컬",
    },
    {
      id: 2,
      title: "백설공주",
      date: "2024.01.20",
      location: "국립극장",
      description: "아름다운 음악과 함께하는 가족 뮤지컬",
    },
    {
      id: 3,
      title: "신데렐라",
      date: "2024.01.25",
      location: "예술의전당",
      description: "마법 같은 이야기로 꿈을 키워가는 뮤지컬",
    },
    {
      id: 4,
      title: "알라딘",
      date: "2024.02.01",
      location: "롯데콘서트홀",
      description: "동양의 신비로움과 서양의 판타지가 만나는 작품",
    },
  ];

  const handlePrevious = () => {
    navigate(-1); // 브라우저 히스토리에서 이전 페이지로 이동
  };

  const handleNext = () => {
    if (selectedPerformance) {
      // 선택된 공연 정보 찾기
      const selectedPerformanceData = performances.find(
        (p) => p.id === selectedPerformance
      );

      if (selectedPerformanceData) {
        // localStorage에 선택된 공연 정보 저장
        localStorage.setItem(
          "selectedPerformance",
          JSON.stringify(selectedPerformanceData)
        );
        console.log("선택된 공연:", selectedPerformanceData);
      }

      // ChildAndDateSelection 페이지로 이동
      navigate(PATH.CHILD_DATE_SELECTION);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="p-6 w-full bg-gray-200/70 rounded-[40px] mt-20 mb-24">
        <div className="flex flex-col gap-4">
          <h2 className="title-inter">공연 선택</h2>
          <p className="mb-4 subtitle text-secondary-100">
            이야기마을에 기록할 공연을 선택해주세요.
            <br />
            공연을 직접 검색하거나
            <br />
            '봤어요','보고싶어요' 누른 공연에서 선택할 수 있어요.
          </p>
          <SearchInput
            placeholder="공연 이름을 검색하세요..."
            onSearch={() => {}}
            value={""}
          />
        </div>

        {/* 관람날짜 선택 섹션 */}
        <div className="">
          <h2 className="mt-8 mb-3 body-hak">
            '봤어요', '보고싶어요' 누른 공연
          </h2>
          <div className="space-y-3">
            <SingleSelectGroup
              selectedValue={selectedPerformance}
              onChange={(value) => setSelectedPerformance(value as number)}
            >
              {performances.map((performance) => (
                <SingleSelectItem key={performance.id} value={performance.id}>
                  <div
                    className={`p-4 transition-all duration-200 cursor-pointer rounded-[16px] }`}
                  >
                    <div className="flex gap-4 items-center">
                      {/* 선택 표시 */}
                      {selectedPerformance === performance.id ? (
                        <RadioTrue className="w-6 h-6" />
                      ) : (
                        <RadioFalse className="w-6 h-6" />
                      )}
                      {/* 공연 이름만 표시 */}
                      <div className="flex-1 min-w-0">
                        <h3 className={`body-inter`}>{performance.title}</h3>
                      </div>
                    </div>
                  </div>
                </SingleSelectItem>
              ))}
            </SingleSelectGroup>
          </div>
        </div>

        {/* 네비게이션 버튼 */}
        <div className="mt-8">
          <NavigationButtons
            onPrevious={handlePrevious}
            onNext={handleNext}
            isNextDisabled={!selectedPerformance}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectPerformance;
