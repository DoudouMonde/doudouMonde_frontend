import React, { ReactNode } from "react";
import { SafeAreaView, View } from "react-native";

interface ScreenWrapperProps {
  children: ReactNode;
  /** 기본 padding을 사용하지 않을 경우 */
  noPadding?: boolean;
  /** 커스텀 클래스명 */
  className?: string;
  /** SafeAreaView 사용 여부 */
  useSafeArea?: boolean;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  noPadding = false,
  className = "",
  useSafeArea = true,
}) => {
  const paddingClass = noPadding ? "" : "px-6"; // px-6 = 24px
  const baseClass = "flex-1 bg-white";
  const combinedClass = `${baseClass} ${paddingClass} ${className}`.trim();

  if (useSafeArea) {
    return (
      <SafeAreaView className={combinedClass}>
        {children}
      </SafeAreaView>
    );
  }

  return (
    <View className={combinedClass}>
      {children}
    </View>
  );
};

export default ScreenWrapper;
