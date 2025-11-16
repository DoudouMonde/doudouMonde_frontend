export const PATH = {
  HOME: "/home",
  PLAYROOM: "/playroom",
  REVEIW_START: "/review-start",
  REVIEW_FUNNEL: "/review-funnel",
  WISHLIST: "/favorites",
  PROFILE: "/mypage",
  MEMBER_INFO: "/member-info",
  CHILD_INFO: "/child-info",
  REVIEW_LIST: "/reviews",
  STORY_VILLAGE_BOOK: "/story-village-book",

  PERFORMANCE_DETAIL: (performanceId: number) =>
    `/performances/${performanceId}` as const,

  SIGNUP: "/signup",
  REGION_REGISTRATION: "/region-registration",
  CHILD_REGISTRATION: "/child-registration",
  LOGIN_REDIRECT: "/login-redirect",
  LOGIN: "/login",
} as const;
