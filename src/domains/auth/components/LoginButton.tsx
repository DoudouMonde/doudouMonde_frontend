export const LoginButton = () => {
  const handleLogin = () => {
    // PWA에서도 안전하게 동작하도록 개선
    const loginUrl = "http://localhost:8080/oauth2/authorization/kakao";

    // PWA 환경 감지
    const isPWA = window.matchMedia("(display-mode: standalone)").matches;

    if (isPWA) {
      // PWA에서는 새 탭에서 열어서 OAuth 플로우 처리
      window.open(loginUrl, "_blank");
    } else {
      // 일반 브라우저에서는 현재 창에서 리다이렉트
      window.location.href = loginUrl;
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="w-[142px] h-[48px] border-2 rounded-[10px] body-hak text-base font-normal tracking-[-0.03em] transition-all duration-200 hover:scale-105 active:scale-95"
    >
      카카오로 로그인
    </button>
  );
};
