import { SignupRequest } from "../types/signup";
import { apiRequesterWithoutAuth } from "@/shared/apis/axiosInstance";

export const signupApi = {
  signup: async (request: SignupRequest) => {
    console.log("🔧 signupApi.signup 호출됨");
    console.log("📤 요청 데이터:", request);
    console.log("🌐 요청 URL:", "/v1/auth/signup");
    console.log(
      "🌍 전체 URL:",
      `${
        process.env.NODE_ENV === "development"
          ? "https://api.doudoumonde.com"
          : ""
      }/api/v1/auth/signup`
    );

    try {
      const response = await apiRequesterWithoutAuth.post(
        "/v1/auth/signup",
        request
      );

      console.log("📥 응답 데이터:", response.data);
      console.log("📊 응답 상태:", response.status);

      return response.data;
    } catch (error) {
      console.error("❌ 회원가입 API 오류:", error);
      console.error("🔍 오류 상세:", {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          baseURL: error.config?.baseURL,
          method: error.config?.method,
        },
      });
      throw error;
    }
  },
};
