import ScreenWrapper from "@/shared/components/ScreenWrapper";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function KakaoLoginScreen() {
  const handleLogin = () => {
    // 로그인 로직 처리 후
    // router.replace("/(tabs)");
  };

  return (
    <ScreenWrapper>
      <View className="flex-1 justify-center items-center px-4">
        <Text className="mb-8 text-xl font-bold">카카오 로그인</Text>

        <TouchableOpacity
          onPress={handleLogin}
          className="px-6 py-3 bg-yellow-400 rounded-lg"
        >
          <Text className="font-semibold text-black">로그인하기</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}
