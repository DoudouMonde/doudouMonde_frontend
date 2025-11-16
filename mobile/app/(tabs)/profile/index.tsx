import ScreenWrapper from "@/shared/components/ScreenWrapper";
import React from "react";
import { Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <ScreenWrapper>
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl font-bold">마이페이지</Text>
        <Text className="mt-2 text-gray-600">프로필 화면입니다.</Text>
      </View>
    </ScreenWrapper>
  );
}
