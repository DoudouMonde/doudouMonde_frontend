import queryClient from "@/shared/apis/queryCilent";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen
          name="performance/[id]"
          options={{
            title: "공연 상세",
            headerShown: true,
            headerStyle: {
              backgroundColor: "rgba(255, 255, 255, 0.95)",
            },
            headerTitleStyle: {
              fontFamily: "Noto Sans KR",
              fontSize: 16,
              fontWeight: "600",
            },
            headerBackTitle: "",
            headerTintColor: "#374957",
            presentation: "card",
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
