export const PATH = {
  HOME: "/home",
  PLAYROOM: "/playroom",
  SELECT_PERFORMANCE: "/playroom/select-performance",
  CHILD_DATE_SELECTION: "/playroom/child-date-selection",
  REVIEW_WRITING: "/playroom/review-writing",
  VOICE_REVIEW: "/playroom/voice-review",
  CHARACTER_CREATION: "/playroom/character-creation",
  WISHLIST: "/wishlist",
  PROFILE: "/profile",
  PERFORMANCE_DETAIL: (performanceId: number) =>
    `/home/performances/${performanceId}` as const,
} as const;
