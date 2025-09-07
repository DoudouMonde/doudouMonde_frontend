import { useNavigate } from "react-router-dom";
import { LandingPage } from "@/domains/playroom/components";
import { PATH } from "@/shared/constants";

function Playroom() {
  const navigate = useNavigate();

  const handleStart = () => {
    console.log("놀이방 시작!");
    // 공연선택 페이지로 이동
    navigate(PATH.PERFORMANCE_SELECTION);
  };

  const handleSkip = () => {
    console.log("다음에 하기");
    // TODO: 메인 페이지로 이동하거나 다른 로직
  };

  return (
    <div className="w-full h-screen mb-18">
      <LandingPage onStart={handleStart} onSkip={handleSkip} />
    </div>
  );
}

export default Playroom;
