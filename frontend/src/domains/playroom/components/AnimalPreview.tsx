import React from "react";
type SvgComponentType = React.ComponentType<{ className?: string }>;

import { Shadow } from "@/assets/icons/playroom";
import {
  AccessoryId,
  AnimalId,
  animals,
  EmotionId,
} from "@/domains/playroom/constants/animals";
import { ChickBody } from "@/assets/icons/playroom/type_body";
import {
  getEmotionCharacter,
  getAccessoryCharacter,
} from "../utils/characterHelpers";

export interface AnimalPreviewProps {
  step: "animal" | "emotion" | "accessory";
  size?: "small" | "normal";
  selectedAnimal: AnimalId;
  selectedEmotion?: EmotionId;
  selectedAcc?: AccessoryId;
  isAnimating: boolean;
  isShadow?: boolean;
}

export const AnimalPreview = ({
  step,
  size = "normal",
  selectedAnimal,
  selectedEmotion,
  selectedAcc,
  isAnimating,
  isShadow = true,
}: AnimalPreviewProps) => {
  const emotion = selectedEmotion ?? "";
  const accessory = selectedAcc ?? "";

  let FinalCharacterComponent: SvgComponentType = ChickBody;

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
      FinalCharacterComponent = EmotionCharacter ?? FinalCharacterComponent;
    }
  } else if (step === "emotion") {
    const EmotionCharacter = getEmotionCharacter(selectedAnimal, emotion);
    FinalCharacterComponent = EmotionCharacter ?? FinalCharacterComponent;
  } else {
    const selectedAnimalData = animals.find(
      (animal) => animal.id === selectedAnimal
    );
    FinalCharacterComponent =
      selectedAnimalData?.bodyIcon || FinalCharacterComponent;
  }

  const sizeClass =
    size === "small" ? "w-[100px] h-[90px]" : "w-[350px] h-[250px]";

  const finalClassName = `${sizeClass} relative z-20 ${
    isAnimating ? "animate-gentle-bounce" : ""
  }`;

  return (
    <div className="flex relative z-10 flex-col items-center">
      <div className="flex justify-center">
        <FinalCharacterComponent className={finalClassName} />
      </div>
      {isShadow ?? (
        <Shadow className="w-[147px] h-[40px] mt-[-40px] relative z-10" />
      )}
    </div>
  );
};
