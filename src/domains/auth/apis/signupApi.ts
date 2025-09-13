import { SignupRequest } from "../types/signup";
import { apiRequester } from "@/shared/apis/axiosInstance";

export const signupApi = {
  signup: async (request: SignupRequest) => {
    const response = await apiRequester.post("/auth/signup", request);
    return response.data;
  },
};
