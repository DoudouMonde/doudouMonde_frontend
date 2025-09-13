import React from "react";
import GradientBg from "@/assets/icons/GradientBg";
import { KakaoLoginBtn, LoginLogo } from "@/assets/icons";

export const LoginPage = () => {
  return (
    <div className="flex relative justify-center items-center min-h-screen">
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
      <div className="flex relative z-10 flex-col gap-6 items-center">
        <LoginLogo className="w-40" />
        <KakaoLoginBtn className="w-full" />
      </div>
    </div>
  );
};
