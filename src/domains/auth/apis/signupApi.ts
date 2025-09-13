import { SignupRequest } from "../types/signup";
import { apiRequesterWithoutAuth } from "@/shared/apis/axiosInstance";

export const signupApi = {
  signup: async (request: SignupRequest) => {
    console.log("🔧 signupApi.signup 호출됨");
    console.log("📤 요청 데이터:", request);
    console.log("🌐 요청 URL:", "/api/v1/auth/signup");

    const response = await apiRequesterWithoutAuth.post(
      "/api/v1/auth/signup",
      request
    );

    console.log("📥 응답 데이터:", response.data);
    console.log("📊 응답 상태:", response.status);

    return response.data;
  },
};
