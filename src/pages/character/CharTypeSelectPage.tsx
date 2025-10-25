import React, { useState, useEffect } from "react";
import { ReviewContainer } from "@/shared/components/Layout/ReviewContainer";
import { useReviewStore } from "@/stores/reviewStore";

// ✅ 전신(Body) 및 프리뷰(Head)만 사용
import {
  ChickBody,
  CatBody,
  DinoBody,
  DogBody,
  RabbitBody,
} from "@/assets/icons/playroom/type_body";
import {
  ChickPre,
  CatPre,
  DinoPre,
  DogPre,
  RabbitPre,
} from "@/assets/icons/playroom/type_head";

import { Shadow } from "@/assets/icons/playroom";

import {
  SingleSelectGroup,
  SingleSelectItem,
} from "@/shared/components/SingleSelect";
import { RadioTrue, RadioFalse } from "@/assets/icons";
import { REVIEW_FLOW } from "@/shared/routes/flow";
import { Desc } from "@/domains/playroom/components/Desc";

type AnimalId = "chick" | "cat" | "dino" | "dog" | "rabbit";

export const CharTypeSelectPage: React.FC = () => {
  // 공연 정보 (전시용)
  const { setSelectedDate, setSelectedPerformance } = useReviewStore();

  useEffect(() => {
    const savedDate = localStorage.getItem("selectedDate");
    if (savedDate) {
      const date = new Date(savedDate);
      setSelectedDate(date.toLocaleDateString("ko-KR"));
    }

    const savedPerformance = localStorage.getItem("selectedPerformance");
    if (savedPerformance) {
      try {
        const performanceData = JSON.parse(savedPerformance);
        setSelectedPerformance({
          id: performanceData.id,
          title: performanceData.title,
        });
      } catch (error) {
        console.error("공연 데이터 파싱 오류:", error);
      }
    }
  }, [setSelectedDate, setSelectedPerformance]);

  // ✅ 동물 데이터: 전신(Body) + 프리뷰(Head)만 필요
  const animals: Array<{
    id: AnimalId;
    name: string;
    headIcon: React.ComponentType<{ className?: string }>;
    bodyIcon: React.ComponentType<{ className?: string }>;
  }> = [
    { id: "chick", name: "병아리", headIcon: ChickPre, bodyIcon: ChickBody },
    { id: "cat", name: "고양이", headIcon: CatPre, bodyIcon: CatBody },
    { id: "dino", name: "공룡", headIcon: DinoPre, bodyIcon: DinoBody },
    { id: "dog", name: "강아지", headIcon: DogPre, bodyIcon: DogBody },
    { id: "rabbit", name: "토끼", headIcon: RabbitPre, bodyIcon: RabbitBody },
  ];

  // ✅ 선택된 동물 (기본: 병아리)
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalId>("chick");

  // ✅ 전신 변경 시 살짝 점프 애니메이션
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [selectedAnimal]);

  return (
    <ReviewContainer title="상상친구 만들기" flow={REVIEW_FLOW}>
      {/* Header */}
      <Desc
        content={
          <>
            오늘 공연을 함께 기억할 상상친구를 만들어 보세요.
            <br />
            먼저 친구 종류를 선택해볼까요?
          </>
        }
      />

      {/* ✅ 선택한 동물의 '전신'을 표시 */}
      <div className="flex relative z-10 flex-col items-center">
        <div className="flex justify-center">
          {(() => {
            const selected = animals.find((a) => a.id === selectedAnimal);
            const BodyIcon = selected?.bodyIcon ?? ChickBody;
            return (
              <BodyIcon
                className={`w-[350px] h-[250px] relative z-20 ${
                  isAnimating ? "animate-gentle-bounce" : ""
                }`}
              />
            );
          })()}
        </div>
        <Shadow className="w-[147px] h-[40px] mt-[-40px] relative z-10" />
      </div>
      <hr className="my-4 mb-7 border-secondary-100/30" />

      {/* ✅ 동물 타입 단일 선택 (프리뷰는 head 아이콘) */}
      <div>
        <SingleSelectGroup
          selectedValue={selectedAnimal}
          onChange={(value) => setSelectedAnimal(value as AnimalId)}
        >
          {/* 첫 줄: 3개 */}
          <div className="grid grid-cols-3 gap-4 mb-4 sm:gap-6 md:gap-8 lg:gap-12">
            {animals.slice(0, 3).map((animal) => {
              const HeadIcon = animal.headIcon;
              const active = selectedAnimal === animal.id;
              return (
                <SingleSelectItem key={animal.id} value={animal.id}>
                  <div className="transition-all duration-200 cursor-pointer">
                    <div className="flex flex-col items-center">
                      <div className="flex-shrink-0">
                        <HeadIcon className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40" />
                      </div>
                      <div className="flex gap-2 items-center mt-[-12px]">
                        {active ? (
                          <RadioTrue className="w-6 h-6" />
                        ) : (
                          <RadioFalse className="w-6 h-6" />
                        )}
                        <h3 className="text-sm text-gray-900 body-hak-r">
                          {animal.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </SingleSelectItem>
              );
            })}
          </div>

          {/* 둘째 줄: 2개 중앙 정렬 */}
          <div className="flex gap-4 justify-center sm:gap-6 md:gap-8 lg:gap-12">
            {animals.slice(3, 5).map((animal) => {
              const HeadIcon = animal.headIcon;
              const active = selectedAnimal === animal.id;
              return (
                <SingleSelectItem key={animal.id} value={animal.id}>
                  <div className="transition-all duration-200 cursor-pointer">
                    <div className="flex flex-col justify-center items-center">
                      <div className="flex-shrink-0">
                        <HeadIcon className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40" />
                      </div>
                      <div className="flex gap-2 items-center mt-[-12px]">
                        {active ? (
                          <RadioTrue className="w-6 h-6" />
                        ) : (
                          <RadioFalse className="w-6 h-6" />
                        )}
                        <h3 className="text-sm text-gray-900 body-hak-r">
                          {animal.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </SingleSelectItem>
              );
            })}
          </div>
        </SingleSelectGroup>
      </div>
    </ReviewContainer>
  );
};
