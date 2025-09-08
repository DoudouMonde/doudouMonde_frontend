export const PATH = {
  HOME: "/home",
  PLAYROOM: "/playroom",
  SELECT_PERFORMANCE: "/select-performance",
  CHILD_DATE_SELECTION: "/child-date-selection",
  REVIEW_WRITING: "/review-writing",
  VOICE_REVIEW: "/voice-review",
  WISHLIST: "/wishlist",
  PROFILE: "/profile",
  PERFORMANCE_DETAIL: (performanceId: number) =>
    `/home/performances/${performanceId}` as const,
} as const;
