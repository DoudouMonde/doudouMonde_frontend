import React from "react";
import { Controller, FieldErrors, UseFormReturn } from "react-hook-form";
import { ChildFormValues } from "../types/childForm";
import { NameSection } from "./NameSection";
import {
  NAME_ALLOWED_REGEX,
  HANGUL_OR_SPACE_ONLY_REGEX,
} from "../constants/childRegistration";

type InforInputSectionProps = {
  control: UseFormReturn<ChildFormValues>["control"];
  formValues: ChildFormValues;
  setValue: UseFormReturn<ChildFormValues>["setValue"];
  errors: FieldErrors<ChildFormValues>;
  isDuplicateName: (value: string) => boolean;
};

export const BasicInforInputSection = ({
  control,
  formValues,
  setValue,
  errors,
  isDuplicateName,
}: InforInputSectionProps) => {
  return (
    <>
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
    </>
  );
};
