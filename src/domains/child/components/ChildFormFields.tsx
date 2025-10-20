import React from "react";
import { Controller, FieldErrors, UseFormReturn } from "react-hook-form";
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
} from "@/domains/child/hooks/useChildRegistration";
type ProfileValue = ChildFormValues["selectedProfile"];

const NAME_ALLOWED_REGEX = /^[\uac00-\ud7a3a-zA-Z\s]+$/;
const HANGUL_OR_SPACE_ONLY_REGEX = /^[\uac00-\ud7a3\s]+$/;

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
  errors: FieldErrors<ChildFormValues>;
  isDuplicateName: (value: string) => boolean;
  isLimitReached: boolean;
  maxChildrend: number;
};

const getMaxLength = (trimmedValue: string): number => {
  if (HANGUL_OR_SPACE_ONLY_REGEX.test(trimmedValue)) {
    return 5;
  }
  return 20;
};

export const ChildFormFields = ({
  control,
  formValues,
  setValue,
  isDuplicateName,
}: ChildFormFieldsProps) => {
  //입력 제한 핸들러
  const handleNameChange = (
    newValue: string,
    rhfOnChange: (value: string) => void
  ) => {
    const MAX_LENGTH_WITH_SPACES = getMaxLength(newValue);
    if (newValue.length > MAX_LENGTH_WITH_SPACES) {
      const finalValue = newValue.substring(0, MAX_LENGTH_WITH_SPACES);
      rhfOnChange(finalValue);
    } else {
      rhfOnChange(newValue);
    }
  };

  return (
    <React.Fragment>
      {/* 1. 아이 정보 카드 */}
      <Controller
        control={control}
        name="name"
        rules={{
          required: "아이 이름은 필수 입력입니다.",
          validate: {
            invalidChars: (value) => {
              const trimmedValue = value.trim();

              if (trimmedValue.length === 0) {
                return "이름을 입력해주세요.";
              }
              if (/\s{2,}/.test(value)) {
                return "연속된 공백은 허용되지 않습니다.";
              }
              if (!NAME_ALLOWED_REGEX.test(value)) {
                return "한글, 영문(대/소문자), 공백만 허용됩니다.";
              }
              return true;
            },

            lengthCheck: (value) => {
              const trimmedValue = value.trim();

              if (HANGUL_OR_SPACE_ONLY_REGEX.test(value)) {
                if (trimmedValue.length < 2 || trimmedValue.length >= 5) {
                  return "한글 이름은 (띄어쓰기 포함) 최소 2자, 최대 5자까지 가능합니다.";
                }
              } else {
                if (trimmedValue.length < 2 || trimmedValue.length >= 20) {
                  return "영문 또는 혼용 이름은 최소 2자, 최대 20자까지 가능합니다.";
                }
              }
              return true;
            },

            //즉시 중복 검사
            duplicateCheck: (value) =>
              isDuplicateName(value) ? "이미 등록된 이름이에요" : true,
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <div className="space-y-2">
            <ChildInforRegistCard
              nameValue={field.value}
              nameOnChange={(value) => handleNameChange(value, field.onChange)}
              nameOnBlur={field.onBlur}
              nameRef={field.ref}
              nameErrorMessage={error?.message}
              birthValue={{
                year: formValues.birthYear,
                month: formValues.birthMonth,
                day: formValues.birthDay,
              }}
              setBirth={(newBirth: Birth) => {
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
          </div>
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
