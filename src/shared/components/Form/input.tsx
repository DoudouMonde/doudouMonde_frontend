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
//부모 컴포넌트가 자식 컴포넌트의 DOM 노드나 React 컴포넌트 인스턴스에 접근할 수 있도록 해줌 
//일반적인 컴포넌트는 props로 ref를 전달할 수 없다. 
/**
 * FeedBack: 현재 div태그로 감싸는데, input을 감쌀때는 <label> 태그가 좀 더 시맨틱한 태그입니다
 */
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
