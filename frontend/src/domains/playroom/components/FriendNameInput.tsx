import React from "react";

export type FriendNameInputProps = {
  id?: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
  onSubmit?: () => void;
  onBlur?: () => void;
};

export const FriendNameInput: React.FC<FriendNameInputProps> = ({
  id = "friend-name",
  value,
  placeholder = "이름을 입력하세요... (한글 10자 / 영어 20자)",
  onChange,
  onSubmit,
  onBlur,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      // 브라우저 기본 유효성 메시지 비활성화
      noValidate
    >
      <input
        id={id}
        placeholder={placeholder}
        className="p-4 mt-5 w-full h-10 subtitle text-gray-700 bg-transparent border border-secondary-100/30 outline-none body-inter rounded-[20px] focus:border-secondary-100/50 transition-colors duration-200"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        onBlur={onBlur}
      />
    </form>
  );
};
