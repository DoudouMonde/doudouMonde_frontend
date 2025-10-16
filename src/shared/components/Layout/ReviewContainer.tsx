import { NavigationButtons } from "@/shared/components";
import { PATH } from "@/shared/constants";
import { useNavigate } from "react-router-dom";

type ReveiwContainerProps = {
  children: React.ReactNode;
  title: string;
};

export const ReviewContainer = ({ children, title }: ReveiwContainerProps) => {
  const navigate = useNavigate();
  const handlePrevious = () => {
    navigate(-1); // 브라우저 히스토리에서 이전 페이지로 이동
  };

  const handleNext = () => {
    // VoiceReview 페이지로 이동 (이미 Zustand store에 저장됨)
    navigate(PATH.VOICE_REVIEW);
  };
  return (
    <div className="flex min-h-screen">
      {/* 흰색 콘테이너  */}
      <div className="p-6 w-full bg-gray-200/70 rounded-[40px] mt-20 mb-24">
        <div className="flex flex-col gap-4">
          <h2 className="title-inter">{title}</h2>
        </div>
        {children}
        {/* 네비게이션 버튼 */}
        <div className="mb-2">
          <NavigationButtons
            onPrevious={handlePrevious}
            onNext={handleNext}
            isNextDisabled={false}
          />
        </div>
      </div>
    </div>
  );
};
