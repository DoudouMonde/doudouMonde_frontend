import React from "react";
import {
  ControllerRenderProps,
  FieldError,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import { ChildFormValues, Birth } from "../types/childForm";
import { ChildInfoRegistCard } from "@/shared/components/Child/ChildInfoRegistCard";
import { useNameValidation } from "../hooks/useNameValidation";

type Props = {
  field: ControllerRenderProps<ChildFormValues, "name">;
  error?: FieldError;
  formValues: ChildFormValues;
  setValue: UseFormSetValue<ChildFormValues>;
  errors: FieldErrors<ChildFormValues>;
  isDuplicateName: (value: string) => boolean;
};

export const NameSection = ({
  field,
  error,
  formValues,
  setValue,
  errors,
}: Props) => {
  const { handleNameChange, getCombinedInfoErrorMessage } = useNameValidation({
    errors,
  });

  return (
    <ChildInfoRegistCard
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
          shouldDirty: true, //
        });
        setValue("birthMonth", newBirth.month, {
          shouldValidate: true,
          shouldDirty: true, //
        });
        setValue("birthDay", newBirth.day, {
          shouldValidate: true,
          shouldDirty: true, //
        });
      }}
      genderValue={formValues.gender}
      setGender={(value) => {
        setValue("gender", value, {
          shouldValidate: true,
          shouldDirty: true, //
        });
      }}
      combinedInfoErrorMessage={getCombinedInfoErrorMessage()}
    />
  );
};
