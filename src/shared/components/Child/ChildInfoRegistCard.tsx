import React from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormCard } from "../FormCard";
import { FormInput } from "../Form/input";
import { BirthdateSelect } from "@/pages/child/BirthdateSelect";
import { GenderSelect } from "@/pages/child/GenderSelect";

type Birth = { year: string; month: string; day: string };

type ChildInforRegistCardProps = {
  nameValue: string;
  nameOnChange: (value: string) => void;
  nameOnBlur: () => void;
  nameRef: React.Ref<HTMLInputElement>;
  birthValue: Birth;
  setBirth: (v: Birth) => void;
  genderValue: string;
  setGender: (v: string) => void;
  nameErrorMessage?: string;
  combinedInfoErrorMessage?: string;
};

export const ChildInfoRegistCard = ({
  nameValue,
  nameOnChange,
  nameOnBlur,
  nameRef,
  birthValue,
  setBirth,
  genderValue,
  setGender,
  nameErrorMessage,
  combinedInfoErrorMessage,
}: ChildInforRegistCardProps) => {
  return (
    <FormCard title="아이 정보" subtitle="아이의 기본 정보를 입력해주세요.">
      <div className="flex flex-col gap-2">
        <FormInput
          title="이름"
          ref={nameRef}
          type="text"
          value={nameValue}
          onChange={(e) => nameOnChange(e.target.value)}
          onBlur={nameOnBlur}
          placeholder="예: 정불명"
        />
        {/* 오류 메시지를 FormInput 바로 아래에 출력 */}
        {nameErrorMessage && (
          <p className="px-1 mt-1 text-red-100 body-inter-sm">
            * {nameErrorMessage}
          </p>
        )}
      </div>
      <BirthdateSelect value={birthValue} onChange={setBirth} />
      <GenderSelect value={genderValue} onChange={setGender} />

      {combinedInfoErrorMessage && (
        <p className="px-1 mt-2 text-red-100 body-inter-sm">
          * {combinedInfoErrorMessage}
        </p>
      )}
    </FormCard>
  );
};
