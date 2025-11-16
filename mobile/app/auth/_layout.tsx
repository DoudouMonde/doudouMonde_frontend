import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="kakao"
        options={{
          headerShown: true,
          title: "카카오 로그인",
        }}
      />
    </Stack>
  );
}
