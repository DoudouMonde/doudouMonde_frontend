import React from "react";
import { animals } from "@/domains/playroom/constants/animals";
import { AnimalPreview } from "@/domains/playroom/components/AnimalPreview";
import { AnimalId } from "@/domains/playroom/constants/animals";
import {
  SingleSelectGroup,
  SingleSelectItem,
} from "@/shared/components/SingleSelect";
import { Desc } from "@/domains/playroom/components/Desc";
import { AnimalOption } from "@/domains/playroom/components/AnimalOption";
import { useCharaterFlowState } from "@/domains/playroom/hooks/useCharacterFlowState";
import { PATH } from "@/shared/constants";
import { useNavigate } from "react-router-dom";

export const TypeSelect: React.FC = () => {
  const navigate = useNavigate(); //useNavigate 초기화

  const {
    selectedValue: selectedAnimal,
    setSelectedValue: setSelectedAnimal,
    isAnimating,
  } = useCharaterFlowState<AnimalId>({
    stepName: "animal",
    storageKey: "selectedAnimal", //session storage 키 추가
    initialValue: animals[0].id,
  });

  //다음 페이지로 이동하고 현재 선택 값을 state로 전달
  const handleNext = () => {
    navigate(PATH.CHAR_EMOTION, {
      state: {
        animal: selectedAnimal,
      },
    });
  };

  return (
    <div>
      <Desc
        content={
          <>
            오늘 공연을 함께 기억할 상상친구를 만들어 보세요.
            <br />
            먼저 친구 종류를 선택해볼까요?
          </>
        }
      />

      <AnimalPreview
        step="animal"
        isAnimating={isAnimating}
        selectedAnimal={selectedAnimal}
      />
      <hr className="my-4 mb-7 border-secondary-100/30" />

      <SingleSelectGroup
        selectedValue={selectedAnimal}
        onChange={(value) => setSelectedAnimal(value as AnimalId)}
      >
        <div className="grid grid-cols-3 gap-4 mb-4 sm:gap-6 md:gap-8 lg:gap-12">
          {animals.slice(0, 3).map((animal) => {
            const active = selectedAnimal === animal.id;
            return (
              <SingleSelectItem key={animal.id} value={animal.id}>
                <AnimalOption
                  name={animal.name}
                  HeadIcon={animal.headIcon}
                  active={active}
                />
              </SingleSelectItem>
            );
          })}
        </div>

        <div className="flex gap-4 justify-center sm:gap-6 md:gap-8 lg:gap-12">
          {animals.slice(3, 5).map((animal) => {
            const active = selectedAnimal === animal.id;
            return (
              <SingleSelectItem key={animal.id} value={animal.id}>
                <AnimalOption
                  name={animal.name}
                  HeadIcon={animal.headIcon}
                  active={active}
                />
              </SingleSelectItem>
            );
          })}
        </div>
      </SingleSelectGroup>
    </div>
  );
};
