import CustomButton from "@/shared/components/CustomButton";
import ScreenWrapper from "@/shared/components/ScreenWrapper";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function AuthHomeScreen() {
  return (
    <ScreenWrapper>
      <View className="flex-1 justify-center items-center px-4">
        <Text className="mb-8 text-2xl font-bold text-gray-800">
          환영합니다!
        </Text>

        <CustomButton
          label="카카오로 시작하기"
          onPress={() => router.push("/auth/kakao")}
        />
      </View>
    </ScreenWrapper>
  );
}
