// src/shared/components/Form/ReviewMemoTextarea.tsx
import React from "react";

type ReviewMemoTextareaProps = {
  value: string;
  onChange: (next: string) => void;
  label?: string;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  className?: string;
  onBlur?: () => void;
};

export const ReviewMemoTextarea: React.FC<ReviewMemoTextareaProps> = ({
  value,
  onChange,
  onBlur,
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
          onBlur={onBlur}
          placeholder={placeholder}
          className="w-full text-gray-700 h-15 subtitle"
          maxLength={maxLength}
          disabled={disabled}
          aria-label={label}
        />
        <div className="flex justify-end mt-2">
          <span className="text-sm text-gray-900">
            {value.length}/{maxLength}
          </span>
        </div>
      </div>
    </div>
  );
};
