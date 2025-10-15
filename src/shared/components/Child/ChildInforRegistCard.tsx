import React from "react";

import { FormCard } from "../FormCard";
import { FormInput } from "../Form/input";
import { BirthdateSelect } from "@/pages/child/BirthdateSelect";
import { GenderSelect } from "@/pages/child/GenderSelect";

type Birth = { year: string; month: string; day: string };

type ChildInforRegistCardProps = {
  name: string;
  setName: (value: string) => void;
  birth: Birth;
  setBirth: (v: Birth) => void;
  gender: string;
  setGender: (v: string) => void;
  // 필요 시 포커스 제어를 위한 ref도 외부에서 받을 수 있게 옵션으로 열어둠
  inputRef?: React.Ref<HTMLInputElement>;
};

export const ChildInforRegistCard = ({
  name,
  setName,
  birth,
  setBirth,
  gender,
  setGender,
}: ChildInforRegistCardProps) => {
  // 이름 입력 ref
  const nameInputRef = React.useRef<HTMLInputElement>(null);
  return (
    <FormCard title="아이 정보" subtitle="아이의 기본 정보를 입력해주세요.">
      <div className="flex flex-col gap-2">
        <FormInput
          title="이름"
          ref={nameInputRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="예: 정불명"
        />
      </div>
      <BirthdateSelect value={birth} onChange={setBirth} />
      <GenderSelect value={gender} onChange={setGender} />
    </FormCard>
  );
};
