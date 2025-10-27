import React from "react";
import { AccessoryId } from "@/domains/playroom/constants/animals";
import { ReviewContainer } from "@/shared/components/Layout/ReviewContainer";
import { REVIEW_FLOW } from "@/shared/routes/flow";
import { Desc } from "@/domains/playroom/components/Desc";
import { AnimalPreview } from "@/domains/playroom/components/AnimalPreview";
import { SingleSelectGroup } from "@/shared/components";
import { accessories } from "@/domains/playroom/constants/animals";
import { SingleSelectItem } from "@/shared/components";
import { RadioFalse, RadioTrue } from "@/assets/icons";
import { useCharaterFlowState } from "@/domains/playroom/hooks/useCharacterFlowState";

export const CharAccSelectPage: React.FC = () => {
  const {
    selectedAnimal,
    selectedEmotion,
    selectedValue: selectedAccessory,
    setSelectedValue: setSelectedAccessory,
    isAnimating,
  } = useCharaterFlowState<AccessoryId>({
    stepName: "accessory",
    initialValue: accessories[0].id,
  });

  return (
    <ReviewContainer title="상상친구 만들기" flow={REVIEW_FLOW}>
      <Desc
        content={
          <>
            이제 상상친구를 예쁘게 꾸며줄 액세서리를 골라주세요. <br />
            액세서리는 생략할 수 있어요.
          </>
        }
      />
      <AnimalPreview
        step="accessory"
        isAnimating={isAnimating}
        selectedAnimal={selectedAnimal}
        selectedEmotion={selectedEmotion}
        selectedAcc={selectedAccessory}
      />
      <hr className="my-4 mb-7 border-secondary-100/30" />

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
