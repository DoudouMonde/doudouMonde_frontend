import ScreenWrapper from "@/shared/components/ScreenWrapper";
import React from "react";
import { Text, View } from "react-native";

export default function WishlistScreen() {
  return (
    <ScreenWrapper>
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl font-bold">찜</Text>
        <Text className="mt-2 text-gray-600">찜한 공연 목록입니다.</Text>
      </View>
    </ScreenWrapper>
  );
}
