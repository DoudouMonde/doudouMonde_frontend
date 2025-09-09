import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationButtons } from "@/shared/components";
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

const CharacterCreation: React.FC = () => {
  const navigate = useNavigate();

  // 동물 데이터 배열
  const animals = [
    { id: "chick", name: "병아리", headIcon: ChickPre, bodyIcon: ChickBody },
    { id: "cat", name: "고양이", headIcon: CatPre, bodyIcon: CatBody },
    { id: "dino", name: "공룡", headIcon: DinoPre, bodyIcon: DinoBody },
    { id: "dog", name: "강아지", headIcon: DogPre, bodyIcon: DogBody },
    { id: "rabbit", name: "토끼", headIcon: RabbitPre, bodyIcon: RabbitBody },
  ];

  // 선택된 동물 상태 (기본값: 병아리)
  const [selectedAnimal, setSelectedAnimal] = useState("chick");

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

        {/* 선택한 동물 전신 모습으로 띄우기 */}

        <div className="flex relative z-10 flex-col items-center">
          <div className="flex justify-center">
            {(() => {
              const selectedAnimalData = animals.find(
                (animal) => animal.id === selectedAnimal
              );
              const BodyIcon = selectedAnimalData?.bodyIcon || ChickBody;
              return <BodyIcon className="w-[147px] h-[224px] relative z-20" />;
            })()}
          </div>
          <Shadow className="w-[147px] h-[40px] mt-[-25px] relative z-10" />
        </div>
        <hr className="my-4 mb-6 border-secondary-100/30" />

        {/* 선택할 동물 preview 띄우기 */}

        <div className="">
          <SingleSelectGroup
            selectedValue={selectedAnimal}
            onChange={(value) => setSelectedAnimal(value as string)}
          >
            {/* 첫 번째 줄: 3개 동물 */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {animals.slice(0, 3).map((animal) => {
                const HeadIcon = animal.headIcon;
                return (
                  <SingleSelectItem key={animal.id} value={animal.id}>
                    <div
                      className={`transition-all duration-200 cursor-pointer`}
                    >
                      <div className="flex flex-col gap-2 items-center">
                        {/* 동물 head 이미지 */}
                        <div className="flex-shrink-0">
                          <HeadIcon className="w-16 h-16" />
                        </div>
                        {/* 선택 표시와 동물 이름을 한 줄로 */}
                        <div className="flex gap-2 items-center">
                          {selectedAnimal === animal.id ? (
                            <RadioTrue className="w-6 h-6" />
                          ) : (
                            <RadioFalse className="w-6 h-6" />
                          )}
                          <h3 className="text-sm text-gray-900 body-inter">
                            {animal.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </SingleSelectItem>
                );
              })}
            </div>

            {/* 두 번째 줄: 2개 동물을 가운데 정렬 */}
            <div className="flex gap-5 justify-center">
              {animals.slice(3, 5).map((animal) => {
                const HeadIcon = animal.headIcon;
                return (
                  <SingleSelectItem key={animal.id} value={animal.id}>
                    <div
                      className={`transition-all duration-200 cursor-pointer`}
                    >
                      <div className="flex flex-col gap-2 items-center">
                        {/* 동물 head 이미지 */}
                        <div className="flex-shrink-0">
                          <HeadIcon className="w-16 h-16" />
                        </div>
                        {/* 선택 표시와 동물 이름을 한 줄로 */}
                        <div className="flex gap-2 items-center">
                          {selectedAnimal === animal.id ? (
                            <RadioTrue className="w-6 h-6" />
                          ) : (
                            <RadioFalse className="w-6 h-6" />
                          )}
                          <h3 className="text-sm text-gray-900 body-inter">
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

        {/* 네비게이션 버튼 */}
        <div className="mt-8">
          <NavigationButtons
            onPrevious={handlePrevious}
            onNext={handleNext}
            isNextDisabled={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CharacterCreation;
