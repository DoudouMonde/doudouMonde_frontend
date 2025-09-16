export const queryKeys = {
  CHILD: "CHILD",
  CHILD_LIST: "CHILD_LIST",

  PERFORMANCE_LIST: "PERFORMANCE_LIST",
  PERFORMANCE_DETAIL: "PERFORMANCE_DETAIL",

  child: {
    list: () => ["CHILD", "LIST"] as const,
    traits: (childId: number | null) => ["CHILD", "TRAITS", childId] as const,
  },

  favorites: {
    wishlist: () => ["FAVORITES", "WISHLIST"] as const,
  },
} as const;
