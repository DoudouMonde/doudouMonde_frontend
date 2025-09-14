import { SERVER_BASE_URL } from "@/shared/constants/api";
import { debugAuthBeforeRequest, debug401Error } from "@/shared/utils";
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  isAxiosError,
} from "axios";

export const apiRequesterWithoutAuth: AxiosInstance = axios.create({
  baseURL: SERVER_BASE_URL,
  timeout: 5_000,
  withCredentials: true,
});

export const apiRequester: AxiosInstance = axios.create({
  baseURL: SERVER_BASE_URL + "/api",
  timeout: 5_000,
  withCredentials: true,
});

//기본 설정 넣고, header만 설정하는 로직이네
export const setRequestDefaultHeader = (requestConfig: AxiosRequestConfig) => {
  const config = requestConfig;
  config.headers = {
    ...config.headers,
    "Content-Type": "application/json;charset=utf-8",
  };

  return config as InternalAxiosRequestConfig;
};

// const setRequestAuthorizationHeader = (requestConfig: AxiosRequestConfig) => {
//   const config = requestConfig;
//   config.headers = {
//     ...config.headers,
//   };
//   return config as InternalAxiosRequestConfig;
// };

//locals storage에 토큰이 있으면 헤더에 추가
apiRequester.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");

  // 상세한 디버깅 정보 출력
  debugAuthBeforeRequest(request.url || "", request.method || "GET");

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
    console.log(`✅ Authorization 헤더 추가됨`);
  } else {
    console.warn(`⚠️ 토큰이 없어서 인증되지 않은 요청으로 전송됩니다.`);
  }

  // FormData인 경우 Content-Type을 설정하지 않음 (브라우저가 자동으로 multipart/form-data로 설정)
  if (!(request.data instanceof FormData)) {
    setRequestDefaultHeader(request);
  }

  // setRequestAuthorizationHeader(request);
  return request;
});

export const requesterErrorHandling = (error: Error) => {
  if (isAxiosError(error)) {
    console.log(error);
  }
};

// 401 오류 처리 인터셉터
apiRequester.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (isAxiosError(error) && error.response?.status === 401) {
      // 상세한 401 오류 디버깅
      debug401Error(
        error,
        error.config?.url || "알 수 없음",
        error.config?.method?.toUpperCase() || "알 수 없음"
      );

      // 토큰 제거
      localStorage.removeItem("token");
      console.warn("🗑️ 토큰이 제거되었습니다.");

      // 현재 페이지가 로그인 페이지가 아닌 경우에만 리다이렉트
      if (window.location.pathname !== "/login") {
        console.log("🔄 로그인 페이지로 리다이렉트합니다.");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// apiRequester.interceptors.response.use(
//   (response) => {
//     // 응답 데이터를 그대로 반환
//     return response;
//   },
//   (error) => {
//     // requesterErrorHandling(error);
//     // return Promise.reject(error);
//   },
// );
