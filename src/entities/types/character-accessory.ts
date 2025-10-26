// Character enums
export const CharacterAccessory = {
  RIBBON: "RIBBON",
  FLOWER: "FLOWER",
  ROUND_GLASS: "ROUND_GLASS",
  HAT: "HAT",
  CROWN: "CROWN",
  WIZARD_HAT: "WIZARD_HAT",
} as const;
export type CharacterAccessory =
  (typeof CharacterAccessory)[keyof typeof CharacterAccessory];
