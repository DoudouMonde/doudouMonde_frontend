// src/shared/components/Form/ReviewMemoTextarea.tsx
import React from "react";

type ReviewMemoTextareaProps = {
  /** 현재 값 */
  value: string;
  /** 값 변경 핸들러 (문자열만 넘겨 간단하게) */
  onChange: (next: string) => void;
  /** 라벨 텍스트 */
  label?: string;
  /** placeholder */
  placeholder?: string;
  /** 최대 글자 수 (기본 300) */
  maxLength?: number;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 외부 여백 등 스타일 확장 */
  className?: string;
};

export const ReviewMemoTextarea: React.FC<ReviewMemoTextareaProps> = ({
  value,
  onChange,
  label = "메모",
  placeholder = "오랫동안 추억할 수 있게 간단한 메모를 남겨주세요.",
  maxLength = 300,
  disabled = false,
  className = "",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`mb-8 ${className}`}>
      {label && <h2 className="mb-4 subtitle-b">{label}</h2>}
      <div className="backdrop-blur-sm rounded-[20px] p-4 border border-secondary-100/30 bg-gray-200/70">
        <textarea
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full text-gray-700 h-15 subtitle"
          maxLength={maxLength}
          disabled={disabled}
          aria-label={label}
        />
        <div className="flex justify-end mt-2">
          <span className="text-sm text-black-100">
            {value.length}/{maxLength}
          </span>
        </div>
      </div>
    </div>
  );
};
