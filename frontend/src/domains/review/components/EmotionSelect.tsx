import React, { useEffect, useState } from "react";
import { Desc } from "@/domains/playroom/components/Desc";
import { AnimalId, animals, EmotionId } from "@/domains/playroom/constants/animals";

import { AnimalPreview } from "@/domains/playroom/components/AnimalPreview";
import {
  SingleSelectGroup,
  SingleSelectItem,
} from "@/shared/components/SingleSelect";
import { RadioTrue, RadioFalse } from "@/assets/icons";
import { emotions } from "@/domains/playroom/constants/animals";
import { STEP_FIELDS, StepField } from "../utils/stepConfig";
import { NewReviewData } from "@/pages/review/ReviewFunnelPage";

type EmotionData = StepField<NewReviewData, typeof STEP_FIELDS.emotionSelect >;

type EmotionSelectProps ={
  data: EmotionData,
  onChange: (patch :{
    emotionOption : EmotionId;
  }) => void;
  onValidityChange?: (ok: boolean) => void;
}


export const EmotionSelect= ({data, onChange, onValidityChange} : EmotionSelectProps) => {

      const initialEmotion = emotions.find(

              (a) => (a.id) === data.emotionOption
         )?.id ?? emotions[0].id;

      // const selectedAnimal = data.typeOption ?? CharacterType.CHICK;
      const selectedAnimal : AnimalId = (
  data.typeOption ?? animals[0].id
);
      const [selectedEmotion, setSelectedEmotion] = React.useState<EmotionId>(initialEmotion);
      const [isAnimating, setIsAnimating] = useState(false);
  
      const handleSelect = (value: string | number) => {
        const emotionId = value as EmotionId ;
        setSelectedEmotion(emotionId);
                  onChange({emotionOption: (emotionId)});
  
            onValidityChange?.(true);
      }
  
      useEffect(() => {
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 600);
        return () => clearTimeout(timer);
      }, [initialEmotion]);

  return (
    <div>
      <Desc
        content={
          <>
            좋은 선택이에요! <br /> 이제 감정을 기록해줄 표정을 선택해주세요.
          </>
        }
      />
      <AnimalPreview
        step="emotion"
        isAnimating={isAnimating}
        selectedAnimal={selectedAnimal}
        selectedEmotion={selectedEmotion}
      />
      <hr className="my-4 mb-7 border-secondary-100/30" />

      <SingleSelectGroup
        selectedValue={selectedEmotion}
        onChange={handleSelect}
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
    </div>
  );
};
