/**
 * 디버깅을 위한 유틸리티 함수들
 */

// 브라우저 콘솔에서 사용할 수 있는 글로벌 디버깅 함수들
if (typeof window !== "undefined") {
  (window as any).debugAuth = {
    tokenStatus: debugTokenStatus,
    clearToken: () => {
      localStorage.removeItem("token");
      console.log("🗑️ 토큰이 제거되었습니다.");
    },
    setToken: (token: string) => {
      localStorage.setItem("token", token);
      console.log("✅ 토큰이 설정되었습니다.");
      debugTokenStatus();
    },
    getToken: () => {
      const token = localStorage.getItem("token");
      console.log("🔑 현재 토큰:", token);
      return token;
    },
  };

  console.log(
    "🛠️ 디버깅 도구가 로드되었습니다. 콘솔에서 다음 명령어를 사용하세요:"
  );
  console.log("  - debugAuth.tokenStatus() : 토큰 상태 확인");
  console.log("  - debugAuth.clearToken() : 토큰 제거");
  console.log("  - debugAuth.getToken() : 토큰 조회");
  console.log("  - debugAuth.setToken('your-token') : 토큰 설정");
}

/**
 * 현재 localStorage의 토큰 상태를 상세히 출력합니다.
 */
export const debugTokenStatus = (): void => {
  if (typeof window === "undefined") {
    console.log(
      "🔍 [DEBUG] 서버 사이드에서는 localStorage에 접근할 수 없습니다."
    );
    return;
  }

  const token = localStorage.getItem("token");

  console.group("🔍 토큰 상태 디버깅");
  console.log("📍 현재 URL:", window.location.href);
  console.log("🔑 토큰 존재 여부:", token ? "✅ 존재함" : "❌ 없음");

  if (token) {
    console.log("📏 토큰 길이:", token.length);
    console.log("🔤 토큰 시작 부분:", token.substring(0, 50) + "...");

    // JWT 토큰 구조 확인
    const parts = token.split(".");
    console.log("🧩 JWT 구조:", {
      parts: parts.length,
      hasHeader: parts[0] ? "✅" : "❌",
      hasPayload: parts[1] ? "✅" : "❌",
      hasSignature: parts[2] ? "✅" : "❌",
    });

    // 토큰 만료 시간 확인 (payload 디코딩)
    try {
      const payload = JSON.parse(atob(parts[1]));
      console.log("⏰ 토큰 페이로드:", {
        exp: payload.exp,
        iat: payload.iat,
        현재시간: Math.floor(Date.now() / 1000),
        만료여부: payload.exp
          ? payload.exp < Math.floor(Date.now() / 1000)
            ? "❌ 만료됨"
            : "✅ 유효함"
          : "❓ 알 수 없음",
      });
    } catch (error) {
      console.warn("⚠️ 토큰 페이로드 디코딩 실패:", error);
    }
  }

  console.groupEnd();
};

/**
 * API 요청 전에 인증 상태를 확인합니다.
 */
export const debugAuthBeforeRequest = (url: string, method: string): void => {
  console.group(`🚀 API 요청 준비: ${method.toUpperCase()} ${url}`);
  debugTokenStatus();
  console.groupEnd();
};

/**
 * 401 오류 발생 시 상세한 디버깅 정보를 출력합니다.
 */
export const debug401Error = (
  error: any,
  requestUrl: string,
  requestMethod: string
): void => {
  console.group("🚫 401 Unauthorized 오류 상세 분석");

  console.log("📋 요청 정보:", {
    URL: requestUrl,
    Method: requestMethod,
    Timestamp: new Date().toISOString(),
  });

  console.log("🔍 오류 상세:", {
    Status: error.response?.status,
    StatusText: error.response?.statusText,
    ResponseData: error.response?.data,
    Headers: error.response?.headers,
  });

  debugTokenStatus();

  console.log("💡 해결 방안:", [
    "1. 브라우저 새로고침 후 다시 시도",
    "2. 로그아웃 후 다시 로그인",
    "3. 개발자 도구 > Application > Local Storage에서 'token' 키 확인",
    "4. 서버 로그에서 토큰 검증 과정 확인",
  ]);

  console.groupEnd();
};
