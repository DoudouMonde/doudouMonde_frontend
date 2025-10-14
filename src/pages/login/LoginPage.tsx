import { useNavigate } from "react-router-dom";
import GradientBg from "@/assets/icons/GradientBg";
import { LoginLogo } from "@/assets/icons";
import { LoginButton } from "@/domains/auth/components";

export const LoginPage = () => {
  const navigate = useNavigate();

  const handleSkipToChildRegistration = () => {
    navigate("/child-registration");
  };

  return (
    <div className="flex overflow-hidden relative flex-col justify-center items-center w-full h-dvh">
      {/* 배경 그라디언트 */}
      <GradientBg
        className="absolute inset-0 w-full h-full"
        style={{
          objectFit: "cover",
          objectPosition: "center",
          zIndex: -99,
        }}
        preserveAspectRatio="xMidYMid slice"
      />

      {/* 컨텐츠 */}
      <div className="flex relative z-10 flex-col gap-6 justify-center items-center">
        <LoginLogo className="w-40 animate-breathe" />
        <LoginButton />
      </div>
    </div>
  );
};
