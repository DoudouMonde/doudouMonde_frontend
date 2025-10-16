import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavigationButtons } from "@/shared/components";

// ✅ 감정 관련 임포트/로직 전부 제거
// import * as EmotionCharacters from "...";
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
  Crwon as CrownIcon,
  Flower as FlowerIcon,
  Hat as CapIcon,
  Ribbon as RibbonIcon,
  RoundGlass as GlassesIcon,
  WizardHat as WizhatIcon,
} from "@/assets/icons/playroom/accessories";

import { Shadow } from "@/assets/icons/playroom";
import {
  SingleSelectGroup,
  SingleSelectItem,
} from "@/shared/components/SingleSelect";
import { RadioTrue, RadioFalse, PlayingCardsIcon } from "@/assets/icons";
import { useReviewStore } from "@/stores/reviewStore";

type AnimalId = "chick" | "cat" | "dino" | "dog" | "rabbit";
type AccessoryId = "crown" | "flower" | "cap" | "ribbon" | "glasses" | "wizhat";

export const CharEmotionSelectPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation() as { state?: { animal?: AnimalId } };

  // 공연 정보 표시(그대로 유지)
  const { selectedPerformance, setSelectedPerformance } = useReviewStore();

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

  // ✅ 동물은 이 페이지에서 고정(수정 불가): 이전 단계의 선택을 사용
  const [selectedAnimal] = useState<AnimalId>(initialAnimal);

  // ✅ 악세사리만 이 페이지에서 선택
  const accessories: {
    id: AccessoryId;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: "crown", name: "왕관", icon: CrownIcon },
    { id: "flower", name: "꽃", icon: FlowerIcon },
    { id: "cap", name: "모자", icon: CapIcon },
    { id: "ribbon", name: "리본", icon: RibbonIcon },
    { id: "glasses", name: "둥근안경", icon: GlassesIcon },
    { id: "wizhat", name: "마법사모자", icon: WizhatIcon },
  ];

  const [selectedAccessory, setSelectedAccessory] = useState<AccessoryId>(
    accessories[0].id
  );

  // 전신 변경/액세사리 변경 시 살짝 바운스 애니메이션
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    setIsAnimating(true);
    const t = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(t);
  }, [selectedAnimal, selectedAccessory]);

  // ✅ 전신 + 악세사리 오버레이 렌더 (emotion 없이)
  const renderCharacter = () => {
    const selected = animals.find((a) => a.id === selectedAnimal);
    const BodyIcon = selected?.bodyIcon ?? ChickBody;

    // 악세사리 오버레이 공통 컴포넌트
    const Overlay =
      accessories.find((a) => a.id === selectedAccessory)?.icon ?? CrownIcon;

    return (
      <div className="relative w-[350px] h-[250px]">
        {/* 전신 */}
        <BodyIcon
          className={`w-[350px] h-[250px] relative z-20 ${
            isAnimating ? "animate-gentle-bounce" : ""}`}
        />
        {/* 악세사리 오버레이 (대략 머리 중앙 상단) */}
        <Overlay className="absolute left-1/2 -translate-x-1/2 top-[18%] w-[72px] h-[72px] z-30 pointer-events-none" />
      </div>
    );
  };

  const handlePrevious = () => {
    // 이전 단계(타입 선택)로 돌아갈 때, 현재 선택 악세사리 유지 필요시 localStorage 저장 가능
    // localStorage.setItem("selectedAccessory", selectedAccessory);
    navigate(-1);
  };

  const handleNext = () => {
    // 다음 페이지로 이동하며 동물/악세사리 전달
    localStorage.setItem("selectedAnimal", selectedAnimal);
    localStorage.setItem("selectedAccessory", selectedAccessory);

    navigate("/playroom/character-preview", {
      state: {
        animal: selectedAnimal,
        accessory: selectedAccessory,
      },
    });
  };

  return (
    <div className="flex min-h-screen">
      <div className="p-6 w-full bg-gray-200/70 rounded-[40px] mt-20 mb-24">
        {/* Header */}
        <div className="flex flex-col mb-6">
          <h1 className="mb-4 title-inter">상상친구 만들기</h1>
          <p className="subtitle text-secondary-100">
            악세사리를 선택하면, 앞서 고른 친구 타입에 적용돼요.
          </p>

          {/* 공연 정보 표시 */}
          {selectedPerformance && (
            <div className="mt-4 p-3 bg-white/60 backdrop-blur-sm rounded-[16px] border border-secondary-100/30">
              <div className="flex gap-1 items-center">
                <PlayingCardsIcon className="w-[13px] h-[13px]" />
                <p className="body-hak-r">{selectedPerformance.title}</p>
              </div>
            </div>
          )}
        </div>
        <hr className="my-4 mb-6 border-secondary-100/30" />

        {/* 전신 + 악세사리 조합 미리보기 */}
        <div className="flex relative z-10 flex-col items-center">
          <div className="flex justify-center">{renderCharacter()}</div>
          <Shadow className="w-[147px] h-[40px] mt-[-40px] relative z-10" />
        </div>
        <hr className="my-4 mb-7 border-secondary-100/30" />

        {/* 악세사리 선택 UI (단일 선택) */}
        <SingleSelectGroup
          selectedValue={selectedAccessory}
          onChange={(value) => setSelectedAccessory(value as AccessoryId)}
        >
          <div className="grid grid-cols-3 gap-3 mb-4">
            {accessories.map((acc) => {
              const Icon = acc.icon;
              const active = selectedAccessory === acc.id;
              return (
                <SingleSelectItem key={acc.id} value={acc.id}>
                  <div className="transition-all duration-200 cursor-pointer">
                    <div className="flex flex-col gap-2 items-center">
                      <Icon className="w-16 h-16" />
                      <div className="flex gap-2 items-center">
                        {active ? (
                          <RadioTrue className="w-6 h-6" />
                        ) : (
                          <RadioFalse className="w-6 h-6" />
                        )}
                        {/* 이름 노출 원하면 주석 해제 */}
                        {/* <h3 className="text-sm text-gray-900 body-inter">{acc.name}</h3> */}
                      </div>
                    </div>
                  </div>
                </SingleSelectItem>
              );
            })}
          </div>
        </SingleSelectGroup>

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
