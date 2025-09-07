export const PATH = {
  HOME: "/home",
  PLAYROOM: "/playroom",
  PERFORMANCE_SELECTION: "/performance-selection",
  CHILD_DATE_SELECTION: "/child-date-selection",
  REVIEW_WRITING: "/review-writing",
  WISHLIST: "/wishlist",
  PROFILE: "/profile",
  PERFORMANCE_DETAIL: (performanceId: number) =>
    `/home/performances/${performanceId}` as const,
} as const;
