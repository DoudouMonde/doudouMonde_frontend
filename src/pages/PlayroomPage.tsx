import { useNavigate } from "react-router-dom";
import { LandingPage } from "@/domains/playroom/components";
import { PATH } from "@/shared/constants";

export const PlayroomPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(PATH.SELECT_PERFORMANCE);
  };

  const handleSkip = () => {
    navigate("/playroom/reviews");
  };

  return (
    <div className="w-full h-full mb-18">
      <LandingPage onStart={handleStart} onSkip={handleSkip} />
    </div>
  );
};
