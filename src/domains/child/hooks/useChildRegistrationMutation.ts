import { childApi } from "../apis/childApi";
import { ChildRequest } from "@/domains/auth/types/signup";

export const useChildRegistrationMutation = () => {
  const postRegistration = async (childData: ChildRequest) => {
    try {
      const result = await childApi.postChildRegistration(childData);
      if (result.success) {
        console.log("아이 등록 성공:", result);
      }
      return result;
    } catch (error) {
      console.log("AXIOS URL:", error?.config?.baseURL, error?.config?.url); // 최종 URL 확인
      console.error("아이 등록 중 오류:", error);
      throw error;
    }
  };

  return { postRegistration };
};
