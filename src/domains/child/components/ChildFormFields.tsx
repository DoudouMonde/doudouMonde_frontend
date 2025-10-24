import React from "react";
import { FieldErrors, UseFormReturn } from "react-hook-form";
import { ChildFormValues } from "../types/childForm";
import { TraitSelectorSection } from "./TraitSelectorSection";
import { GenreSelectorSection } from "./GenreSelectorSection";
import { ProfileSelectorSection } from "./ProfileSelectorSection";
import { BasicInfoInputSection } from "./BasicInfoInputSection";
//1. Context 훅 import
import { useChildRegistration } from "../hooks/useChildRegistration";
import { useChildRegistrationContext } from "../contexts/ChildRegistrationContext";

//2. Props 타입 정의 삭제 

//3. Props 받지 않도록 수정 
export const ChildFormFields = () => {
  //4. Context 훅에서 필요한 값만 추출 
  const {control} = useChildRegistrationContext( );

  return (
    <>
    {/* 5. BasicInfoInputSection에서도 더 이상 Props를 넘길 필요가 없다. */}
      <BasicInfoInputSection/>
      {/* 성향 / 장르 / 프로필 선택 */}
      <TraitSelectorSection control={control} />
      <GenreSelectorSection control={control} />
      <ProfileSelectorSection control={control} />
    </>
  );
};
