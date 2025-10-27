import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReviewContainer } from "@/shared/components/Layout/ReviewContainer";
import { Desc } from "@/domains/playroom/components/Desc";
import * as EmotionCharacters from "@/assets/icons/playroom/storytown/character/emotion";
import { REVIEW_FLOW } from "@/shared/routes/flow";
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
  EmojiBored,
  EmojiCurious,
  EmojiHappy,
  EmojiOnemore,
  EmojiSad,
  EmojiSurprised,
} from "@/assets/icons/playroom/emotion";

import { Shadow } from "@/assets/icons/playroom";
import {
  SingleSelectGroup,
  SingleSelectItem,
} from "@/shared/components/SingleSelect";
import { RadioTrue, RadioFalse } from "@/assets/icons";
import { useReviewStore } from "@/stores/reviewStore";

type AnimalId = "chick" | "cat" | "dino" | "dog" | "rabbit";
type EmotionId =
  | "bored"
  | "curious"
  | "happy"
  | "onemore"
  | "sad"
  | "surprised";

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


export const CharEmotionSelectPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation() as { state?: { animal?: AnimalId } };

  // 공연 정보 표시(그대로 유지)
  const { setSelectedPerformance } = useReviewStore();

  useEffect(() => {
    const savedPerformance = localStorage.getItem("selectedPerformance");
    if (savedPerformance) {
      try {
        const performanceData = JSON.parse(savedPerformance);
        setSelectedPerformance({
          id: performanceData.id,
          title: performanceData.title,
        });
      } catch (e) {
        console.error("공연 데이터 파싱 오류:", e);
      }
    }
  }, [setSelectedPerformance]);

  // ✅ 이전 페이지에서 선택한 동물 타입 복구: location.state.animal > localStorage > 기본값
  const initialAnimal: AnimalId =
    location.state?.animal ??
    (localStorage.getItem("selectedAnimal") as AnimalId | null) ??
    "chick";

  // 전신/프리뷰에 필요한 동물 정의 (emotion 제거)
  const animals = useMemo(
    () =>
      [
        {
          id: "chick",
          name: "병아리",
          headIcon: ChickPre,
          bodyIcon: ChickBody,
        },
        { id: "cat", name: "고양이", headIcon: CatPre, bodyIcon: CatBody },
        { id: "dino", name: "공룡", headIcon: DinoPre, bodyIcon: DinoBody },
        { id: "dog", name: "강아지", headIcon: DogPre, bodyIcon: DogBody },
        {
          id: "rabbit",
          name: "토끼",
          headIcon: RabbitPre,
          bodyIcon: RabbitBody,
        },
      ] as const,
    []
  );

  const [selectedAnimal] = useState<AnimalId>(initialAnimal);

  const emotions: {
    id: EmotionId;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
      { id: "happy", name: "행복했어요", icon: EmojiHappy },
      { id: "onemore", name: "또보고싶어요", icon: EmojiOnemore },
      { id: "surprised", name: "놀랐어요", icon: EmojiSurprised },
      { id: "sad", name: "슬펐어요", icon: EmojiSad },
      { id: "bored", name: "지루했어요", icon: EmojiBored },
      { id: "curious", name: "궁금해요", icon: EmojiCurious },
    ];
  

const [selectedEmotion, setSelectedEmotion] = useState<EmotionId>(
    (localStorage.getItem("selectedEmotion") as EmotionId | null) ??
    emotions[0].id
  );

  // 전신 변경/액세사리 변경 시 살짝 바운스 애니메이션
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    setIsAnimating(true);
    const t = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(t);
  }, [selectedAnimal, selectedEmotion]);

  // ✅ 전신 + 악세사리 오버레이 렌더 (emotion 없이)
const renderCharacter = () => {
    // 1. 조합된 캐릭터 컴포넌트 가져오기
    const EmotionCharacter = getEmotionCharacter(
      selectedAnimal,
      selectedEmotion
    );

    // 2. 캐릭터 컴포넌트가 존재하면 렌더링
    if (EmotionCharacter) {
      return (
        <EmotionCharacter
          className={`w-[350px] h-[250px] relative z-20 ${
            isAnimating ? "animate-gentle-bounce" : ""
          }`}
        />
      );
    }

    // 3. 컴포넌트를 찾지 못했을 경우 기본 동물 Body 렌더링 (폴백)
    const selected = animals.find((a) => a.id === selectedAnimal);
    const BodyIcon = selected?.bodyIcon ?? ChickBody;
    return (
      <BodyIcon
        className={`w-[350px] h-[250px] relative z-20 ${
          isAnimating ? "animate-gentle-bounce" : ""
        }`}
      />
    );
  };


  return (
    <ReviewContainer title="상상친구 만들기" flow={REVIEW_FLOW}>
      <Desc
        content={<>좋은 선택이에요! <br/> 이제 감정을 기록해줄 표정을 선택해주세요.</>}
      />

      <div className="flex relative z-10 flex-col items-center">
        <div className="flex justify-center">{renderCharacter()}</div>
        <Shadow className="w-[147px] h-[40px] mt-[-40px] relative z-10" />
      </div>
      <hr className="my-4 mb-7 border-secondary-100/30" />

      <SingleSelectGroup
        selectedValue={selectedEmotion}
        onChange={(value) => setSelectedEmotion(value as EmotionId)}
      >
        <div className="grid grid-cols-3 gap-3 mb-4">
          {emotions.map((emo) => {
            const Icon = emo.icon;
            const active = selectedEmotion === emo.id;
            return (
              <SingleSelectItem key={emo.id} value={emo.id}>
                <div className="transition-all duration-200 cursor-pointer">
                  <div className="flex flex-col gap-2 items-center">
                    <Icon className="w-16 h-16" />
                    <div className="flex gap-2 items-center">
                      {active ? (
                        <RadioTrue className="w-6 h-6" />
                      ) : (
                        <RadioFalse className="w-6 h-6" />
                      )}
                    </div>
                  </div>
                </div>
              </SingleSelectItem>
            );
          })}
        </div>
      </SingleSelectGroup>


    </ReviewContainer>
  );
};
