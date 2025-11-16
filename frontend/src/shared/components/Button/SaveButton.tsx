import React from "react";

type SaveButtonProps = {
  disabled?: boolean;
  text?: React.ReactNode;
};

export const SaveButton: React.FC<SaveButtonProps> = ({
  disabled = false,
  text = "저장",
}) => {
  return (
    <div className={"flex justify-center"}>
      <button
        type="submit"
        className="px-8 py-3 w-full text-gray-200 rounded-full body-inter-r bg-green-100/70 00 hover:bg-green-100"
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
};
