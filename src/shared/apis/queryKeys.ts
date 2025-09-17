export const queryKeys = {
  CHILD: "CHILD",
  CHILD_LIST: "CHILD_LIST",

  PERFORMANCE_LIST: "PERFORMANCE_LIST",
  PERFORMANCE_DETAIL: "PERFORMANCE_DETAIL",

  favorites: {
    wishlist: () => ["FAVORITES", "WISHLIST"] as const,
  },

  performance: {
    detail: (performanceId: number) =>
      ["PERFORMANCE", "DETAIL", performanceId] as const,
    nearbyFacilities: (performanceId: number) =>
      ["PERFORMANCE", "NEARBY_FACILITIES", performanceId] as const,
  },
} as const;
