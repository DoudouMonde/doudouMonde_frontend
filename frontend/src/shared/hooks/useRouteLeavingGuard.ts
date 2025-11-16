import { useEffect } from "react";
import { useBeforeUnload, useNavigate, useLocation } from "react-router-dom";

export const useRouteLeavingGuard = (
  shouldBlock: boolean,
  message: string,
  resetFormCallback: () => void
) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 외부 페이지 이탈 방지 (항상 훅은 호출)
  useBeforeUnload((event) => {
    if (!shouldBlock) return; // ✅ 조건은 내부에서 검사
    event.preventDefault();
    event.returnValue = message;
  });

  // 내부 라우팅 차단 (뒤로가기, 앞으로가기)
  useEffect(() => {
    if (!shouldBlock) return;

    const handleBeforeRoute = (e: PopStateEvent) => {
      const confirmLeave = window.confirm(message);
      if (confirmLeave) {
        resetFormCallback();
      } else {
        e.preventDefault();
        window.history.pushState(null, "", location.pathname);
      }
    };

    window.addEventListener("popstate", handleBeforeRoute);
    return () => window.removeEventListener("popstate", handleBeforeRoute);
  }, [shouldBlock, message, location.pathname, resetFormCallback]);
};
