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

//이름 필드에 적용할 정규표현식 정의
//1. 한글, 영문, 공백만 허용 (특수문자, 숫자, 이모지 금지)
const NAME_ALLOWED_REGEX = /^[\uac00-\ud7a3a-zA-Z\s]+$/;
//2. 순수 한글 문자열(공백이 없는 한글만 있는지 화깅ㄴ - 길이 제한 구분에 사용)
const HANGUL_OR_SPACE_ONLY_REGEX = /^[\uac00-\ud7a3\s]+$/;

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
        rules={{
          required: "아이 이름은 필수입니다.",
          validate: {
            //1. 연속 공백 및 허용되지 않은 문자 검사
            invalidChars: (value) => {
              const trimmedValue = value.trim();

              if (trimmedValue.length === 0) {
                return "이름을 입력해주세요.";
              }
              //연속된 공백 검사(공백 2개 이상)
              if (/\s{2,}/.test(value)) {
                return "연속된 공백은 허용되지 않습니다.";
              }
              //허용되지 않은 문자 검사(한글, 영문, 공백 외 모두 금지)
              if (!NAME_ALLOWED_REGEX.test(value)) {
                return "한글, 영문(대/소문자), 공백만 허용됩니다.";
              }
              return true;
            },
            //2. 길이 제한 검사 (한글/영문 구분)
            lengthCheck: (value) => {
              const trimmedValue = value.trim();

              //입력된 이름이 순수 한글로만 이루어져 있는지 (띄어쓰기가 없는 경우)
              if (HANGUL_OR_SPACE_ONLY_REGEX.test(trimmedValue)) {
                //한글 이름: 최소 2자~ 최대 5자
                if (trimmedValue.length < 2 || trimmedValue.length > 5) {
                  return "한글 이름은 최소 2자, 최대 5자까지 가능합니다.";
                }
              } //영문, 한글 +영문 혼합, 띄어쓰기가 있는 한글 이름 (영문 이름 적용)
              else {
                //영문 이름 : 최소 2자~ 최대 20자 (공백 포함)
                if (trimmedValue.length < 2 || trimmedValue.length > 20) {
                  return "영문 도는 혼용 이름은 최소 2자, 최대 20자까지 가능합니다.";
                }
              }
            },
          },
        }}
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
