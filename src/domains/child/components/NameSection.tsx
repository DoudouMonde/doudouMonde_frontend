import React from "react";
import { ControllerRenderProps, FieldError } from "react-hook-form";
import { ChildFormValues, Birth } from "../types/childForm";
import { ChildInfoRegistCard } from "@/shared/components/Child/ChildInfoRegistCard";
import { useNameValidation } from "../hooks/useNameValidation";
//context import
import { useChildRegistrationContext } from "../contexts/ChildRegistrationContext";

type Props = {
  field: ControllerRenderProps<ChildFormValues, "name">;
  error?: FieldError;
};

export const NameSection = ({ field, error }: Props) => {
  const { formValues, setValue, errors } = useChildRegistrationContext();

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
      combinedInfoErrorMessage={getCombinedInfoErrorMessage()}
    />
  );
};
