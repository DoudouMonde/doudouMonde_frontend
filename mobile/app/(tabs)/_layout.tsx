import { Ionicons } from "@expo/vector-icons";
import { Tabs, usePathname } from "expo-router";
import React, { useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../shared/constants/colors";

function CustomTabBarButton({
  onPress,
  accessibilityLabel,
  children,
  accessibilityState,
  href, // ★ expo-router가 넘겨줌
}: any) {
  const pathname = usePathname();

  // 1) 기본: accessibilityState.selected
  // 2) 폴백: 현재 경로가 이 버튼의 href와 일치하는지로 판단
  const isFocused =
    accessibilityState?.selected ?? (href ? pathname.startsWith(href) : false);

  const animatedValues = useRef({
    scale: new Animated.Value(1),
    borderOpacity: new Animated.Value(0),
  }).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.timing(animatedValues.scale, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValues.borderOpacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.timing(animatedValues.scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValues.borderOpacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className="flex-col flex-1 justify-between items-center"
      activeOpacity={1}
      accessibilityRole="tab"
      aria-selected={isFocused}
      accessibilityState={{ selected: isFocused }}
    >
      {isFocused && (
        <View className="absolute w-10 h-1 rounded-full bg-primary-400 shadow-tab-indicator" />
      )}
      <View className="flex-col justify-center items-center w-20 h-full">
        <Animated.View
          className="flex absolute inset-0 justify-center items-center bg-gray-200 rounded-lg"
          style={{ opacity: animatedValues.borderOpacity }}
        />
        <Animated.View
          className="flex flex-col gap-1 justify-center items-center mt-3"
          style={{ transform: [{ scale: animatedValues.scale }] }}
        >
          {children}
          <Text
            className={`mt-1 text-xs ${
              isFocused ? "text-[#3DCCA3]" : "text-[#374957]"
            }`}
            style={{ fontFamily: "Inter", fontWeight: "400" }}
          >
            {accessibilityLabel}
          </Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.WHITE,
          height: 72,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: -10 },
          shadowOpacity: 0.25,
          shadowRadius: 20,
          elevation: 20,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "홈",
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} accessibilityLabel="홈">
              <Ionicons
                name={
                  (props as any).accessibilityState?.selected
                    ? "home"
                    : "home-outline"
                }
                color={
                  (props as any).accessibilityState?.selected
                    ? COLORS.PRIMARY
                    : COLORS.SECONDARY
                }
                size={24}
              />
            </CustomTabBarButton>
          ),
        }}
      />
      <Tabs.Screen
        name="playroom"
        options={{
          title: "놀이방",
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} accessibilityLabel="놀이방">
              <Ionicons
                name={
                  (props as any).accessibilityState?.selected
                    ? "game-controller"
                    : "game-controller-outline"
                }
                color={
                  (props as any).accessibilityState?.selected
                    ? COLORS.PRIMARY
                    : COLORS.SECONDARY
                }
                size={24}
              />
            </CustomTabBarButton>
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: "찜",
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} accessibilityLabel="찜">
              <Ionicons
                name={
                  (props as any).accessibilityState?.selected
                    ? "heart"
                    : "heart-outline"
                }
                color={
                  (props as any).accessibilityState?.selected
                    ? COLORS.PRIMARY
                    : COLORS.SECONDARY
                }
                size={24}
              />
            </CustomTabBarButton>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "마이",
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} accessibilityLabel="마이">
              <Ionicons
                name={
                  (props as any).accessibilityState?.selected
                    ? "person"
                    : "person-outline"
                }
                color={
                  (props as any).accessibilityState?.selected
                    ? COLORS.PRIMARY
                    : COLORS.SECONDARY
                }
                size={24}
              />
            </CustomTabBarButton>
          ),
        }}
      />
    </Tabs>
  );
}
