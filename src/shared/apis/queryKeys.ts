export const queryKeys = {
  CHILD: "CHILD",
  CHILD_LIST: "CHILD_LIST",

  PERFORMANCE_LIST: "PERFORMANCE_LIST",
  PERFORMANCE_DETAIL: "PERFORMANCE_DETAIL",

  child: {
    list: () => ["CHILD", "LIST"] as const,
    traits: (childId: number | null) => ["CHILD", "TRAITS", childId] as const,
  },

  performance: {
    list: (genre?: string) => ["PERFORMANCE", "LIST", genre] as const,
    detail: (id: number) => ["PERFORMANCE", "DETAIL", id] as const,
    trait: (trait: string | null, childId: number | null) =>
      ["PERFORMANCE", "TRAIT", trait, childId] as const,
  },

  favorites: {
    wishlist: () => ["FAVORITES", "WISHLIST"] as const,
  },
} as const;
