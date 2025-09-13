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
  MEMBER_INFO: "/member-info",
  CHILD_INFO: "/child-info",
  PERFORMANCE_DETAIL: (performanceId: number) =>
    `/performances/${performanceId}` as const,

  SIGNUP: "/signup",
  CHILD_REGISTRATION: "/child-registration",
  LOGIN_REDIRECT: "/login-redirect",
  LOGIN: "/login",
} as const;
