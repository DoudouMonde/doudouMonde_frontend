import React from "react";
import { FormCard } from "../FormCard";
import { FormInput } from "../Form/input";
import { BirthdateSelect } from "@/pages/child/BirthdateSelect";
import { GenderSelect } from "@/pages/child/GenderSelect";

type Birth = { year: string; month: string; day: string };

type ChildInfoRegistCardProps = {
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

  showHeader?: boolean;
  cardTitle?: React.ReactNode;
  cardSubtitle?: React.ReactNode;
  dense?: boolean;
  className?: string;
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

  showHeader = true,
  // cardTitle = "아이 정보",
  // cardSubtitle = "아이의 기본 정보를 입력해주세요.",
  dense = false,
  className,
}: ChildInfoRegistCardProps) => {
  return (
    <FormCard
      // title={cardTitle}
      // subtitle={cardSubtitle}
      hideLegend={!showHeader} // 👈 헤더 토글 전달
      dense={dense}
      className={className}
    >
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
      <GenderSelect
        value={genderValue}
        onChange={setGender}
        error={combinedInfoErrorMessage}
      />
    </FormCard>
  );
};
