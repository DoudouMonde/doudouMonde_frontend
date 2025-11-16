import React from "react";
import { Controller, Control } from "react-hook-form";
import { MultiSelectCard } from "@/shared/components/MultiSelect/MultiSelectCard";
import { MultiRadio } from "@/shared/components/Radio";
import { GENRES } from "@/shared/constants/genres";
import { ChildFormValues } from "../types/childForm";

type Props = {
  control: Control<ChildFormValues>;
};

export const GenreSelectorSection = ({ control }: Props) => (
  <Controller
    control={control}
    name="selectedGenres"
    rules={{ required: "장르는 최소 1개 이상 선택해야 합니다." }}
    render={({ field }) => (
      <MultiSelectCard
        title="좋아하는 장르"
        subtitle="좋아하는 장르를 선택해주세요."
        selectedValues={field.value}
        onChange={field.onChange}
      >
        <div className="grid grid-cols-2 gap-3">
          {GENRES.map((genre) => (
            <MultiRadio
              key={genre.value}
              label={genre.label}
              value={genre.value}
            />
          ))}
        </div>
      </MultiSelectCard>
    )}
  />
);
