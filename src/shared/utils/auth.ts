/**
 * 인증 관련 유틸리티 함수들
 */

/**
 * localStorage에서 토큰을 가져옵니다.
 * @returns 토큰 문자열 또는 null
 */
export const getToken = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem("token");
};

/**
 * 토큰이 존재하는지 확인합니다.
 * @returns 토큰 존재 여부
 */
export const hasToken = (): boolean => {
  return getToken() !== null;
};

/**
 * 토큰을 localStorage에 저장합니다.
 * @param token 저장할 토큰
 */
export const setToken = (token: string): void => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem("token", token);
};

/**
 * 토큰을 localStorage에서 제거합니다.
 */
export const removeToken = (): void => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem("token");
};

/**
 * 토큰의 기본적인 형식을 검증합니다.
 * @param token 검증할 토큰
 * @returns 유효한 토큰 형식인지 여부
 */
export const isValidTokenFormat = (token: string | null): boolean => {
  if (!token) {
    return false;
  }

  // JWT 토큰은 일반적으로 3개의 부분으로 구성됩니다 (header.payload.signature)
  const parts = token.split(".");
  return parts.length === 3;
};

/**
 * 현재 저장된 토큰이 유효한 형식인지 확인합니다.
 * @returns 토큰 유효성 여부
 */
export const isCurrentTokenValid = (): boolean => {
  const token = getToken();
  return isValidTokenFormat(token);
};

/**
 * 인증이 필요한 페이지에서 사용할 수 있는 토큰 검증 함수
 * @returns 토큰이 유효하면 true, 그렇지 않으면 false
 */
export const validateAuth = (): boolean => {
  const isValid = isCurrentTokenValid();

  if (!isValid) {
    console.warn("유효하지 않은 토큰입니다. 로그인이 필요합니다.");
    removeToken();
  }

  return isValid;
};

