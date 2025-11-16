import React, { ReactNode } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

type InputProps = Omit<
  TextInputProps,
  "value" | "onChangeText" | "onChange"
> & {
  /** 입력 필드의 값 */
  value: string;
  onChange: (text: string) => void;
  placeholder: string;

  icon?: ReactNode | string;
  disabled?: boolean;
  className?: string;
};

const Input = ({
  value,
  onChange,
  icon,
  disabled = false,
  className,
  placeholder,
  ...textInputProps
}: InputProps) => {
  return (
    <View className="flex-row items-center px-4 py-2 bg-white border border-gray-400 rounded-[20px]">
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        editable={!disabled}
        className="flex-1 w-full text-[17px]"
        placeholderTextColor="#9CA3AF"
        {...textInputProps}
      />
      <Text className="w-4 h-4 border-2">{icon}</Text>
    </View>
  );
};

export default Input;
