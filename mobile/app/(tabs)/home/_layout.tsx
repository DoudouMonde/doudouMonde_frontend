import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "홈",
        }}
      />
      <Stack.Screen
        name="/home/performance/[id]"
        options={{
          headerShown: false,
          title: "공연 상세",
        }}
      />
    </Stack>
  );
}
