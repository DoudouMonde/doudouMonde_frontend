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
  setSelectedValue: React.Dispatch<React.SetStateAction<T>>;
  isAnimating: boolean;
}

const retrieveInitialValue = <T extends SelectionId>(
  key: string,
  locationStateValue: T | undefined,
  defaultValue: T
): T => {
  if (locationStateValue) return locationStateValue;

  const storedValue = sessionStorage.getItem(key);
  if (storedValue) return storedValue as T;

  return defaultValue;
};

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

  const initialCurrentValue = retrieveInitialValue<T>(
    storageKey,
    location.state?.[stepName as keyof typeof location.state] as T | undefined,
    initialValue
  );

  const [selectedValue, setSelectedValue] = useState<T>(initialCurrentValue);

  useEffect(() => {
    sessionStorage.setItem(storageKey, selectedValue as string);
  }, [selectedValue, storageKey]);

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [initialAnimal, initialEmotion, selectedValue]);

  return {
    selectedAnimal: initialAnimal,
    selectedEmotion: initialEmotion,
    selectedValue,
    setSelectedValue,
    isAnimating,
    selectedAcc: selectedValue as AccessoryId,
  };
};
