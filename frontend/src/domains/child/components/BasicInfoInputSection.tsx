import React from "react";
import { Controller } from "react-hook-form";
import { NameSection } from "@/domains/child/components/NameSection";
import { useChildRegistrationContext } from "../contexts/ChildRegistrationContext";

export const BasicInfoInputSection = () => {
  const { control } = useChildRegistrationContext();
  return (
    <>
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState: { error } }) => (
          //NameSection에서 필요한 props 외에 넘길 필요가 없다,
          <NameSection field={field} error={error} />
        )}
      />

      <Controller control={control} name="birthYear" render={() => <></>} />
      <Controller control={control} name="birthMonth" render={() => <></>} />
      <Controller control={control} name="birthDay" render={() => <></>} />
      <Controller control={control} name="gender" render={() => <></>} />
    </>
  );
};
