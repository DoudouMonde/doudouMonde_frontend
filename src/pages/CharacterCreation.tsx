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
import {
  Bored,
  Exited,
  Happy,
  Sad,
  Surprise,
} from "@/assets/icons/playroom/emotion";
import * as EmotionCharacters from "@/assets/icons/playroom/storytown/character/emotion";
import {
  Crwon,
  Flower,
  Hat,
  Ribbon,
  RoundGlass,
  WizardHat,
} from "@/assets/icons/playroom/accessories";

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

  // 감정 데이터 배열
  const emotions = [
    { id: "happy", name: "행복", icon: Happy },
    { id: "onemore", name: "한번 더", icon: Exited },
    { id: "surprised", name: "놀람", icon: Surprise },
    { id: "sad", name: "슬픔", icon: Sad },
    { id: "bored", name: "지루함", icon: Bored },
  ];

  // 악세사리 데이터 배열
  const accessories = [
    { id: "crwon", name: "왕관", icon: Crwon },
    { id: "flower", name: "꽃", icon: Flower },
    { id: "hat", name: "모자", icon: Hat },
    { id: "ribbon", name: "리본", icon: Ribbon },
    { id: "roundGlass", name: "둥근안경", icon: RoundGlass },
    { id: "wizardHat", name: "마법사모자", icon: WizardHat },
  ];

  // 선택된 동물 상태 (기본값: 병아리)
  const [selectedAnimal, setSelectedAnimal] = useState("chick");
  // 선택된 감정 상태 (기본값: 행복)
  const [selectedEmotion, setSelectedEmotion] = useState("happy");
  // 선택된 악세사리 상태 (기본값: 왕관)
  const [selectedAccessory, setSelectedAccessory] = useState("crwon");
  // 현재 단계 상태 (animal, emotion, accessory)
  const [currentStep, setCurrentStep] = useState<
    "animal" | "emotion" | "accessory"
  >("animal");

  // 동물과 감정을 조합해서 캐릭터 컴포넌트를 가져오는 함수
  const getEmotionCharacter = (animal: string, emotion: string) => {
    const animalName = animal.charAt(0).toUpperCase() + animal.slice(1);
    const emotionName = emotion.charAt(0).toUpperCase() + emotion.slice(1);
    const componentName = `${animalName}${emotionName}`;

    // 컴포넌트 이름 매핑 (oneMore -> Onemore)
    const mappedComponentName = componentName.replace("Onemore", "Onemore");

    return (
      EmotionCharacters as Record<
        string,
        React.ComponentType<{ className?: string }>
      >
    )[mappedComponentName];
  };

  const handlePrevious = () => {
    if (currentStep === "accessory") {
      setCurrentStep("emotion");
    } else if (currentStep === "emotion") {
      setCurrentStep("animal");
    } else {
      navigate(-1); // 브라우저 히스토리에서 이전 페이지로 이동
    }
  };

  const handleNext = () => {
    // console.log("현재 단계:", currentStep);
    if (currentStep === "animal") {
      // console.log("동물 → 감정으로 이동");
      setCurrentStep("emotion");
    } else if (currentStep === "emotion") {
      // console.log("감정 → 악세사리로 이동");
      setCurrentStep("accessory");
    } else {
      // console.log("상상친구 만들기 완료!");
      // 캐릭터 데이터를 CharacterPreview 페이지로 전달
      navigate("/playroom/character-preview", {
        state: {
          animal: selectedAnimal,
          emotion: selectedEmotion,
          accessory: selectedAccessory,
        },
      });
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="p-6 w-full bg-gray-200/70 rounded-[40px] mt-20 mb-24">
        {/* Header */}
        <div className="flex flex-col mb-6">
          <h1 className="mb-4 title-inter">상상친구 만들기</h1>
          <p className="subtitle text-secondary-100">
            {currentStep === "animal"
              ? "오늘 공연을 함께 기억할 상상친구를 만들어 보세요.\n먼저 친구 종류를 선택해볼까요?"
              : currentStep === "emotion"
              ? "친구의 표정을 선택해보세요.\n어떤 기분의 친구가 될까요?"
              : "친구의 악세사리를 선택해보세요.\n어떤 스타일의 친구가 될까요?"}
          </p>
        </div>
        <hr className="my-4 mb-6 border-secondary-100/30" />

        {/* 선택한 동물 전신 모습으로 띄우기 */}

        <div className="flex relative z-10 flex-col items-center">
          <div className="flex justify-center">
            {(() => {
              console.log("currentStep:", currentStep);
              console.log("selectedAnimal:", selectedAnimal);
              console.log("selectedEmotion:", selectedEmotion);

              if (currentStep === "emotion" || currentStep === "accessory") {
                // 감정 단계에서는 감정이 적용된 캐릭터 표시
                const EmotionCharacter = getEmotionCharacter(
                  selectedAnimal,
                  selectedEmotion
                );
                console.log("감정동물:", EmotionCharacter);
                if (EmotionCharacter) {
                  return (
                    <EmotionCharacter className="w-[147px] h-[224px] relative z-20" />
                  );
                }
              }

              // 동물 단계이거나 감정 캐릭터를 찾을 수 없는 경우 기본 동물 표시
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

        {/* 선택할 항목 preview 띄우기 */}

        <div className="">
          {currentStep === "animal" ? (
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
          ) : currentStep === "emotion" ? (
            <SingleSelectGroup
              selectedValue={selectedEmotion}
              onChange={(value) => setSelectedEmotion(value as string)}
            >
              {/* 첫 번째 줄: 3개 감정 */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {emotions.slice(0, 3).map((emotion) => {
                  const EmotionIcon = emotion.icon;
                  return (
                    <SingleSelectItem key={emotion.id} value={emotion.id}>
                      <div
                        className={`transition-all duration-200 cursor-pointer`}
                      >
                        <div className="flex flex-col gap-2 items-center">
                          {/* 감정 이미지 */}
                          <div className="flex-shrink-0">
                            <EmotionIcon className="w-16 h-16" />
                          </div>
                          {/* 선택 표시와 감정 이름을 한 줄로 */}
                          <div className="flex gap-2 items-center">
                            {selectedEmotion === emotion.id ? (
                              <RadioTrue className="w-6 h-6" />
                            ) : (
                              <RadioFalse className="w-6 h-6" />
                            )}
                            <h3 className="text-sm text-gray-900 body-inter">
                              {emotion.name}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </SingleSelectItem>
                  );
                })}
              </div>

              {/* 두 번째 줄: 2개 감정을 가운데 정렬 */}
              <div className="flex gap-5 justify-center">
                {emotions.slice(3, 5).map((emotion) => {
                  const EmotionIcon = emotion.icon;
                  return (
                    <SingleSelectItem key={emotion.id} value={emotion.id}>
                      <div
                        className={`transition-all duration-200 cursor-pointer`}
                      >
                        <div className="flex flex-col gap-2 items-center">
                          {/* 감정 이미지 */}
                          <div className="flex-shrink-0">
                            <EmotionIcon className="w-16 h-16" />
                          </div>
                          {/* 선택 표시와 감정 이름을 한 줄로 */}
                          <div className="flex gap-2 items-center">
                            {selectedEmotion === emotion.id ? (
                              <RadioTrue className="w-6 h-6" />
                            ) : (
                              <RadioFalse className="w-6 h-6" />
                            )}
                            <h3 className="text-sm text-gray-900 body-inter">
                              {emotion.name}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </SingleSelectItem>
                  );
                })}
              </div>
            </SingleSelectGroup>
          ) : (
            <SingleSelectGroup
              selectedValue={selectedAccessory}
              onChange={(value) => setSelectedAccessory(value as string)}
            >
              {/* 첫 번째 줄: 3개 악세사리 */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {accessories.slice(0, 3).map((accessory) => {
                  const AccessoryIcon = accessory.icon;
                  return (
                    <SingleSelectItem key={accessory.id} value={accessory.id}>
                      <div
                        className={`transition-all duration-200 cursor-pointer`}
                      >
                        <div className="flex flex-col gap-2 items-center">
                          {/* 악세사리 이미지 */}
                          <div className="flex-shrink-0">
                            <AccessoryIcon className="w-16 h-16" />
                          </div>
                          {/* 선택 표시와 악세사리 이름을 한 줄로 */}
                          <div className="flex gap-2 items-center">
                            {selectedAccessory === accessory.id ? (
                              <RadioTrue className="w-6 h-6" />
                            ) : (
                              <RadioFalse className="w-6 h-6" />
                            )}
                            <h3 className="text-sm text-gray-900 body-inter">
                              {accessory.name}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </SingleSelectItem>
                  );
                })}
              </div>

              {/* 두 번째 줄: 3개 악세사리 */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {accessories.slice(3, 6).map((accessory) => {
                  const AccessoryIcon = accessory.icon;
                  return (
                    <SingleSelectItem key={accessory.id} value={accessory.id}>
                      <div
                        className={`transition-all duration-200 cursor-pointer`}
                      >
                        <div className="flex flex-col gap-2 items-center">
                          {/* 악세사리 이미지 */}
                          <div className="flex-shrink-0">
                            <AccessoryIcon className="w-16 h-16" />
                          </div>
                          {/* 선택 표시와 악세사리 이름을 한 줄로 */}
                          <div className="flex gap-2 items-center">
                            {selectedAccessory === accessory.id ? (
                              <RadioTrue className="w-6 h-6" />
                            ) : (
                              <RadioFalse className="w-6 h-6" />
                            )}
                            <h3 className="text-sm text-gray-900 body-inter">
                              {accessory.name}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </SingleSelectItem>
                  );
                })}
              </div>

              {/* 세 번째 줄: 2개 악세사리를 가운데 정렬 */}
              <div className="flex gap-5 justify-center">
                {accessories.slice(6, 8).map((accessory) => {
                  const AccessoryIcon = accessory.icon;
                  return (
                    <SingleSelectItem key={accessory.id} value={accessory.id}>
                      <div
                        className={`transition-all duration-200 cursor-pointer`}
                      >
                        <div className="flex flex-col gap-2 items-center">
                          {/* 악세사리 이미지 */}
                          <div className="flex-shrink-0">
                            <AccessoryIcon className="w-16 h-16" />
                          </div>
                          {/* 선택 표시와 악세사리 이름을 한 줄로 */}
                          <div className="flex gap-2 items-center">
                            {selectedAccessory === accessory.id ? (
                              <RadioTrue className="w-6 h-6" />
                            ) : (
                              <RadioFalse className="w-6 h-6" />
                            )}
                            <h3 className="text-sm text-gray-900 body-inter">
                              {accessory.name}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </SingleSelectItem>
                  );
                })}
              </div>
            </SingleSelectGroup>
          )}
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
