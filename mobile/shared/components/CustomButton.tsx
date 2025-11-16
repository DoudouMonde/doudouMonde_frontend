import React, { ReactNode } from "react";
import {
  Dimensions,
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface CustomButtonProps extends PressableProps {
  label: string;
  variant?: "filled" | "outlined";
  size?: "large" | "medium";
  inValid?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: ReactNode;
}

function CustomButton({
  label,
  variant = "filled",
  size = "large",
  inValid = false,
  style = null,
  textStyle = null,
  icon = null,
  ...props
}: CustomButtonProps) {
  const deviceHeight = Dimensions.get("screen").height;

  const getContainerClasses = (pressed: boolean) => {
    const baseClasses = "rounded flex-row justify-center";
    const variantClasses = pressed
      ? variant === "filled"
        ? "bg-pink-500"
        : "border border-pink-700 opacity-50"
      : variant === "filled"
      ? "bg-pink-700"
      : "border border-pink-700";
    const invalidClasses = inValid ? "opacity-50" : "";

    return `${baseClasses} ${variantClasses} ${invalidClasses}`;
  };

  const getSizeClasses = () => {
    const baseClasses = "items-center flex-row justify-center gap-1";
    const sizeClasses = size === "large" ? "w-full py-4" : "w-1/2 py-3";

    return `${baseClasses} ${sizeClasses}`;
  };

  const getTextClasses = () => {
    const baseClasses = "text-base font-bold";
    const variantClasses =
      variant === "filled" ? "text-white" : "text-pink-700";

    return `${baseClasses} ${variantClasses}`;
  };

  return (
    <Pressable
      disabled={inValid}
      className={getContainerClasses(false)}
      style={[style, { opacity: inValid ? 0.5 : 1 }]}
      {...props}
    >
      <View className={getSizeClasses()}>
        {icon}
        <Text className={getTextClasses()} style={textStyle}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

export default CustomButton;
