import { useLocation } from "react-router-dom";
import { AccessoryId, AnimalId, EmotionId } from "../constants/animals";
import { animals, emotions, accessories } from "../constants/animals";
import { useState, useEffect } from "react";

type SelectionId = AnimalId | EmotionId | AccessoryId;

interface UseCharacterFlowStateProps<T extends SelectionId> {
  stepName: "animal" | "emotion" | "accessory";
  storageKey: string; // Seession Storage 키 추가
  initialValue: T;
}

interface CharacterFlowState<T extends SelectionId> {
  selectedAnimal: AnimalId;
  selectedEmotion: EmotionId;
  selectedAcc: AccessoryId;
  selectedValue: T;
  setSelectedValue: React.Dispatch<React.SetStateAction<T>>; //이게 무엇인가
  isAnimating: boolean;
}

//Session Storage에서 초기값을 가져오는 헬퍼 함수
//타입이 엄청 많은데 뭔지 잘 모르겠다.
const retrieveInitialValue = <T extends SelectionId>(
  key: string,
  locationStateValue: T | undefined,
  defaultValue: T
): T => {
  //1. location.state에서 우선 복구(세션 이동) -> 무슨 뜻이지?
  if (locationStateValue) return locationStateValue;

  //2. sessionStorage에서 복구 (새로고침)
  const storedValue = sessionStorage.getItem(key);
  if (storedValue) return storedValue as T; //as가 무엇인지

  //3. 기본값
  return defaultValue;
};

//타입이 많이 붙는데 무슨 말인지 모르겠다.
export const useCharaterFlowState = <T extends SelectionId>({
  stepName,
  storageKey,
  initialValue,
}: UseCharacterFlowStateProps<T>): CharacterFlowState<T> => {
  const location = useLocation() as {
    state?: {
      animal?: AnimalId;
      emotion?: EmotionId;
      accessory?: AccessoryId;
    };
  };

  // 1. 이전 단계 값 복구 (동물, 감정)
  const initialAnimal = retrieveInitialValue<AnimalId>(
    "selectedAnimal",
    location.state?.animal,
    animals[0].id
  );

  const initialEmotion = retrieveInitialValue<EmotionId>(
    "selectedEmotion",
    location.state?.emotion,
    emotions[0].id
  );

  const initialAcc = retrieveInitialValue<AccessoryId>(
    "selectedAccessory",
    location.state?.accessory,
    accessories[0].id
  );

  //2. 현재 단계의 선택 값 State
  //어떤 로직이지? 현재 값을 session에 저장하는 과정인건가?
  const initialCurrentValue = retrieveInitialValue<T>(
    storageKey,
    location.state?.[stepName as keyof typeof location.state], //이 줄이 어떤 의미인지 잘 모르겠다.
    initialValue
  );

  // 2. 현재 단계의 선택 값 State
  const [selectedValue, setSelectedValue] = useState<T>(initialValue);

  //현재 선택된 값이 바뀔 때마다 session Storage에 저장
  useEffect(() => {
    sessionStorage.setItem(storageKey, selectedValue as string);
  }, [selectedValue, storageKey]);

  // 3. 애니메이션 State
  const [isAnimating, setIsAnimating] = useState(false);

  // 4. 애니메이션 useEffect 로직 (useSelectAnimation 대체)
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [initialAnimal, initialEmotion, selectedValue]); // 모든 관련 값이 바뀔 때 애니메이션

  return {
    selectedAnimal: initialAnimal,
    selectedEmotion: initialEmotion,
    selectedValue,
    setSelectedValue,
    isAnimating,
    selectedAcc: selectedValue as AccessoryId,
  };
};
