import { LandingPage } from "@/domains/playroom/components";

function Playroom() {
  const handleStart = () => {
    console.log("놀이방 시작!");
    // TODO: 실제 놀이방 로직으로 이동
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
