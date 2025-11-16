import { ChildItem } from "@/domains/child/types";
import React from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  child: ChildItem;
  isSelected: boolean;
  onPress: (child: ChildItem) => void;
};

export default function ChildProfile({ child, isSelected, onPress }: Props) {
  return (
    <Pressable
      key={child.id}
      onPress={() => onPress(child)}
      className="flex-col gap-2 items-center"
    >
      <View className="relative">
        {/* 선택 테두리 - 바깥쪽 */}
        {isSelected && (
          <View className="absolute -inset-1 rounded-full border-4 border-pink-500" />
        )}

        {/* 아바타 이미지 */}
        {/* <View className="rounded-full bg-neutral-gray-950 w-[75px] h-[75px] overflow-hidden">
          <Image
            source={child.profile}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View> */}
      </View>

      {/* 이름 */}
      <Text className="font-normal text-black body">{child.name}</Text>
    </Pressable>
  );
}
