import { KAKAO_REST_API_KEY, SERVER_BASE_URL } from "@/shared/constants/api";

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  isAxiosError,
} from "axios";

export const kakaoInstance = axios.create({
  baseURL: "https://dapi.kakao.com/v2/",
  headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}` },
});
export const apiRequesterWithoutAuth: AxiosInstance = axios.create({
  baseURL: SERVER_BASE_URL + "/api",
  timeout: 10_000,
  withCredentials: true,
});

export const apiRequester: AxiosInstance = axios.create({
  baseURL: SERVER_BASE_URL + "/api",
  timeout: 10_000,
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
apiRequesterWithoutAuth.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  console.log("token", token);
  if (token) {
    console.log("token 주입합니다");
    request.headers.Authorization = `Bearer ${token}`;
  }
  // FormData인 경우 Content-Type을 설정하지 않음 (브라우저가 자동으로 multipart/form-data로 설정)
  if (!(request.data instanceof FormData)) {
    setRequestDefaultHeader(request);
  }

  // setRequestAuthorizationHeader(request);
  return request;
});

//locals storage에 토큰이 있으면 헤더에 추가
apiRequester.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
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
      console.error("🚨 401 인증 오류 발생:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method,
        currentToken: localStorage.getItem("token"),
      });

      // 토큰 제거
      localStorage.removeItem("token");
      console.warn("🗑️ 토큰이 제거되었습니다.");

      // 현재 페이지가 로그인 페이지가 아닌 경우에만 리다이렉트
      if (
        window.location.pathname !== "/login" &&
        import.meta.env.PROD
      ) {
        console.log("🔄 로그인 페이지로 리다이렉트합니다.");
        window.location.href = "/login";
      } else {
        console.log("🔧 개발 모드: 리다이렉트를 건너뜁니다.");
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
