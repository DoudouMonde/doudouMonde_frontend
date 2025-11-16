const mainNavigations = {
  HOME: "Home",
  FEED: "Feed",
  CALENDAR: "Calendar",
  SETTING: "Setting",
} as const;

const authNavigations = {
  AUTH_HOME: "AuthHome",
  LOGIN: "Login",
  SIGNUP: "Signup",
  KAKAO: "Kakao",
} as const;

export { authNavigations, mainNavigations };
