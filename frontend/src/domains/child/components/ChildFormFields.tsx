// ChildFormFields.tsx
import React from "react";
import { useController, Controller } from "react-hook-form";

import { ChildInfoRegistCard } from "@/shared/components/Child/ChildInfoRegistCard";
import { GridSelectCard } from "@/shared/components/GridSelectCard";
import { PROFILE_OPTIONS_UI } from "@/shared/ui/profile/profileOptions";

import { ChildFormValues, Birth } from "../types/childForm";
import { useNameValidation } from "../hooks/useNameValidation";
import { useChildRegistrationContext } from "../contexts/ChildRegistrationContext";

type ProfileValue = ChildFormValues["selectedProfile"];

export const ChildFormFields = () => {
  const { control, formValues, setValue, errors } =
    useChildRegistrationContext();

  // ✅ 이름 필드를 useController로 직접 제어
  const {
    field: nameField,
    fieldState: { error: nameError },
  } = useController({
    control,
    name: "name",
  });

  const { handleNameChange, getCombinedInfoErrorMessage } = useNameValidation({
    errors,
  });

  const handleBirthChange = (newBirth: Birth) => {
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
  };

  const handleGenderChange = (gender: ChildFormValues["gender"]) => {
    setValue("gender", gender, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <>
      {/* 👉 기존 BasicInfoInputSection + NameSection 역할을 여기서 다 처리 */}
      <ChildInfoRegistCard
        nameValue={nameField.value}
        nameOnChange={(value) => handleNameChange(value, nameField.onChange)}
        nameOnBlur={nameField.onBlur}
        nameRef={nameField.ref}
        nameErrorMessage={nameError?.message}
        birthValue={{
          year: formValues.birthYear,
          month: formValues.birthMonth,
          day: formValues.birthDay,
        }}
        setBirth={handleBirthChange}
        genderValue={formValues.gender}
        setGender={handleGenderChange}
        combinedInfoErrorMessage={getCombinedInfoErrorMessage()}
      />

      {/* 👉 프로필 선택 (기존 ProfileSelectorSection 내용 그대로) */}
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
    </>
  );
};
