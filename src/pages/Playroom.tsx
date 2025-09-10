import { useNavigate } from "react-router-dom";
import { LandingPage } from "@/domains/playroom/components";
import { PATH } from "@/shared/constants";

function Playroom() {
  const navigate = useNavigate();

  const handleStart = () => {
    console.log("놀이방 시작!");
    // 공연선택 페이지로 이동
    navigate(PATH.SELECT_PERFORMANCE);
  };

  const handleSkip = () => {
    console.log("다음에 하기");
    // 리뷰 목록 페이지로 이동
    navigate("/playroom/reviews");
  };

  return (
    <div className="w-full h-screen mb-18">
      <LandingPage onStart={handleStart} onSkip={handleSkip} />
    </div>
  );
}

export default Playroom;
