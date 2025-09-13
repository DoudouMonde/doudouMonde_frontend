import { apiRequesterWithoutAuth } from "@/shared/apis";
import { PATH } from "@/shared/constants";
import { Role } from "@/shared/types";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const LoginRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  useEffect(function getRoleAndRoutePage() {
    const getRole = async () => {
      try {
        // 1. 토큰을 통해 유저의 권한을 확인
        const response = await apiRequesterWithoutAuth.get<{ role: Role }>(
          "/v1/auth",
          {
            params: {
              token,
            },
          }
        );
        console.log(response.data);
        // 2. 권한에 따라 페이지를 이동시킨다.
        if (response.data.role === Role.TEMP) {
          navigate(PATH.SIGNUP);
        } else {
          navigate(PATH.HOME);
        }

        return response.data.role;
      } catch (error) {
        console.error("권한을 가져오는 중 에러가 발생했습니다.", error);
      }
    };
    getRole();
  }, []);

  if (!token) {
    return <div>로그인 실패</div>;
  }

  //Loading spinner
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <p className="text-lg text-gray-600">로그인 중...</p>
      </div>
    </div>
  );
};
