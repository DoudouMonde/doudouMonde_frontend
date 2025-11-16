declare module "react-native-config" {
  export interface NativeConfig {
    KAKAO_REST_API_KEY: string;
    HOSTNAME?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
