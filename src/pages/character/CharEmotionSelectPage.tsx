import React from "react";
import { ReviewContainer } from "@/shared/components/Layout/ReviewContainer";
import { Desc } from "@/domains/playroom/components/Desc";
import { REVIEW_FLOW } from "@/shared/routes/flow";
import { EmotionId } from "@/domains/playroom/constants/animals";

import { AnimalPreview } from "@/domains/playroom/components/AnimalPreview";
import {
  SingleSelectGroup,
  SingleSelectItem,
} from "@/shared/components/SingleSelect";
import { RadioTrue, RadioFalse } from "@/assets/icons";
import { emotions } from "@/domains/playroom/constants/animals";
import { useCharaterFlowState } from "@/domains/playroom/hooks/useCharacterFlowState";

export const CharEmotionSelectPage: React.FC = () => {
  const {
    selectedAnimal,
    selectedValue: selectedEmotion,
    setSelectedValue: setSelectedEmotion,
    isAnimating,
  } = useCharaterFlowState<EmotionId>({
    stepName: "emotion",
    initialValue: emotions[0].id,
  });

  return (
    <ReviewContainer title="상상친구 만들기" flow={REVIEW_FLOW}>
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
