import React from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormCard } from "../FormCard";
import { FormInput } from "../Form/input";
import { BirthdateSelect } from "@/pages/child/BirthdateSelect";
import { GenderSelect } from "@/pages/child/GenderSelect";

type Birth = { year: string; month: string; day: string };

//RHF의 Controller가 제고앟는 필드 props를 받도록 타입 변경
type RHFFieldProps = ControllerRenderProps<FieldValues, string>;

type ChildInforRegistCardProps = {
  nameValue: string;
  nameOnChange: (value: string) => void;
  nameOnBlur: () => void;
  nameRef: React.Ref<HTMLInputElement>;
  birthValue: Birth;
  setBirth: (v: Birth) => void;
  genderValue: string;
  setGender: (v: string) => void;
};

export const ChildInforRegistCard = ({
  nameValue,
  nameOnChange,
  nameOnBlur,
  nameRef,
  birthValue,
  setBirth,
  genderValue,
  setGender,
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
      </div>
      <BirthdateSelect value={birthValue} onChange={setBirth} />
      <GenderSelect value={genderValue} onChange={setGender} />
    </FormCard>
  );
};
