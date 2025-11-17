import React, { useEffect, useState } from "react";
import { AccessoryId, AnimalId, animals, EmotionId, emotions } from "@/domains/playroom/constants/animals";
import { Desc } from "@/domains/playroom/components/Desc";
import { AnimalPreview } from "@/domains/playroom/components/AnimalPreview";
import { SingleSelectGroup } from "@/shared/components";
import { accessories } from "@/domains/playroom/constants/animals";
import { SingleSelectItem } from "@/shared/components";
import { RadioFalse, RadioTrue } from "@/assets/icons";
import { useCharaterFlowState } from "@/domains/playroom/hooks/useCharacterFlowState";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/shared/constants";
import { STEP_FIELDS, StepField } from "../utils/stepConfig";
import { NewReviewData } from "@/pages/review/ReviewFunnelPage";

type AccData = StepField<NewReviewData, typeof STEP_FIELDS.accSelect >;

type AccSelectProps ={
  data: AccData,
  onChange: (patch :{
    accOption : AccessoryId;
  }) => void;
  onValidityChange?: (ok: boolean) => void;
}

export const AccSelect = ({data, onChange, onValidityChange} : AccSelectProps) => {

  
        const initialAcc = accessories.find(
  
                (a) => (a.id) === data.accOption
           )?.id ?? accessories[0].id;
  
           //이전에 선택했던 항목들 불러오기
        const selectedAnimal : AnimalId = (
    data.typeOption ?? animals[0].id
  );

          const selectedEmotion : EmotionId = (
    data.emotionOption ?? emotions[0].id
  );
        const [selectedAcc, setSelectedAcc] = React.useState<AccessoryId>(initialAcc);
        const [isAnimating, setIsAnimating] = useState(false);
    
        const handleSelect = (value: string | number) => {
          const accessoryId = value as AccessoryId ;
          setSelectedAcc(accessoryId);
                    onChange({accOption: (accessoryId)});
    
              onValidityChange?.(true);
        }
    
        useEffect(() => {
          setIsAnimating(true);
          const timer = setTimeout(() => setIsAnimating(false), 600);
          return () => clearTimeout(timer);
        }, [initialAcc]);
  

  return (
    <div>
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
        selectedAcc={selectedAcc}
      />
      <hr className="my-4 mb-7 border-secondary-100/30" />

      <SingleSelectGroup
        selectedValue={selectedAcc}
        onChange={handleSelect}
      >
        <div className="grid grid-cols-3 gap-3 mb-4">
          {accessories.map((acc) => {
            const Icon = acc.icon;
            const active = selectedAcc === acc.id;
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
    </div>
  );
};
