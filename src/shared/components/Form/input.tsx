import React, {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  forwardRef,
} from "react";
type FormInputProps = {
  title?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
};

// ✅ forwardRef를 사용하여 ref 전달 가능하게 만듦
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ title, type = "text", value, onChange, placeholder }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {title && <p className="body-inter-b">{title}</p>}
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="p-4 w-full h-10 subtitle text-secondary-100 bg-transparent border border-secondary-100/30 outline-none rounded-[20px] focus:border-secondary-100/50 transition-colors duration-200"
        />
      </div>
    );
  }
);
