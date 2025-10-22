import React from "react";
import { Controller, Control } from "react-hook-form";
import { MultiSelectCard } from "@/shared/components/MultiSelect/MultiSelectCard";
import { ChildTraitOptions } from "@/domains/child/components/TraitSelector";
import { ChildFormValues } from "../types/childForm";

type Props = {
  control: Control<ChildFormValues>;
};

export const TraitSelectorSection = ({ control }: Props) => (
  <Controller
    control={control}
    name="selectedTraits"
    rules={{ required: "성향은 최소 1개 이상 선택해야 합니다." }}
    render={({ field }) => (
      <MultiSelectCard
        title="아이 성향"
        subtitle="아이의 해당되는 특성을 선택해주세요."
        selectedValues={field.value}
        onChange={field.onChange}
      >
        <ChildTraitOptions />
      </MultiSelectCard>
    )}
  />
);
