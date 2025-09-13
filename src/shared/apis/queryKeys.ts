export const queryKeys = {
  CHILD: "CHILD",
  CHILD_LIST: "CHILD_LIST",

  PERFORMANCE_LIST: "PERFORMANCE_LIST",
  PERFORMANCE_DETAIL: "PERFORMANCE_DETAIL",

  favorites: {
    wishlist: () => ["FAVORITES", "WISHLIST"] as const,
  },
} as const;
