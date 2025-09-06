export const PATH = {
  HOME: "/home",
  PLAYROOM: "/playroom",
  WISHLIST: "/wishlist",
  PROFILE: "/profile",
  PERFORMANCE_DETAIL: (performanceId: number) =>
    `/home/performances/${performanceId}` as const,
} as const;
