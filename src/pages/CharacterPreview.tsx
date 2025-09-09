import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavigationButtons } from "@/shared/components";
import { Calendar, PlayingCardsIcon } from "@/assets/icons";
import {
  ChickBody,
  CatBody,
  DinoBody,
  DogBody,
  RabbitBody,
} from "@/assets/icons/playroom/type_body";
import {
  Bored,
  Exited,
  Happy,
  Sad,
  Surprise,
} from "@/assets/icons/playroom/emotion";
import {
  Crwon,
  Flower,
  Hat,
  Ribbon,
  RoundGlass,
  WizardHat,
} from "@/assets/icons/playroom/accessories";
import { Shadow } from "@/assets/icons/playroom";

interface CharacterData {
  animal: string;
  emotion: string;
  accessory: string;
}

const CharacterPreview: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedPerformance, setSelectedPerformance] = useState<any>(null);

  // CharacterCreation에서 전달받은 데이터
  const characterData = (location.state as CharacterData) || {
    animal: "chick",
    emotion: "happy",
    accessory: "crwon",
  };

  // localStorage에서 선택된 날짜, 아이들, 공연 정보 불러오기
  React.useEffect(() => {
    const savedDate = localStorage.getItem("selectedDate");
    if (savedDate) {
      const date = new Date(savedDate);
      setSelectedDate(date.toLocaleDateString("ko-KR"));
    }

    const savedPerformance = localStorage.getItem("selectedPerformance");
    if (savedPerformance) {
      setSelectedPerformance(JSON.parse(savedPerformance));
    }
  }, []);

  // 동물 데이터
  const animals = [
    { id: "chick", name: "병아리", bodyIcon: ChickBody },
    { id: "cat", name: "고양이", bodyIcon: CatBody },
    { id: "dino", name: "공룡", bodyIcon: DinoBody },
    { id: "dog", name: "강아지", bodyIcon: DogBody },
    { id: "rabbit", name: "토끼", bodyIcon: RabbitBody },
  ];

  // 감정 데이터
  const emotions = [
    { id: "happy", name: "행복", icon: Happy },
    { id: "exited", name: "신남", icon: Exited },
    { id: "surprise", name: "놀람", icon: Surprise },
    { id: "sad", name: "슬픔", icon: Sad },
    { id: "bored", name: "지루함", icon: Bored },
  ];

  // 악세사리 데이터
  const accessories = [
    { id: "crwon", name: "왕관", icon: Crwon },
    { id: "flower", name: "꽃", icon: Flower },
    { id: "hat", name: "모자", icon: Hat },
    { id: "ribbon", name: "리본", icon: Ribbon },
    { id: "roundGlass", name: "둥근안경", icon: RoundGlass },
    { id: "wizardHat", name: "마법사모자", icon: WizardHat },
  ];

  // 선택된 데이터 가져오기
  const selectedAnimal = animals.find(
    (animal) => animal.id === characterData.animal
  );
  const selectedEmotion = emotions.find(
    (emotion) => emotion.id === characterData.emotion
  );
  const selectedAccessory = accessories.find(
    (accessory) => accessory.id === characterData.accessory
  );

  const handlePrevious = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleNext = () => {
    console.log("캐릭터 생성 완료!");
    // TODO: 다음 페이지로 이동하거나 완료 처리
  };

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="p-6 w-full bg-gray-200/70 rounded-[40px] mt-20 mb-24">
        {/* Header */}
        <div className="flex flex-col mb-6">
          <h1 className="mb-4 title-inter">상상친구 완성!</h1>
          <p className="subtitle text-secondary-100">
            멋진 상상친구가 완성되었어요!
            <br />
            함께 공연을 즐겨보세요.
          </p>
        </div>
        <hr className="my-4 mb-6 border-secondary-100/30" />

        {/* 완성된 캐릭터 표시 */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex relative z-10 flex-col items-center">
            <div className="flex justify-center">
              {selectedAnimal && (
                <selectedAnimal.bodyIcon className="w-[147px] h-[224px] relative z-20" />
              )}
            </div>
            <Shadow className="w-[200px] h-[50px] mt-[-25px] relative z-10" />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex flex-col items-start">
            <div className="flex gap-1 items-center">
              <PlayingCardsIcon className="w-[13px] h-[13px]" />
              <p>
                {selectedPerformance ? selectedPerformance.title : "공연이름"}
              </p>
            </div>
            <div className="flex gap-1 items-center">
              <Calendar className="w-[13px] h-[13px] flex-shrink-0" />
              <p className="whitespace-nowrap">{selectedDate || "선택날짜"}</p>
            </div>
          </div>
        </div>

        <hr className="my-4 mb-6 border-secondary-100/30" />

        <p className="mb-4 Inter">상상친구 이름 지어주기</p>
        <p className="subtitle text-secondary-100">
          축하해요 😍 <br />
          공연 경험을 함께 추억해줄 상상친구가 완성되었어요! <br />
          이제 이 상상친구의 이름을 지어주세요.
        </p>

        <input
          type="text"
          placeholder="이름을 입력하세요..."
          className="p-4 mt-5 w-full h-10 subtitle text-gray-700 bg-transparent border border-secondary-100/30 outline-none body-inter rounded-[20px] focus:border-secondary-100/50 transition-colors duration-200"
        />

        {/* 네비게이션 버튼 */}
        <div className="mt-8">
          <NavigationButtons
            onPrevious={handlePrevious}
            onNext={handleNext}
            isNextDisabled={false}
            nextText="완료"
          />
        </div>
      </div>
    </div>
  );
};

export default CharacterPreview;
