import { useLocation } from "react-router-dom";
import { AccessoryId, AnimalId, EmotionId } from "../constants/animals";
import { animals, emotions, accessories } from "../constants/animals";
import { useState, useEffect } from "react";

type SelectionId = AnimalId | EmotionId | AccessoryId;

interface UseCharacterFlowStateProps<T extends SelectionId> {
  stepName: "animal" | "emotion" | "accessory";
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

//이전 단계의 값을 복구하는 헬퍼 함수
//무슨 뜻인지 모르겠긴 한데 다시 수정할 것 같아서...
const retrieveInitialValue = <T extends SelectionId>(
  key: string,
  locationStateValue: T | undefined,
  defaultValue: T
): T => {
  return (
    (locationStateValue as T) ??
    (localStorage.getItem(key) as T | null) ??
    defaultValue
  );
};

//타입이 많이 붙는데 무슨 말인지 모르겠다.
export const useCharaterFlowState = <T extends SelectionId>({
  stepName,
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
    animals[0].id // 'chick'
  );

  const initialEmotion = retrieveInitialValue<EmotionId>(
    "selectedEmotion",
    location.state?.emotion,
    emotions[0].id // 'happy' 또는 'emotions[0].id'
  );

  const initialAcc = retrieveInitialValue<AccessoryId>(
    "selectedAccessory",
    location.state?.accessory,
    accessories[0].id
  );

  // 2. 현재 단계의 선택 값 State
  const [selectedValue, setSelectedValue] = useState<T>(
    stepName === "accessory" ? (initialAcc as T) : initialValue
  );

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
