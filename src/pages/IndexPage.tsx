import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/shared/constants";

export const IndexPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 토큰이 있는지 확인
    const token = localStorage.getItem("token");

    if (token) {
      // 토큰이 있으면 홈으로 리다이렉트
      navigate(PATH.HOME, { replace: true });
    } else {
      // 토큰이 없으면 로그인 페이지로 리다이렉트
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // 로딩 스피너 표시
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <p className="text-lg text-gray-600">페이지를 준비하고 있습니다...</p>
      </div>
    </div>
  );
};
