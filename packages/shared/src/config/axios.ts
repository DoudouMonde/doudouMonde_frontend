import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  isAxiosError,
} from "axios";

export interface AxiosConfig {
  baseURL: string;
  timeout?: number;
  withCredentials?: boolean;
}

/**
 * 기본 Axios 인스턴스 생성 함수
 */
export const createAxiosInstance = (config: AxiosConfig): AxiosInstance => {
  return axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout ?? 10_000,
    withCredentials: config.withCredentials ?? true,
  });
};

/**
 * 기본 요청 헤더 설정 함수
 */
export const setRequestDefaultHeader = (
  requestConfig: AxiosRequestConfig
): InternalAxiosRequestConfig => {
  const config = requestConfig;
  config.headers = {
    ...config.headers,
    "Content-Type": "application/json;charset=utf-8",
  };

  return config as InternalAxiosRequestConfig;
};

/**
 * 에러 핸들링 함수
 */
export const requesterErrorHandling = (error: Error): void => {
  if (isAxiosError(error)) {
    console.error("Axios Error:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
    });
  } else {
    console.error("Error:", error);
  }
};

/**
 * 인증 토큰을 헤더에 추가하는 인터셉터 생성 함수
 * @param getToken - 토큰을 가져오는 함수 (예: () => localStorage.getItem('token'))
 * @param onUnauthorized - 401 에러 발생 시 호출되는 콜백 함수
 */
export const createAuthInterceptor = (
  getToken: () => string | null,
  onUnauthorized?: () => void
) => {
  return {
    request: (
      request: InternalAxiosRequestConfig
    ): InternalAxiosRequestConfig => {
      const token = getToken();
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }

      // FormData인 경우 Content-Type을 설정하지 않음
      if (!(request.data instanceof FormData)) {
        setRequestDefaultHeader(request);
      }

      return request;
    },
    response: {
      onFulfilled: <T>(response: T): T => response,
      onRejected: (error: unknown) => {
        if (isAxiosError(error) && error.response?.status === 401) {
          if (onUnauthorized) {
            onUnauthorized();
          }
        }
        return Promise.reject(error);
      },
    },
  };
};
