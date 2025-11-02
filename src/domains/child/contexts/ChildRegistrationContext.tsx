//1. Context가 제공할 값의 타입 정의

import { FieldErrors, UseFormReturn } from "react-hook-form";
import { ChildFormValues } from "../types/childForm";
import React, { createContext, useContext } from "react";

//1. Context가 제공할 값의 타입 정의
type ChildRegistrationContextType = {
  control: UseFormReturn<ChildFormValues>["control"];
  setValue: UseFormReturn<ChildFormValues>["setValue"];
  reset: UseFormReturn<ChildFormValues>["reset"];
  formValues: ChildFormValues;
  errors: FieldErrors<ChildFormValues>;
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSave: (e?: React.BaseSyntheticEvent) => Promise<void>;
  handleComplete: () => void;
  handleAddAnotherChild: () => void;
  isDuplicateName: (value: string) => boolean;
  isLimitReached: boolean;
  maxChildren: number;
};

//2. Context 생성
export const ChildRegistrationContext =
  createContext<ChildRegistrationContextType | null>(null);

//4. Consumer 커스텀 훅 생성
export const useChildRegistrationContext = () => {
  const context = useContext(ChildRegistrationContext);
  if (!context) {
    throw new Error("Context는 Provider 안에서만 사용 가능합니다.");
  }
  return context;
};
