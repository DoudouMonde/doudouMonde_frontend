import { useLocation, useNavigate } from "react-router-dom";
import { NavigationButtons } from "@/shared/components";
import { PATH } from "@/shared/constants";
import type { ReactNode } from "react";

type ReviewContainerProps = {
  children: ReactNode;
  title: string;
  onNext?: () => void;
  onPrevious?: () => void;
  isNextDisabled?: boolean;
  nextTo?: string;
  prevTo?: string | number;
  /** 플로우 경로 배열을 넘기면 현재 경로를 기준으로 이전/다음 자동 계산 */
  flow?: string[];
};

export function ReviewContainer({
  children,
  title,
  onNext,
  onPrevious,
  isNextDisabled = false,
  nextTo,
  prevTo = -1,
  flow,
}: ReviewContainerProps): JSX.Element {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const idx = flow ? flow.indexOf(pathname) : -1;
  const autoPrev = flow && idx > 0 ? flow[idx - 1] : undefined;
  const autoNext =
    flow && idx >= 0 && idx < flow.length - 1 ? flow[idx + 1] : undefined;

  const handlePrevious = () => {
    if (onPrevious) return onPrevious();
    if (flow && autoPrev) return navigate(autoPrev);
    if (typeof prevTo === "string") return navigate(prevTo);
    return navigate(prevTo); // 기본: -1
  };

  const handleNext = () => {
    if (onNext) return onNext();
    if (flow && autoNext) return navigate(autoNext);
    if (nextTo) return navigate(nextTo);
    return navigate(PATH.CHAR_TYPE);
    // return navigate(PATH.VOICE_REVIEW); 음성 후기는 일단 건너뛰기
  };

  return (
    <div className="flex min-h-screen">
      <div className=" p-6 w-full bg-gray-200/70 rounded-[40px] mt-20 mb-4">
        <div className="flex flex-col gap-4">
          <h2 className="title-inter">{title}</h2>
        </div>

        {children}

        {/* <div className="bottom-0 left-0 pt-4 w-full">
          <NavigationButtons
            onPrevious={handlePrevious}
            onNext={handleNext}
            isNextDisabled={isNextDisabled}
          />
        </div> */}
      </div>
    </div>
  );
}
