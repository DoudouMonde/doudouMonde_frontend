import React from "react";
import { MultiRadio } from "@/shared/components/Radio";

export const TRAIT_OPTIONS = [
  { value: "MUSIC_LOVER", label: "음악을 좋아해요" },
  { value: "DANCE_LOVER", label: "춤을 좋아해요" },
  { value: "SHORT_ATTENTION", label: "집중시간이 짧아요" },
];

export function ChildTraitOptions() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {TRAIT_OPTIONS.map((trait) => (
        <MultiRadio key={trait.value} label={trait.label} value={trait.value} />
      ))}
    </div>
  );
}
