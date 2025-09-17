import { SearchIcon } from "@/assets/icons";
import React, { InputHTMLAttributes } from "react";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  onSearch: (value: string) => void;
  value: string;
}

export const SearchInput = ({
  placeholder,
  value,
  onSearch,
  ...props
}: SearchInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearch(value);
  };

  return (
    <div className={`block relative w-full min-w-0`}>
      {/* 검색 아이콘 */}
      <div className="absolute left-[14px] top-1/2 transform -translate-y-1/2 z-10">
        <SearchIcon className="w-[18px] h-[19px] text-black" />
      </div>

      {/* 입력 필드 */}
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        className="
            w-full 
            h-[35px] 
            bg-white/50 
            border-[0.3px]
            border-[#D9D9D9] 
            rounded-[20px] 
            pl-[42px] 
            pr-4 
            font-inter 
            text-xs 
            font-normal 
            text-black 
            placeholder:text-[#8C8C8C] 
            placeholder:tracking-[-0.03em]
            focus:outline-none 
            focus:ring-2 
            focus:ring-green-100/30 
            focus:border-green-100
            transition-all 
            duration-200
            min-w-0
          "
        {...props}
      />
    </div>
  );
};
