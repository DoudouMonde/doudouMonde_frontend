import React from "react";
import { Controller, FieldErrors, UseFormReturn } from "react-hook-form";
import { ChildFormValues } from "../types/childForm";
import { NameSection } from "./NameSection";
import { TraitSelectorSection } from "./TraitSelectorSection";
import { GenreSelectorSection } from "./GenreSelectorSection";
import { ProfileSelectorSection } from "./ProfileSelectorSection";
import {
  NAME_ALLOWED_REGEX,
  HANGUL_OR_SPACE_ONLY_REGEX,
} from "../constants/childRegistration";

type ChildFormFieldsProps = {
  control: UseFormReturn<ChildFormValues>["control"];
  formValues: ChildFormValues;
  setValue: UseFormReturn<ChildFormValues>["setValue"];
  errors: FieldErrors<ChildFormValues>;
  isDuplicateName: (value: string) => boolean;
  isLimitReached: boolean;
  maxChildrend: number;
};

export const ChildFormFields = ({
  control,
  formValues,
  setValue,
  errors,
  isDuplicateName,
}: ChildFormFieldsProps) => {
  return (
    <>
      {/* 이름, 생년월일, 성별 */}
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
            duplicateCheck: (value) =>
              isDuplicateName(value) ? "이미 등록된 이름이에요" : true,
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <NameSection
            field={field}
            error={error}
            formValues={formValues}
            setValue={setValue}
            errors={errors}
            isDuplicateName={isDuplicateName}
          />
        )}
      />

      {/* ✅ 유효성 검사를 위한 추가 필드 */}
      <Controller
        control={control}
        name="birthYear"
        rules={{ required: "생년월일(년)은 필수 입력입니다." }}
        render={() => <></>}
      />
      <Controller
        control={control}
        name="birthMonth"
        rules={{ required: "생년월일(월)은 필수 입력입니다." }}
        render={() => <></>}
      />
      <Controller
        control={control}
        name="birthDay"
        rules={{ required: "생년월일(일)은 필수 입력입니다." }}
        render={() => <></>}
      />
      <Controller
        control={control}
        name="gender"
        rules={{ required: "성별은 필수 입력입니다." }}
        render={() => <></>}
      />

      {/* 성향 / 장르 / 프로필 선택 */}
      <TraitSelectorSection control={control} />
      <GenreSelectorSection control={control} />
      <ProfileSelectorSection control={control} />
    </>
  );
};
