export const SERVER_BASE_URL =
  import.meta.env.VITE_SERVER_BASE_URL || "http://localhost:8080";
export const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
export const END_POINT = {
  // NAVER_LOGIN: (redirectUrl: string) => `/oauth2/authorization/naver?redirect_uri=${redirectUrl}`,
  KAKAO_LOGIN: (redirectUrl: string) =>
    `/oauth2/authorization/kakao?redirect_uri=${redirectUrl}`,
  LOGOUT: "/logout",
  SESSION_CHECK: "/auth/session/check",
  LOCATION: "local/search/keyword.json",
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};
