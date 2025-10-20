// src/domains/child/components/ChildFormFields.tsx (예시 경로)

import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { MultiRadio } from "@/shared/components/Radio";
import { MultiSelectCard } from "@/shared/components/MultiSelect/MultiSelectCard";
import { GridSelectCard } from "@/shared/components/GridSelectCard";
import { ChildInforRegistCard } from "@/shared/components/Child/ChildInforRegistCard";
import { ChildTraitOptions } from "@/domains/child/components/TraitSelector";
import { GENRES } from "@/shared/constants/genres";
import { PROFILE_OPTIONS_UI } from "@/shared/ui/profile/profileOptions";
import {
  ChildFormValues,
  Birth,
} from "@/domains/child/hooks/useChildRegistration"; // 타입 임포트

type ProfileValue = ChildFormValues["selectedProfile"];

// 헬퍼 컴포넌트는 이곳에 남겨두거나 별도 파일로 분리할 수 있습니다.
const TraitSelector = () => <ChildTraitOptions />;
const GenreSelector = () => (
  <div className="grid grid-cols-2 gap-3">
    {GENRES.map((genre) => (
      <MultiRadio key={genre.value} label={genre.label} value={genre.value} />
    ))}
  </div>
);

type ChildFormFieldsProps = {
  control: UseFormReturn<ChildFormValues>["control"];
  formValues: ChildFormValues;
  setValue: UseFormReturn<ChildFormValues>["setValue"];
};

export const ChildFormFields = ({
  control,
  formValues,
  setValue,
}: ChildFormFieldsProps) => {
  return (
    <React.Fragment>
      {/* 1. 아이 정보 카드 */}
      <Controller
        control={control}
        name="name"
        rules={{ required: "아이 이름은 필수입니다." }}
        render={({ field }) => (
          <ChildInforRegistCard
            nameValue={field.value}
            nameOnChange={field.onChange}
            nameOnBlur={field.onBlur}
            nameRef={field.ref}
            birthValue={{
              year: formValues.birthYear,
              month: formValues.birthMonth,
              day: formValues.birthDay,
            }}
            setBirth={(newBirth: Birth) => {
              // Birth 타입을 명시적으로 지정
              setValue("birthYear", newBirth.year, {
                shouldValidate: true,
                shouldDirty: true,
              });
              setValue("birthMonth", newBirth.month, {
                shouldValidate: true,
                shouldDirty: true,
              });
              setValue("birthDay", newBirth.day, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
            genderValue={formValues.gender}
            setGender={(value) => {
              setValue("gender", value, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
          />
        )}
      />

      {/* 2. 아이 성향 선택 카드 */}
      <Controller
        control={control}
        name="selectedTraits"
        rules={{ required: "성향은 최소 1개 이상 선택해야 합니다." }}
        render={({ field }) => (
          <MultiSelectCard
            title="아이 성향"
            subtitle="아이의 해당되는 특성을 선택해주세요."
            selectedValues={field.value}
            onChange={field.onChange}
          >
            <TraitSelector />
          </MultiSelectCard>
        )}
      />

      {/* 3. 장르 선택 카드 */}
      <Controller
        control={control}
        name="selectedGenres"
        rules={{ required: "장르는 최소 1개 이상 선택해야 합니다." }}
        render={({ field }) => (
          <MultiSelectCard
            title="좋아하는 장르"
            subtitle="좋아하는 장르를 선택해주세요."
            selectedValues={field.value}
            onChange={field.onChange}
          >
            <GenreSelector />
          </MultiSelectCard>
        )}
      />

      {/* 4. 프로필 사진 선택 */}
      <Controller
        control={control}
        name="selectedProfile"
        rules={{ required: "프로필 사진은 필수 선택입니다." }}
        render={({ field }) => (
          <GridSelectCard<ProfileValue>
            title="프로필 사진 선택"
            subtitle="아이의 프로필로 사용할 귀여운 캐릭터를 골라주세요."
            options={PROFILE_OPTIONS_UI}
            selected={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </React.Fragment>
  );
};
