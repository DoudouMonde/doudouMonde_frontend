import { animals } from "@/domains/playroom/constants/animals";
import { AnimalPreview } from "@/domains/playroom/components/AnimalPreview";
import { AnimalId } from "@/domains/playroom/constants/animals";
import {
  SingleSelectGroup,
  SingleSelectItem,
} from "@/shared/components/SingleSelect";
import { Desc } from "@/domains/playroom/components/Desc";
import { AnimalOption } from "@/domains/playroom/components/AnimalOption";
import { STEP_FIELDS, StepField } from "../utils/stepConfig";
import { NewReviewData } from "@/pages/review/ReviewFunnelPage";
import { useSelectOption } from "../hooks/useCharacterOption";

type TypeData = StepField<NewReviewData, typeof STEP_FIELDS.typeSelect>;

type TypeSelectProps ={
  data: TypeData,
  onChange: (patch :{
    typeOption : AnimalId;
  }) => void;
  onValidityChange?: (ok: boolean) => void;
}



export const TypeSelect = ( {data, onChange, onValidityChange} : TypeSelectProps) => {


    const {selected, handleSelect, isAnimating} = useSelectOption({
      list: animals,
      currentValue: data.typeOption,
      onChange: (id) => onChange({typeOption: id}),
      onValidityChange,
    })


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
        selectedAnimal={selected}
      />
      <hr className="my-4 mb-7 border-secondary-100/30" />

      <SingleSelectGroup
        selectedValue={selected}
        onChange={handleSelect}
      >
        <div className="grid grid-cols-3 gap-4 mb-4 sm:gap-6 md:gap-8 lg:gap-12">
          {animals.slice(0, 3).map((animal) => {
            const active = selected === animal.id;
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
            const active = selected === animal.id;
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
