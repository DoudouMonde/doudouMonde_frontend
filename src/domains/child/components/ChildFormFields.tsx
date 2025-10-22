import React from "react";
import { FieldErrors, UseFormReturn } from "react-hook-form";
import { ChildFormValues } from "../types/childForm";
import { TraitSelectorSection } from "./TraitSelectorSection";
import { GenreSelectorSection } from "./GenreSelectorSection";
import { ProfileSelectorSection } from "./ProfileSelectorSection";
import { BasicInforInputSection } from "./BasicInfoInputSection";

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
      <BasicInforInputSection
        control={control}
        formValues={formValues}
        setValue={setValue}
        errors={errors}
        isDuplicateName={isDuplicateName}
      />
      {/* 성향 / 장르 / 프로필 선택 */}
      <TraitSelectorSection control={control} />
      <GenreSelectorSection control={control} />
      <ProfileSelectorSection control={control} />
    </>
  );
};
