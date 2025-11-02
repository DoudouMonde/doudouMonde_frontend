import React from "react";
import { Controller, Control } from "react-hook-form";
import { GridSelectCard } from "@/shared/components/GridSelectCard";
import { PROFILE_OPTIONS_UI } from "@/shared/ui/profile/profileOptions";
import { ChildFormValues } from "../types/childForm";

type Props = {
  control: Control<ChildFormValues>;
};

type ProfileValue = ChildFormValues["selectedProfile"];

export const ProfileSelectorSection = ({ control }: Props) => (
  <Controller
    control={control}
    name="selectedProfile"
    rules={{ required: "프로필 사진은 필수 선택입니다." }}
    render={({ field }) => (
      <GridSelectCard<ProfileValue>
        // title="프로필 사진 선택"
        // subtitle="아이의 프로필로 사용할 귀여운 캐릭터를 골라주세요."
        options={PROFILE_OPTIONS_UI}
        selected={field.value}
        onChange={field.onChange}
      />
    )}
  />
);
