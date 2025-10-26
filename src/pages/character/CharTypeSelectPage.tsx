import React, { useState, useEffect } from "react";
import { ReviewContainer } from "@/shared/components/Layout/ReviewContainer";
import { useHydrateReviewFromStorage } from "@/domains/playroom/hooks/useHydrateReviewFromStorage";
import { animals } from "@/domains/playroom/constants/animals";
import { AnimalPreview } from "@/domains/playroom/components/AnimalPreview";
import { AnimalId } from "@/domains/playroom/constants/animals";
import {
  SingleSelectGroup,
  SingleSelectItem,
} from "@/shared/components/SingleSelect";
import { REVIEW_FLOW } from "@/shared/routes/flow";
import { Desc } from "@/domains/playroom/components/Desc";
import { AnimalOption } from "@/domains/playroom/components/AnimalOption";

export const CharTypeSelectPage: React.FC = () => {
  useHydrateReviewFromStorage();

  const [selectedAnimal, setSelectedAnimal] = useState<AnimalId>("chick");
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [selectedAnimal]);

  return (
    <ReviewContainer title="상상친구 만들기" flow={REVIEW_FLOW}>
      {/* Header */}
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
        isAnimating={isAnimating}
        selectedAnimal={selectedAnimal}
      />
      <hr className="my-4 mb-7 border-secondary-100/30" />

      <div>
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
    </ReviewContainer>
  );
};
