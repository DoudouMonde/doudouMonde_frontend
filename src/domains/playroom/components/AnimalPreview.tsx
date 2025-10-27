import React from "react";
type SvgComponentType = React.ComponentType<{ className?: string }>;

import { Shadow } from "@/assets/icons/playroom";
import { animals } from "@/domains/playroom/constants/animals";
import { ChickBody } from "@/assets/icons/playroom/type_body";
import {
  getEmotionCharacter,
  getAccessoryCharacter,
} from "../utils/characterHelpers";

export interface AnimalPreviewProps {
  step: "animal" | "emotion" | "accessory";
  selectedAnimal: string;
  selectedEmotion?: string;
  selectedAcc?: string;
  isAnimating: boolean;
}

export const AnimalPreview = ({
  step,
  selectedAnimal,
  selectedEmotion,
  selectedAcc,
  isAnimating,
}: AnimalPreviewProps) => {
  const emotion = selectedEmotion ?? "";
  const accessory = selectedAcc ?? "";

  let FinalCharacterComponent: SvgComponentType;

  if (step === "accessory") {
    const AccessoryCharacter = getAccessoryCharacter(
      selectedAnimal,
      emotion,
      accessory
    );
    if (AccessoryCharacter) {
      FinalCharacterComponent = AccessoryCharacter;
    } else {
      const EmotionCharacter = getEmotionCharacter(selectedAnimal, emotion);
      FinalCharacterComponent = EmotionCharacter ?? ChickBody;
    }
  } else if (step === "emotion") {
    const EmotionCharacter = getEmotionCharacter(selectedAnimal, emotion);
    FinalCharacterComponent = EmotionCharacter ?? ChickBody;
  } else {
    const selectedAnimalData = animals.find(
      (animal) => animal.id === selectedAnimal
    );
    FinalCharacterComponent = selectedAnimalData?.bodyIcon || ChickBody;
  }
  const finalClassName = `w-[350px] h-[250px] relative z-20 ${
    isAnimating ? "animate-gentle-bounce" : ""
  }`;

  return (
    <div className="flex relative z-10 flex-col items-center">
      <div className="flex justify-center">
        <FinalCharacterComponent className={finalClassName} />
      </div>
      <Shadow className="w-[147px] h-[40px] mt-[-40px] relative z-10" />
    </div>
  );
};
