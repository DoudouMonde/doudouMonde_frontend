import { Redirect } from "expo-router";

export default function Index() {
  // 여기서 인증 상태에 따라 리다이렉트 로직을 추가할 수 있습니다
  const isAuthenticated = true; // 실제 인증 로직으로 교체

  if (isAuthenticated) {
    return <Redirect href="/home" />;
  } else {
    return <Redirect href="/auth" />;
  }
}
